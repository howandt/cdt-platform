"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrerPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !role) {
      alert("Udfyld venligst alle felter");
      return;
    }

    // Test - gå til onboarding
    router.push("/onboarding");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>CDT Registrering</h1>
      
      <div style={{ marginBottom: "1rem" }}>
        <label>Navn:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Rolle:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
        >
          <option value="">Vælg rolle</option>
          <option value="foralder">Forælder</option>
          <option value="laerer">Lærer</option>
          <option value="specialist">Specialist</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#0066cc",
          color: "white",
          padding: "1rem 2rem",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Registrer
      </button>
    </main>
  );
}