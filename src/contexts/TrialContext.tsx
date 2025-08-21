'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface TrialContextType {
  timeLeft: number
  isTrialActive: boolean
  isTrialExpired: boolean
  startTrial: () => void
  endTrial: () => void
  formatTime: (seconds: number) => string
}

const TrialContext = createContext<TrialContextType | undefined>(undefined)

export function TrialProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutter i sekunder
  const [isTrialActive, setIsTrialActive] = useState(false)
  const [isTrialExpired, setIsTrialExpired] = useState(false)

  // Start trial når komponenten loader
  useEffect(() => {
    // Check om trial allerede er startet fra localStorage
    const trialStartTime = localStorage.getItem('trialStartTime')
    const trialDuration = 30 * 60 * 1000 // 30 min i millisekunder

    if (trialStartTime) {
      const elapsed = Date.now() - parseInt(trialStartTime)
      const remaining = Math.max(0, trialDuration - elapsed)
      
      if (remaining > 0) {
        setTimeLeft(Math.floor(remaining / 1000))
        setIsTrialActive(true)
      } else {
        setIsTrialExpired(true)
        setIsTrialActive(false)
        setTimeLeft(0)
      }
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!isTrialActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTrialActive(false)
          setIsTrialExpired(true)
          localStorage.removeItem('trialStartTime')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTrialActive, timeLeft])

  const startTrial = () => {
    const startTime = Date.now()
    localStorage.setItem('trialStartTime', startTime.toString())
    setTimeLeft(30 * 60)
    setIsTrialActive(true)
    setIsTrialExpired(false)
  }

  const endTrial = () => {
    localStorage.removeItem('trialStartTime')
    setIsTrialActive(false)
    setIsTrialExpired(true)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <TrialContext.Provider value={{
      timeLeft,
      isTrialActive,
      isTrialExpired,
      startTrial,
      endTrial,
      formatTime
    }}>
      {children}
    </TrialContext.Provider>
  )
}

export function useTrial() {
  const context = useContext(TrialContext)
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider')
  }
  return context
}