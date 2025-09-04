export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url  = process.env.SUPABASE_URL!;
  const anon = process.env.SUPABASE_ANON_KEY!;

  // Safety: mangler env?
  if (!url || !anon) {
    return NextResponse.json({ ok: false, where: "env", error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY" }, { status: 500 });
  }

  try {
    const sb = createClient(url, anon, { auth: { persistSession: false } });
    const { data, error } = await sb.from("diagnoses").select("id, navn").limit(1);
    if (error) {
      return NextResponse.json({ ok: false, where: "select diagnoses", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, where: "select diagnoses", rows: data ?? [] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, where: "catch", error: msg }, { status: 500 });
  }
}
