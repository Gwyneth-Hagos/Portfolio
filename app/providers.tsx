'use client'

import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { FloatingLoader } from '@/components/floating-loader'

export function Providers({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AnimatePresence mode="wait">
        {loading ? (
          <FloatingLoader onLoadingComplete={handleLoadingComplete} />
        ) : (
          children
        )}
      </AnimatePresence>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
