import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Creaitor - AI-Powered Social Media Management',
  description: 'Brand-first AI social media content platform for agencies',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
