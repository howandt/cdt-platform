import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/db";

export const runtime = "edge";

export async function GET() {
  const { count, error } = await supabaseAdmin
    .from("tenant")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, tenantCount: count ?? 0 });
}
