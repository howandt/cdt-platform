'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

export default function Home() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CDT Platform</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <span className="text-gray-700">Hej {user?.firstName || 'bruger'}!</span>
                  <UserButton />
                </>
              ) : (
                <>
                  <SignInButton>
                    <button className="text-gray-700 hover:text-blue-600">Log ind</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Prøv Gratis
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Platform til
            <span className="text-blue-600"> Specialpædagogik</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionerende CDT platform der hjælper lærere og forældre med at støtte børn 
            med autisme og andre diagnoser i folkeskolen.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {isSignedIn ? (
              <Link href="/dashboard">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center">
                  Gå til Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            ) : (
              <SignUpButton>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center">
                  Start 30 Min Gratis Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </SignUpButton>
            )}
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50">
              Se Demo
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Assisteret Vejledning</h3>
              <p className="text-gray-600">
                Få personaliserede råd og strategier baseret på specifikke situationer og behov.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fællesskab & Support</h3>
              <p className="text-gray-600">
                Tilslut dig et netværk af professionelle og forældre der deler erfaringer.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Evidensbaseret Indhold</h3>
              <p className="text-gray-600">
                Adgang til opdateret forskning og best practices indenfor specialpædagogik.
              </p>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Vælg Din Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Trial */}
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Gratis Trial</h3>
                <p className="text-3xl font-bold mb-4">30 min</p>
                <p className="text-gray-600 mb-6">Test alle Pro funktioner</p>
                {isSignedIn ? (
                  <Link href="/trial">
                    <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200">
                      Start Trial
                    </button>
                  </Link>
                ) : (
                  <SignUpButton>
                    <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200">
                      Start Nu
                    </button>
                  </SignUpButton>
                )}
              </div>

              {/* Basic */}
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Basic</h3>
                <p className="text-3xl font-bold mb-4">$50 <span className="text-sm font-normal">engangsbetaling</span></p>
                <p className="text-gray-600 mb-6">Begrænset tokens + refill mulighed</p>
                <button className="w-full bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200">
                  Køb Basic
                </button>
              </div>

              {/* Pro */}
              <div className="border-2 border-blue-500 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  Mest Populær
                </div>
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">$25 <span className="text-sm font-normal">/måned</span></p>
                <p className="text-gray-600 mb-6">Ubegrænset adgang til alt</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Start Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">CDT Platform</span>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionerende platform til specialpædagogik i Danmark
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="https://cdt-website.vercel.app" className="text-gray-400 hover:text-white">
                Hovedwebsite
              </Link>
              <Link href="https://interaktiv-cdtfagbog.vercel.app" className="text-gray-400 hover:text-white">
                Interaktiv Fagbog
              </Link>
              <Link href="https://cdaisystems.com" className="text-gray-400 hover:text-white">
                CDT Systems
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}