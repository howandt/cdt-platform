import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.supabase_url
  const anon = process.env.supabase_anon_key
  if (!url || !anon) return res.status(500).json({ ok: false, error: 'Missing ENV' })

  const sb = createClient(url, anon)
  const { data, error } = await sb.rpc('match_specialists_run', { p_text: 'ping' })

  return res.status(200).json({ ok: !error, error: error?.message ?? null, data })
}
