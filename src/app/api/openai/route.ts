import { NextResponse } from "next/server";
import OpenAI from "openai";

// Typer
type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type ChatBody = { message?: string; messages?: ChatMessage[]; sessionId?: string };

// GET: health
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "openai",
    hasKey: !!process.env.OPENAI_API_KEY,
    time: new Date().toISOString(),
  });
}

// POST: chat
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as ChatBody;

    // Tolerant parsing: {message} eller {messages: [...]}
    let message = "";
    if (typeof body?.message === "string") {
      message = body.message;
    } else if (Array.isArray(body?.messages)) {
      const lastUser = [...body.messages]
        .reverse()
        .find((m) => m?.role === "user" && typeof m?.content === "string");
      message = lastUser?.content ?? "";
    }

    if (!message.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing 'message'. Send enten { message: string } eller { messages: [{role,content}] }. Serveren modtog: " +
            JSON.stringify(body).slice(0, 500),
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const client = new OpenAI({ apiKey });
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: `System: Du er Heidi, en CDT-tutor.\nBruger: ${message}`,
    });

    const reply = resp.output_text ?? "(tomt svar)";
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
