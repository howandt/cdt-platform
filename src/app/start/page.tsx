"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function StartPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [school, setSchool] = useState("")
  const [error, setError] = useState("")

  const handleStart = () => {
    if (!name || !email || !role) {
      setError("Udfyld venligst alle obligatoriske felter.")
      return
    }

    // Gem i localStorage
    const user = {
      name,
      email,
      role,
      school,
      registeredAt: new Date().toISOString(),
    }

    localStorage.setItem("cdtUser", JSON.stringify(user))

    // Gå videre til test
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Start din gratis CDT-test</h1>
        <p className="text-sm text-gray-600 mb-6">Udfyld venligst oplysningerne herunder for at komme i gang.</p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Navn *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="F.eks. Hans Jensen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="hans@email.dk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Din rolle *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            >
              <option value="">-- Vælg rolle --</option>
              <option value="forælder">Forælder</option>
              <option value="lærer">Lærer / Pædagog</option>
              <option value="specialist">Fagperson / Specialist</option>
              <option value="anden">Anden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skole / Interesse</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Valgfrit"
            />
          </div>

          <Button
            className="w-full mt-4 text-gray-800"
            onClick={handleStart}
          >
            Start Test
          </Button>
        </div>
      </div>
    </main>
  )
}
