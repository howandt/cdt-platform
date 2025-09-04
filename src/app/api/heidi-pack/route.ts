export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const url  = process.env.SUPABASE_URL!;
  const anon = process.env.SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, { auth: { persistSession: false } });

  // Definér sp KUN én gang
  const sp = new URL(req.url).searchParams;

  // --- DEBUG (kun env, ingen fetch) ---
if (sp.get("debug") === "env") {
  return NextResponse.json({
    hasUrl: !!process.env.SUPABASE_URL,
    hasAnon: !!process.env.SUPABASE_ANON_KEY
  });
}
// --- /DEBUG ---

  // læs query-parametre
  const diagnose = sp.get("diagnose") ?? "";
  const theme    = sp.get("theme") ?? "";
  const level    = sp.get("level") ?? "";
  const q        = sp.get("q") ?? "";

  if (!diagnose || !theme || !level) {
    return NextResponse.json(
      { ok: false, error: "Missing params", hint: "Add diagnose, theme, level, q" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await sb.rpc("get_heidi_pack", {
      p_diagnose: diagnose,
      p_theme: theme,
      p_level: level,
      p_user_text: q,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, where: "rpc get_heidi_pack", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, input: { diagnose, theme, level, q }, result: data ?? [] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, where: "catch", error: msg }, { status: 500 });
  }
}
