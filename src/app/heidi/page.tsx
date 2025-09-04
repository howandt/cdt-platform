"use client";

import { useEffect, useState } from "react";

export default function HeidiPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [err, setErr] = useState<string>("");

  // standard-parametre (kan ændres i inputfelterne)
  const [diagnose, setDiagnose] = useState("ADHD");
  const [theme, setTheme] = useState("Struktur");
  const [level, setLevel] = useState("Let");
  const [q, setQ] = useState("Elev har svært");

  async function load() {
    try {
      setErr("");
      setData(null);
      const params = new URLSearchParams({
        diagnose,
        theme,
        level,
        q,
      });
      const res = await fetch(`/api/heidi-pack?` + params.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(msg);
    }
  }

  useEffect(() => {
    // hent automatisk ved første visning
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ padding: 16, fontFamily: "ui-sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Heidi – API test (frontend)</h1>

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 12 }}>
        <input value={diagnose} onChange={(e) => setDiagnose(e.target.value)} placeholder="diagnose" />
        <input value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="theme" />
        <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="level" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="q" />
      </div>

      <button onClick={load} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", marginBottom: 12 }}>
        Hent Heidi-pack
      </button>

      {err && (
        <pre style={{ background: "#311", color: "#f88", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
          Fejl: {err}
        </pre>
      )}

      <pre style={{ background: "#111", color: "#0f0", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
