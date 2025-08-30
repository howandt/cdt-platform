import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function readText(relPath: string) {
  const p = path.join(process.cwd(), relPath);
  return fs.readFile(p, "utf8");
}

export async function GET() {
  try {
    const manifest = await readText("packs/cdt-heidi-core-2025-09/manifest.yaml");
    const prompt = await readText("packs/cdt-heidi-core-2025-09/prompt/CDT_Prompt_Heidi.md");

    return NextResponse.json({
      ok: true,
      manifest_lines: manifest.split("\n").length,
      prompt_chars: prompt.length,
      prompt_preview: prompt.slice(0, 180)
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Read error" }, { status: 400 });
  }
}
