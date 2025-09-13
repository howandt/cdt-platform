"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">CDT Platform</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Din levende, interaktive fagbog til specialpædagogik – for forældre, lærere, pædagoger og specialister
        </p>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <Link href="/start">
  <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
    Start Gratis Test
  </Button>
</Link>
          <Link href="#pricing">
            <Button variant="outline" className="text-white border-white">
              Se Pakker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">AI-Assisteret Vejledning</h3>
          <p className="text-gray-800">Få personaliserede råd og strategier baseret på specifikke situationer og behov.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Fællesskab & Support</h3>
          <p className="text-gray-800">Tilslut dig et netværk af professionelle og forældre, der deler erfaringer og støtter hinanden.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Evidensbaseret Indhold</h3>
          <p className="text-gray-800">Adgang til opdateret forskning og best practices indenfor specialpædagogik.</p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="bg-white py-16 px-6">
  <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Vælg Din Plan
  </h2>



          {/* Gratis Trial */}
          <div className="border border-green-400 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Gratis Trial</h3>
            <p className="text-gray-700 mb-2">30 minutter</p>
            <p className="text-gray-500 mb-4">Test hele Pro-pakken gratis</p>
            <Link href="/start">
  <Button className="bg-green-500 hover:bg-green-600 w-full">Start Trial</Button>
</Link>
          </div>

          {/* Basic Plan */}
          <div className="border border-blue-400 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Basic</h3>
            <p className="text-gray-700 mb-2">$50 engangsbetaling</p>
            <p className="text-gray-500 mb-4">Begrænset tokens + refill mulighed</p>
            <Button className="bg-blue-500 hover:bg-blue-600 w-full">Køb Basic</Button>
          </div>

          {/* Pro Plan */}
          <div className="border border-purple-500 rounded-lg p-6 text-center bg-purple-50">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Pro</h3>
            <p className="text-gray-700 mb-2">$25 / måned</p>
            <p className="text-gray-500 mb-4">Ubegrænset adgang til alt</p>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">Start Pro</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>CDT Platform • Interaktiv Fagbog • Powered by Heidi AI</p>
      </footer>
    </main>
  )
}
