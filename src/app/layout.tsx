import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { TrialProvider } from '@/contexts/TrialContext'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CDT Platform | AI-Powered Specialpædagogik',
  description: 'Revolutionerende platform til støtte af børn med autisme og diagnoser i folkeskolen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="da">
        <body className={inter.className}>
          <TrialProvider>
            {children}
          </TrialProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}