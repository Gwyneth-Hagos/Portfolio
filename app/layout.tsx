import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Cursor } from '@/components/cursor'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

// app/layout.tsx
export const metadata = {
  title: 'Code With Gwy',
  description: 'Personal portfolio showcasing my projects and skills',
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>
          <Cursor />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

