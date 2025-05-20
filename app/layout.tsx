import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Cursor } from '@/components/cursor'
import { MainContent } from '@/components/main-content'
import { LoadingScreen } from '@/components/loading-screen'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'CodeWithGwy',
  description: 'Portfolio showcasing my skills and projects as an aspiring full stack developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Roboto_Bold.json" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>
          <LoadingScreen />
          <Cursor />
          <div className="flex min-h-screen flex-col">
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}