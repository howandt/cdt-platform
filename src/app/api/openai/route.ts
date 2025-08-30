import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadPrompt() {
  const p = path.join(
    process.cwd(),
    "packs",
    "cdt-heidi-core-2025-09",
    "prompt",
    "CDT_Prompt_Heidi.md"
  );
  return fs.readFile(p, "utf8");
}

// GET = health (så /api/openai i browseren ikke giver 404)
export async function GET() {
  try {
    const prompt = await loadPrompt();
    return NextResponse.json({ ok: true, promptChars: prompt.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "read fail";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { message = "" } = (await req.json().catch(() => ({}))) as {
      message?: string;
    };
    if (!message.trim()) {
      return NextResponse.json(
        { error: "Missing 'message'" },
        { status: 400 }
      );
    }

    const system = await loadPrompt();
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const r = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: String(message) },
      ],
    });

    const reply = r.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ ok: true, reply });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

