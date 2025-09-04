import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const url  = process.env.SUPABASE_URL!;
  const anon = process.env.SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, { auth: { persistSession: false } });
  // --- DEBUG (midlertidigt) ---
const sp = new URL(req.url).searchParams;
if (sp.get("debug") === "env") {
  let headOk = false, headErr = "";
  try { const r = await fetch(process.env.SUPABASE_URL!, { method: "HEAD" }); headOk = r.ok; } catch (e:any) { headErr = String(e?.message || e); }
  return NextResponse.json({ hasUrl: !!process.env.SUPABASE_URL, hasAnon: !!process.env.SUPABASE_ANON_KEY, headOk, headErr });
}
// --- /DEBUG ---


  // læs query-parametre
  const sp = new URL(req.url).searchParams;
  const diagnose = sp.get("diagnose") ?? "";
  const theme    = sp.get("theme") ?? "";
  const level    = sp.get("level") ?? "";
  const q        = sp.get("q") ?? "";

  // enkel validering
  if (!diagnose || !theme || !level) {
    return NextResponse.json(
      { ok: false, error: "Missing params", hint: "Add diagnose, theme, level, q" },
      { status: 400 }
    );
  }

  try {
    // Kald din RPC (param-navne som i SQL: p_diagnose, p_theme, p_level, p_user_text)
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
  let msg: string;
  if (e instanceof Error) {
    msg = e.message;
  } else {
    msg = String(e);
  }
  return NextResponse.json({ ok: false, where: "catch", error: msg }, { status: 500 });
}
}

