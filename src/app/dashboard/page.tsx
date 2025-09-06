'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { BookOpen, MessageCircle, Clock, CreditCard, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useTrial } from '@/contexts/TrialContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { user } = useUser()
  const { timeLeft, isTrialActive, isTrialExpired, startTrial, formatTime } = useTrial()
  const router = useRouter()
  
useEffect(() => {
  router.push("https://cdt-training.vercel.app")
}, [])

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
              <span className="text-gray-700">Velkommen, {user?.firstName || 'bruger'}!</span>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Trial Expired Warning */}
        {isTrialExpired && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <h3 className="text-red-800 font-semibold">Trial Udløbet</h3>
                <p className="text-red-700">Din gratis trial er udløbet. Opgrader til Basic eller Pro for fortsat adgang.</p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Velkommen til CDT Platform! 🎉</h1>
          <p className="text-blue-100">
            Du har nu adgang til AI-powered specialpædagogik værktøjer. 
            {!isTrialActive && !isTrialExpired && ' Klik "Start Trial" for at begynde din gratis periode!'}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          {/* Trial Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Clock className={`h-8 w-8 ${
                isTrialExpired ? 'text-red-500' : 
                isTrialActive ? 'text-orange-500' : 'text-gray-500'
              }`} />
              <h3 className="ml-3 text-lg font-semibold">Trial Status</h3>
            </div>
            
            {isTrialExpired ? (
              <>
                <p className="text-red-600 mb-4 font-semibold">Trial udløbet</p>
                <div className="bg-red-100 rounded-full h-2 mb-2">
                  <div className="bg-red-500 h-2 rounded-full w-0"></div>
                </div>
                <p className="text-sm text-gray-500">0:00 minutter tilbage</p>
              </>
            ) : isTrialActive ? (
              <>
                <p className="text-orange-600 mb-4">Trial aktiv</p>
                <div className="bg-orange-100 rounded-full h-2 mb-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(timeLeft / (30 * 60)) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{formatTime(timeLeft)} minutter tilbage</p>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">Klar til at starte</p>
                <button 
                  onClick={startTrial}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                >
                  Start 30 Min Trial
                </button>
              </>
            )}
          </div>

          {/* Plan Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-8 w-8 text-gray-500" />
              <h3 className="ml-3 text-lg font-semibold">Nuværende Plan</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {isTrialExpired ? 'Ingen aktiv plan' : 'Trial bruger'}
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Opgrader til Pro
            </button>
          </div>

          {/* Usage Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-green-500" />
              <h3 className="ml-3 text-lg font-semibold">Brug i dag</h3>
            </div>
            <p className="text-gray-600 mb-4">0 AI samtaler brugt</p>
            <p className="text-sm text-gray-500">
              {isTrialActive ? 'Ubegrænset under trial' : 
               isTrialExpired ? 'Trial udløbet' : 'Start trial for adgang'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Kom i gang</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* AI Chat */}
            <div className={`border border-gray-200 rounded-lg p-6 transition-colors ${
              isTrialExpired ? 'opacity-50' : 'hover:border-blue-300'
            }`}>
              <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start AI Chat</h3>
              <p className="text-gray-600 mb-4">
                Chat med vores specialpædagogik AI om specifikke udfordringer og få personaliserede råd.
              </p>
              {isTrialExpired ? (
  <div className="space-y-2">
    <button className="w-full bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed">
      Trial Udløbet
    </button>
    <button 
      onClick={() => {
        localStorage.setItem('trialStartTime', Date.now().toString())
        window.location.reload()
      }}
      className="w-full bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700"
    >
      🔧 Developer Reset
    </button>
  </div>
) : (
  <Link href="/chat">
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
      Start Chat
    </button>
  </Link>
)}
            </div>

            {/* Resources */}
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

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Seneste Aktivitet</h2>
          <div className="text-center py-8 text-gray-500">
            <p>Ingen aktivitet endnu. Start med at bruge AI chatten!</p>
          </div>
        </div>
      </main>
    </div>
  )
}