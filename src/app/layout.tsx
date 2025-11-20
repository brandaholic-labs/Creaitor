import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Creaitor - AI-Powered Social Media Management',
  description: 'Brand-first AI social media content platform for agencies',
}

import { Toaster } from "@/components/ui/sonner"

// Font configuration (UX Design Spec: Plus Jakarta Sans for headings, Inter for body)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
