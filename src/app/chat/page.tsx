'use client'
import { useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { BookOpen, Send, ArrowLeft, MessageCircle, Bot } from 'lucide-react'
import Link from 'next/link'

export default function ChatPage() {
  const { user } = useUser()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '👋 Hej og velkommen! Jeg hedder **Heidi** – din AI-tutor i arbejdet med børn med diagnoser 🌱\n\nJeg er klar til at hjælpe dig – men for at tilpasse læringen bedst muligt, må jeg lige stille dig et par hurtige spørgsmål:\n\n1️⃣ **Hvilket sprog vil du bruge?** 🇩🇰 Dansk · 🇬🇧 Engelsk · 🌍 Andet\n*(Skriv bare dit valg)*\n\n(Så snart du svarer, går vi videre til næste trin!)',
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = { role: 'user', content: inputMessage }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: 'ui-chat-001',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiResponse = {
          role: 'assistant',
          content: data.reply || '(tomt svar)',
        }
        setMessages((prev) => [...prev, aiResponse])
      } else {
        const errorResponse = {
          role: 'assistant',
          content: data?.error || 'Undskyld, der opstod en fejl. Prøv igen.',
        }
        setMessages((prev) => [...prev, errorResponse])
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorResponse = {
        role: 'assistant',
        content: 'Undskyld, der opstod en netværksfejl. Prøv venligst igen.',
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Tilbage til Dashboard
                </button>
              </Link>
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  CDT AI Chat
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">CDT Pro Demo</span>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border h-96 mb-6 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  message.role === 'user'
                    ? 'flex-row-reverse space-x-reverse'
                    : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.charAt(0) || 'U'}
                    </span>
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm space-y-2">
                    {message.content.split('\n').map((line, index) => (
                      <p key={index} className={line.trim() === '' ? 'h-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Skriv dit spørgsmål om specialpædagogik her..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Forslag til spørgsmål:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Hvordan hjælper jeg et barn med autisme der har svært ved overgange?',
              'Strategier til at mindske sensorisk overload i klasseværelset',
              'Hvordan kommunikerer jeg bedst med forældre til børn med ADHD?',
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
