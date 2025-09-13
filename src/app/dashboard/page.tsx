'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { BookOpen, MessageCircle, CreditCard, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Tilbage til forside
                </button>
              </Link>
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CDT Platform</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Velkommen, {user?.firstName || (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cdtUser') || '{}')?.name) || 'bruger'}!
              </span>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Velkommen til CDT Platform! 🎉</h1>
          <p className="text-blue-100">
            Du har nu adgang til AI-powered specialpædagogik værktøjer.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Plan Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-8 w-8 text-gray-500" />
              <h3 className="ml-3 text-lg font-semibold">Nuværende Plan</h3>
            </div>
            <p className="text-gray-600 mb-4">Ingen aktiv plan</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Opgrader til Pro
            </button>
          </div>

          {/* AI Chat */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-green-500" />
              <h3 className="ml-3 text-lg font-semibold">Brug i dag</h3>
            </div>
            <p className="text-gray-600 mb-4">0 AI samtaler brugt</p>
            <p className="text-sm text-gray-500">Start en samtale nedenfor</p>
            <Link href="/chat">
              <button className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Start Chat
              </button>
            </Link>
          </div>
        </div>

        {/* Ressourcer */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Ressourcer</h2>
          <div className="grid md:grid-cols-1 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ressourcer</h3>
              <p className="text-gray-600 mb-4">
                Browse vores samling af artikler, strategier og værktøjer til specialpædagogik.
              </p>
              <Link href="/resources">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  Se Ressourcer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
