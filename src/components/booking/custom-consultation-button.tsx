'use client'

import { Button } from '@/components/ui/button'
import { Crown } from 'lucide-react'

interface CustomConsultationButtonProps {
  zcalUrl?: string
  colorPalette: {
    primary: string
    secondary: string
    tertiary: string
  }
}

export function CustomConsultationButton({ zcalUrl, colorPalette }: CustomConsultationButtonProps) {
  const handleClick = () => {
    if (zcalUrl) {
      window.open(zcalUrl, '_blank')
    } else {
      window.location.href = '/book'
    }
  }

  return (
    <Button 
      onClick={handleClick}
      size="lg" 
      variant="outline"
      className="text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2"
      style={{
        borderColor: colorPalette.primary,
        color: colorPalette.primary
      }}
    >
      <Crown className="h-5 w-5 mr-2" />
      Custom Consultation
    </Button>
  )
} 