import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, topic, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    const targetEmail = "joblesscodersbd@gmail.com";

    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email: email || "No email provided",
        topic: topic || "General Inquiry",
        message,
        _subject: `[Jobless Coders] ${topic || "New Message"} from ${name}`,
        _template: "table",
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } else {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: errorData.message || "Failed to send message." },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
