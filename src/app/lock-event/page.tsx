import { getSiteInfo } from '@/lib/site'
import { Calendar, Clock, Sparkles, Crown, Heart, CheckCircle } from 'lucide-react'
import { parseColorPalette, generateDynamicGradientStyle, generateBrightTextGradientStyle } from '@/lib/colors'
import LockEventForm from '@/components/booking/lock-event-form'
import Image from 'next/image'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function LockEventPage() {
  const siteInfo = await getSiteInfo()
  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#3B82F6', '#10B981', '#F59E0B'])
  const siteName = siteInfo?.name || 'MD Events & Services'

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={generateDynamicGradientStyle('to-br', colorPalette, 0.4, 'normal')}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 animate-pulse" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.4, 'normal'),
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full opacity-5 animate-bounce" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal'),
            animationDelay: '2s'
          }}
        ></div>
      </div>

      {/* Hero Section with Image */}
      <div 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-12"
        style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
      >
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
          <Image 
            src="/placeholder-event.jpg" 
            alt="Elegant event planning and booking"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
            style={generateBrightTextGradientStyle(colorPalette)}
          >
            Lock Your Event Details
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Secure your perfect event with our comprehensive booking form. 
            Every detail matters, and we&apos;re here to make it exceptional.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Premium Service</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <Crown className="w-5 h-5" />
              <span className="text-sm font-medium">Expert Planning</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Personal Touch</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Guaranteed Quality</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        
        {/* Form Introduction */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
            <p className="text-xl font-medium" style={{ color: colorPalette.secondary }}>
              Secure Your Perfect Event with {siteName}
            </p>
            <Heart className="h-5 w-5 ml-2" style={{ color: colorPalette.primary }} />
          </div>
          
          <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-8" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            Ready to make it official? Fill out the details below and we&apos;ll lock in your event. 
            No deposit required — just secure your date and get started on your journey to an unforgettable celebration.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: colorPalette.secondary }}>No Deposit Required</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: colorPalette.secondary }}>Instant Confirmation</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <Crown className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: colorPalette.secondary }}>VIP Treatment</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: colorPalette.secondary }}>Priority Planning</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-4xl mx-auto">
          <LockEventForm 
            colorPalette={colorPalette} 
            siteName={siteName} 
            siteId={process.env.SITE_ID || ''} 
          />
        </div>
      </div>
    </div>
  )
} 