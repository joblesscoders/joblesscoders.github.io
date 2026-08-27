import http from "node:http";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const PORT = 3899;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function postJson(path, body, headers = {}, clientIp = "10.0.0.1") {
  return new Promise((resolve, reject) => {
    const payload = typeof body === "string" ? body : JSON.stringify(body);
    const req = http.request(
      `${BASE_URL}${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          "X-Forwarded-For": clientIp,
          ...headers,
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          let json = null;
          try {
            json = JSON.parse(raw);
          } catch {}
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: json,
            raw,
          });
        });
      }
    );

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function getRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          raw,
        });
      });
    }).on("error", reject);
  });
}

async function waitForServer(retries = 35, delayMs = 600) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await getRoute("/");
      if (res.status === 200) return true;
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return false;
}

async function runSuite() {
  console.log("🚀 Starting Next.js test server with Mocked Provider (Zero external emails)...\n");

  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      CONTACT_TEST_MODE: "true",
      CONTACT_PROVIDER: "mock",
    },
    shell: true,
    stdio: "pipe",
  });

  const cleanup = () => {
    try {
      server.kill();
    } catch {}
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);

  const isReady = await waitForServer();
  if (!isReady) {
    console.error("❌ Failed to start Next.js test server.");
    cleanup();
    process.exit(1);
  }

  console.log("✅ Next.js server ready on port " + PORT + ". Running Contact API test suite...\n");

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✔ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✖ FAIL: ${name}`);
      console.error(`    ${err.message}`);
      failed++;
    }
  }

  // 1. Valid Request
  await test("Valid submission with mock provider returns 200 OK", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "Alex Senior Lead",
        email: "alex@enterprise.dev",
        topic: "Project Collaboration",
        message: "We need an architecture review and sprint team for our Next.js project.",
      },
      {},
      "10.0.1.1"
    );

    assert.equal(res.status, 200);
    assert.equal(res.data?.success, true);
  });

  // 2. Missing Email
  await test("Missing email returns 400 Bad Request with field error", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "Alex Senior Lead",
        email: "",
        topic: "Project Collaboration",
        message: "We need an architecture review.",
      },
      {},
      "10.0.1.2"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?.email);
  });

  // 3. Invalid Email Format
  await test("Invalid email format returns 400 Bad Request", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "Alex Senior Lead",
        email: "not-a-valid-email",
        topic: "Project Collaboration",
        message: "We need an architecture review.",
      },
      {},
      "10.0.1.3"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?.email);
  });

  // 4. Missing Name
  await test("Empty name returns 400 Bad Request with field error", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "   ",
        email: "alex@enterprise.dev",
        topic: "Project Collaboration",
        message: "We need an architecture review.",
      },
      {},
      "10.0.1.4"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?.name);
  });

  // 5. Missing / Short Message
  await test("Short message (< 10 chars) returns 400 Bad Request", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "Alex Senior Lead",
        email: "alex@enterprise.dev",
        topic: "Project Collaboration",
        message: "Short",
      },
      {},
      "10.0.1.5"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?.message);
  });

  // 6. Invalid Topic Whitelist
  await test("Unapproved topic returns 400 Bad Request", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "Alex Senior Lead",
        email: "alex@enterprise.dev",
        topic: "NonExistentTopicNotWhitelisted",
        message: "We need an architecture review.",
      },
      {},
      "10.0.1.6"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?.topic);
  });

  // 7. Oversized Name Field
  await test("Oversized field (> 100 chars for name) returns 400", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "A".repeat(120),
        email: "alex@enterprise.dev",
        topic: "Project Collaboration",
        message: "We need an architecture review.",
      },
      {},
      "10.0.1.7"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?.name);
  });

  // 8. Honeypot Trigger
  await test("Honeypot filled by bot returns 400 and blocks message dispatch", async () => {
    const res = await postJson(
      "/api/contact",
      {
        name: "Spam Bot",
        email: "bot@spammer.net",
        topic: "General Inquiry",
        message: "Buy cheap backlinks today!",
        _hp_company: "Spam Automation LLC",
      },
      {},
      "10.0.1.8"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.ok(res.data?.fieldErrors?._hp_company);
  });

  // 9. Wrong Content-Type
  await test("Non-JSON Content-Type returns 415 Unsupported Media Type", async () => {
    const res = await postJson(
      "/api/contact",
      "plain text payload",
      { "Content-Type": "text/plain" },
      "10.0.1.9"
    );

    assert.equal(res.status, 415);
    assert.equal(res.data?.success, false);
  });

  // 10. Malformed JSON
  await test("Malformed JSON returns 400 Bad Request", async () => {
    const res = await postJson(
      "/api/contact",
      "{ invalid json :",
      { "Content-Type": "application/json" },
      "10.0.1.10"
    );

    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
  });

  // 11. Large Payload Rejection (> 10KB)
  await test("Payload exceeding 10KB returns 413 Payload Too Large", async () => {
    const largeBody = {
      name: "Alex",
      email: "alex@enterprise.dev",
      topic: "General Inquiry",
      message: "Z".repeat(12000),
    };

    const res = await postJson("/api/contact", largeBody, {}, "10.0.1.11");

    assert.equal(res.status, 413);
    assert.equal(res.data?.success, false);
  });

  // 12. Rate Limiting Enforced
  await test("Exceeding request limit returns 429 Too Many Requests", async () => {
    const spamIp = "10.0.99.99";
    // Send 5 requests to reach limit
    for (let i = 0; i < 5; i++) {
      await postJson(
        "/api/contact",
        {
          name: "Rapid User",
          email: "rapid@test.dev",
          topic: "General Inquiry",
          message: "Testing rate limiting in contact API.",
        },
        {},
        spamIp
      );
    }
    // 6th request should trigger 429
    const limitedRes = await postJson(
      "/api/contact",
      {
        name: "Rapid User",
        email: "rapid@test.dev",
        topic: "General Inquiry",
        message: "Testing rate limiting in contact API.",
      },
      {},
      spamIp
    );

    assert.equal(limitedRes.status, 429);
    assert.equal(limitedRes.data?.success, false);
  });

  console.log("\n==========================================");
  console.log(`Results: ${passed} passed, ${failed} failed.`);

  cleanup();

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("🎉 All Contact API Security & Validation Tests Passed Successfully!\n");
    process.exit(0);
  }
}

runSuite();
