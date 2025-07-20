'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LockEventButtonProps {
  colorPalette: {
    primary: string
    secondary: string
  }
}

export default function LockEventButton({ colorPalette }: LockEventButtonProps) {
  return (
    <Link href="/lock-event">
      <Button 
        className="w-full sm:w-auto px-8 py-3 text-lg font-semibold"
        style={{
          backgroundColor: colorPalette.primary,
          color: 'white',
          border: `2px solid ${colorPalette.primary}`,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colorPalette.secondary;
          e.currentTarget.style.borderColor = colorPalette.secondary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colorPalette.primary;
          e.currentTarget.style.borderColor = colorPalette.primary;
        }}
      >
        Lock My Event Details
      </Button>
    </Link>
  )
} 