import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

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
          <a href="/heidi" style={{ position: "fixed", bottom: 12, right: 12, fontSize: 12, opacity: 0.6 }}>
  Heidi demo
</a>

        </body>
      </html>
    </ClerkProvider>
  )
}