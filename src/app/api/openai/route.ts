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

// 🔹 Simpel session-hukommelse i RAM (nulstilles ved deploy/restart)
const sessionMemory = new Map<string, { role: "user" | "assistant"; content: string }[]>();

// POST: chat
export async function POST(req: Request) {
  try {
    // ——— input-parsing: accepter både {message} og {messages[]} ———
    type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
    type ChatBody = { message?: string; messages?: ChatMessage[]; sessionId?: string };

    const body = (await req.json().catch(() => ({}))) as ChatBody;

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
        { ok: false, error: "Missing 'message' (send {message} eller {messages:[{role,content}]})" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    // ——— session-hukommelse ———
    const sessionId = body?.sessionId || "default";
    const history = sessionMemory.get(sessionId) || [];
    history.push({ role: "user", content: message }); // tilføj brugerens besked

    // ——— kald OpenAI med hele historikken ———
    const client = new OpenAI({ apiKey });
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: history.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n"),
    });

    const reply = resp.output_text ?? "(tomt svar)";

    // ——— gem AI-svaret i hukommelsen ———
    history.push({ role: "assistant", content: reply });
    sessionMemory.set(sessionId, history);

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

