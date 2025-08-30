import { NextResponse } from "next/server";
import OpenAI from "openai";

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
    // Læs body
    const body = (await req.json().catch(() => ({}))) as { message?: string; sessionId?: string };
    const message = (body?.message ?? "").toString();

    if (!message.trim()) {
      return NextResponse.json({ error: "Missing 'message'" }, { status: 400 });
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
