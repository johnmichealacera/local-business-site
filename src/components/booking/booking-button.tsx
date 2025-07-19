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
    <div className="text-center space-y-4">
      {description && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            <Clock className="h-3 w-3 mr-1 sm:mr-1.5" style={{ color: colors.primary }} />
            <span style={{ color: colors.secondary }}>Free consultation</span>
          </div>
          <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            <Sparkles className="h-3 w-3 mr-1 sm:mr-1.5" style={{ color: colors.primary }} />
            <span style={{ color: colors.secondary }}>Instant booking</span>
          </div>
          <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            <Calendar className="h-3 w-3 mr-1 sm:mr-1.5" style={{ color: colors.primary }} />
            <span style={{ color: colors.secondary }}>24/7 availability</span>
          </div>
        </div>
      )}
      
      <Button
        onClick={handleBookingClick}
        size={size}
        className={`group transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden font-semibold ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          color: 'white',
          border: 'none',
          boxShadow: `0 4px 15px ${colors.primary}30`
        }}
      >
        {/* Background animation effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: `linear-gradient(60deg, ${colors.tertiary}, ${colors.primary}, ${colors.secondary})`
          }}
        />
        
        <div className="relative flex items-center">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
          
          <span className="font-bold text-base sm:text-lg">
            {size === 'lg' ? 'Let\'s Plan an Unforgettable Day' : 'Book Now'}
          </span>
          
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 group-hover:animate-spin transition-transform duration-300" />
        </div>
        
        {/* Hover glow effect */}
        <div 
          className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}60, ${colors.secondary}60)`
          }}
        />
      </Button>
      
      {size === 'lg' && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs font-medium">
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            <Clock className="h-3 w-3 mr-1 sm:mr-1.5" style={{ color: colors.primary }} />
            <span style={{ color: colors.secondary }}>Free Consultation</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            <Sparkles className="h-3 w-3 mr-1 sm:mr-1.5" style={{ color: colors.primary }} />
            <span style={{ color: colors.secondary }}>Instant Booking</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            <Calendar className="h-3 w-3 mr-1 sm:mr-1.5" style={{ color: colors.primary }} />
            <span style={{ color: colors.secondary }}>24/7 Availability</span>
          </div>
        </div>
      )}
    </div>
  )
} 