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

  // ... resten uændret

return (
  <main style={{ padding: 16, fontFamily: "ui-sans-serif", maxWidth: 800, margin: "0 auto" }}>
    <h1 style={{ fontSize: 22, marginBottom: 12 }}>Heidi – API test</h1>

    <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 12 }}>
      <input value={diagnose} onChange={(e) => setDiagnose(e.target.value)} placeholder="diagnose" />
      <input value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="theme" />
      <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="level" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="q" />
    </div>

    <button onClick={load} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", marginBottom: 16 }}>
      Hent Heidi-pack
    </button>

    {/* pæn visning hvis strukturen findes */}
    {!!data?.result && (
      <section style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, margin: "8px 0" }}>Case</h2>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div><b>Problem:</b> {data.result.case?.problem}</div>
          <div style={{ marginTop: 8 }}>
            <b>Eval:</b>
            <ul>
              <li>Effektivt: {data.result.case?.eval?.effektivt}</li>
              <li>Delvist: {data.result.case?.eval?.delvist}</li>
              <li>Problematisk: {data.result.case?.eval?.problematisk}</li>
              <li>Brug i morgen: {data.result.case?.eval?.brug_i_morgen}</li>
            </ul>
          </div>
        </div>

        <h2 style={{ fontSize: 18, margin: "16px 0 8px" }}>Quiz (1. spørgsmål)</h2>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div><b>Spørgsmål:</b> {data.result.quizzes?.[0]?.question}</div>
          <div style={{ marginTop: 6 }}>
            <b>Muligheder:</b> {Array.isArray(data.result.quizzes?.[0]?.options) ? data.result.quizzes[0].options.join(" · ") : ""}
          </div>
        </div>

        <h2 style={{ fontSize: 18, margin: "16px 0 8px" }}>Teori (første)</h2>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div><b>Titel:</b> {data.result.theory?.[0]?.title}</div>
          <div><b>Note:</b> {data.result.theory?.[0]?.body_md}</div>
        </div>
      </section>
    )}

    {err && (
      <pre style={{ background: "#311", color: "#f88", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
        Fejl: {err}
      </pre>
    )}

    <h3 style={{ marginTop: 16 }}>Raw JSON</h3>
    <pre style={{ background: "#111", color: "#0f0", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  </main>
);
}
