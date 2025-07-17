'use client'

import { Button } from '@/components/ui/button'
import { Calendar, Clock, Sparkles } from 'lucide-react'
import { parseColorPalette } from '@/lib/colors'

interface BookingButtonProps {
  zcalUrl?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  colorPalette?: string[]
  children?: React.ReactNode
  description?: string
}

export function BookingButton({ 
  zcalUrl = "https://zcal.co/your-calendar-link", // Placeholder URL
  variant = 'primary',
  size = 'lg',
  className = '',
  colorPalette = ['#3B82F6', '#10B981', '#F59E0B'],
  children,
  description = "Book a consultation with us using our smart scheduler"
}: BookingButtonProps) {
  const colors = parseColorPalette(colorPalette)

  const handleBookingClick = () => {
    // Open Zcal link in a new tab
    window.open(zcalUrl)
  }

  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          color: 'white',
          border: 'none'
        }
      case 'secondary':
        return {
          backgroundColor: colors.primary + '20',
          color: colors.primary,
          border: `2px solid ${colors.primary}50`
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.primary,
          border: `2px solid ${colors.primary}`
        }
      default:
        return {}
    }
  }

  if (children) {
    return (
      <Button
        onClick={handleBookingClick}
        size={size}
        className={`group transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
        style={getButtonStyles()}
      >
        {children}
      </Button>
    )
  }

  return (
    <div className="text-center space-y-3">
      {description && (
        <p className="text-sm font-medium" style={{ color: colors.tertiary, opacity: 0.8 }}>
          {description}
        </p>
      )}
      <Button
        onClick={handleBookingClick}
        size={size}
        className={`group transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${className}`}
        style={{
          border: '1px solid white',
          color: 'white',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Background animation effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `linear-gradient(60deg, ${colors.primary}, ${colors.tertiary}, ${colors.secondary})`
          }}
        />
        
        <div className="relative flex items-center">
          <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          
          <span className="font-semibold">
            {size === 'lg' ? 'Let\'s Plan an Unforgettable Day' : 'Book Now'}
          </span>
          
          <Sparkles className="h-4 w-4 ml-2 group-hover:animate-spin transition-transform duration-300" />
        </div>
        
        {/* Hover glow effect */}
        <div 
          className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-75 blur transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`
          }}
        />
      </Button>
      
      {size === 'lg' && (
        <div className="flex items-center justify-center space-x-4 text-xs" style={{ color: colors.secondary, opacity: 0.7 }}>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span style={{ color: colors.tertiary }}>Free Consultation</span>
          </div>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            <span style={{ color: colors.tertiary }}>Instant Booking</span>
          </div>
        </div>
      )}
    </div>
  )
} 