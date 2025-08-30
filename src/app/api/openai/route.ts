import { NextResponse } from "next/server";
import OpenAI from "openai";

// Typer til chat-body (her indsætter du det)
type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type ChatBody = { message?: string; messages?: ChatMessage[] };

// Health check (GET)
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "openai",
    hasKey: !!process.env.OPENAI_API_KEY,
    time: new Date().toISOString(),
  });
}


// Chat (POST)
export async function POST(req: Request) {
  try {
// Læs body – accepter både { message } og { messages: [{role,content}] }
const body = (await req.json().catch(() => ({}))) as unknown as ChatBody;

let message = "";
if (typeof body?.message === "string") {
  message = body.message;
} else if (Array.isArray(body?.messages)) {
  const lastUser = [...body.messages].reverse()
    .find((m) => m?.role === "user" && typeof m?.content === "string");
  message = lastUser?.content ?? "";
}

if (!message.trim()) {
  return NextResponse.json(
    { error: "Missing 'message' (expected {message} or {messages:[{role,content}]})" },
    { status: 400 }
  );
}

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    // Kald OpenAI (Responses API)
    const client = new OpenAI({ apiKey });
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: `System: Du er Heidi, en CDT-tutor.\nBruger: ${message}`,
    });

    const reply = resp.output_text ?? "";

    return NextResponse.json({ ok: true, reply });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
