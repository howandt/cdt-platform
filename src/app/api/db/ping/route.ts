// app/api/db/ping/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.supabase_url
  const anon = process.env.supabase_anon_key

  if (!url || !anon) {
    return NextResponse.json({ ok: false, error: 'Missing ENV' }, { status: 500 })
  }

  const supabase = createClient(url, anon)

  // prøv bare at hente server-tid
  const { data, error } = await supabase.rpc('match_specialists_run', { p_text: 'ping' })

  return NextResponse.json({
    ok: !error,
    error: error?.message ?? null,
    data
  })
}
