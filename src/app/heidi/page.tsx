import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getData(searchParams: { [k: string]: string | string[] | undefined }) {
  const params = new URLSearchParams();
  params.set("diagnose", (searchParams.diagnose as string) ?? "ADHD");
  params.set("theme",    (searchParams.theme as string) ?? "Struktur");
  params.set("level",    (searchParams.level as string) ?? "Let");
  params.set("q",        (searchParams.q as string) ?? "Elev har svært");

  // Byg absolut base-URL fra request-headere (virker lokalt + Vercel)
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host  = h.get("host") ?? "!";
  const base  = `${proto}://${host}`;

  const res = await fetch(`${base}/api/heidi-pack?` + params.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default async function HeidiPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const data = await getData(searchParams);
  return (
    <main style={{ padding: 16, fontFamily: "ui-sans-serif" }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Heidi – API test (frontend)</h1>
      <p style={{ marginBottom: 8 }}>
        Du kan ændre parametre i URL’en, fx:&nbsp;
        <code>?diagnose=ADHD&theme=Struktur&level=Let&q=Elev%20har%20svært</code>
      </p>
      <pre style={{ background: "#111", color: "#0f0", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
