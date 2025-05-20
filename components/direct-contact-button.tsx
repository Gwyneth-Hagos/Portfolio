'use client'

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { CopyEmailButton } from '@/components/copy-email-button'

export function DirectContactButton() {
  return (
    <div className="mt-6 text-center border-t pt-6">
      <h3 className="text-lg font-medium mb-2">Contact Me Directly</h3>
      <p className="mb-4 text-muted-foreground">
        For the most reliable way to contact me, please email me directly:
      </p>
      <a 
        href="https://mail.google.com/mail/?view=cm&fs=1&to=gwynyhagos@gmail.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button className="gap-2">
          Email Me Directly
          <Mail className="h-4 w-4" />
        </Button>
      </a>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          Or copy my email address:
        </span>
        <CopyEmailButton />
      </div>
    </div>
  )
}