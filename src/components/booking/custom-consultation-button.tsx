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
      className="text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 w-full sm:w-auto"
      style={{
        borderColor: colorPalette.primary,
        color: colorPalette.primary
      }}
    >
      <Crown className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
      Custom Consultation
    </Button>
  )
} 