'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const email = 'gwynyhagos@gmail.com'
  
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopied(true)
        toast.success('Email copied to clipboard!')
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch(() => {
        toast.error('Failed to copy email')
      })
  }
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Email
        </>
      )}
    </Button>
  )
}