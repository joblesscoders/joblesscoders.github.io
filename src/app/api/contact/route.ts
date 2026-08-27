import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { validateContactPayload, type ContactApiResponse } from "@/lib/contact";

// Simple in-memory sliding window rate limiter for local / Node runtime
// Note: In serverless environments (e.g. Vercel / Cloudflare), edge rate limiting / WAF
// is recommended as lambda instances do not share persistent memory.
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRequestHistory.set(ip, validTimestamps);

  // Periodic cleanup if map grows large
  if (ipRequestHistory.size > 1000) {
    for (const [k, tsList] of ipRequestHistory.entries()) {
      const active = tsList.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) ipRequestHistory.delete(k);
      else ipRequestHistory.set(k, active);
    }
  }

  return false;
}

export async function POST(req: Request): Promise<NextResponse<ContactApiResponse>> {
  // 1. Enforce Content-Type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Invalid Content-Type. Expected application/json." },
      { status: 415 }
    );
  }

  // 2. Client IP Rate Limiting
  const forwardedFor = req.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait a minute before submitting again.",
      },
      { status: 429 }
    );
  }

  // 3. Parse JSON & Body Size Limit Guard
  let body: unknown;
  try {
    const rawText = await req.text();
    if (rawText.length > 10240) {
      // 10 KB limit
      return NextResponse.json(
        { success: false, error: "Request payload is too large." },
        { status: 413 }
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return NextResponse.json(
      { success: false, error: "Malformed JSON payload in request." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload format." },
      { status: 400 }
    );
  }

  // 4. Validate Fields, Lengths, Honeypot & Timing
  const isTestEnv = process.env.NODE_ENV === "test" || process.env.CONTACT_TEST_MODE === "true";
  const validation = validateContactPayload(body as Record<string, unknown>, {
    checkTiming: !isTestEnv,
  });

  if (!validation.isValid || !validation.sanitized) {
    const firstErrorMessage =
      Object.values(validation.fieldErrors)[0] || "Validation failed. Please check your inputs.";
    return NextResponse.json(
      {
        success: false,
        error: firstErrorMessage,
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, topic, message } = validation.sanitized;

  // 5. Mock / Test Mode Guard (Prevents external HTTP calls during automated tests)
  const provider = process.env.CONTACT_PROVIDER || (isTestEnv ? "mock" : "formsubmit");
  if (provider === "mock" || isTestEnv) {
    return NextResponse.json({
      success: true,
      message: "Message accepted (Test/Mock Mode).",
    });
  }

  // 6. Server-Side Provider Delivery
  const targetEmail = process.env.CONTACT_EMAIL || siteConfig.email;
  const endpointBase = process.env.FORMSUBMIT_ENDPOINT || "https://formsubmit.co/ajax/";
  const destinationUrl = `${endpointBase.replace(/\/+$/, "")}/${encodeURIComponent(targetEmail)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(destinationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        topic,
        message,
        _subject: `[Jobless Coders] ${topic} from ${name}`,
        _template: "table",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully.",
      });
    }

    // Upstream provider returned non-200
    console.error(`[Contact API] Upstream provider returned HTTP ${response.status}`);
    return NextResponse.json(
      {
        success: false,
        error: "We were unable to deliver your message right now. Please try again later or email us directly.",
      },
      { status: 502 }
    );
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error("[Contact API] Error forwarding message:", isAbort ? "Timeout" : "Internal Error");

    return NextResponse.json(
      {
        success: false,
        error: "We encountered an issue delivering your message. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
