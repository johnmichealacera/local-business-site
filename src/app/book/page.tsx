import { getSiteInfo } from '@/lib/site'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Sparkles, CheckCircle, Star, Crown, Heart } from 'lucide-react'
import { parseColorPalette, generateDynamicGradientStyle, generateTextGradientStyle } from '@/lib/colors'
import { SiteFeature } from '@/types/site'
import LockEventButton from '@/components/booking/lock-event-button'
import { getContactInfo } from '@/lib/contact'
import Image from 'next/image'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function BookingPage() {
  const siteInfo = await getSiteInfo()
  const contactInfo = await getContactInfo()
  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#3B82F6', '#10B981', '#F59E0B'])
  const siteName = siteInfo?.name || 'MD Events & Services'
  const zcalUrl = siteInfo?.features.find(f => f.name === SiteFeature.EVENT_SERVICES)?.zcalLink

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
            alt="Elegant event booking and consultation"
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
            style={generateTextGradientStyle(colorPalette)}
          >
            Book Your Event
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Schedule your consultation with our expert event planners. 
            We&apos;ll discuss your ideas, timeline, budget, and create a custom plan just for you.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Free Consultation</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">30-60 Minutes</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
              <Crown className="w-5 h-5" />
              <span className="text-sm font-medium">Personalized Service</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Page Introduction */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
            <p className="text-xl font-medium" style={{ color: colorPalette.secondary }}>
              Schedule Your Consultation with {siteName}
            </p>
            <Heart className="h-5 w-5 ml-2" style={{ color: colorPalette.primary }} />
          </div>
          
          <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-8" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            Ready to bring your vision to life? Book a consultation with our expert event planners. 
            We&apos;ll discuss your ideas, timeline, budget, and create a custom plan just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Booking Embed */}
          <div className="order-2 lg:order-1">
            <Card 
              className="border-2 shadow-2xl relative overflow-hidden"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '30'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 transform translate-x-10 -translate-y-10"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
              ></div>
              
              <CardHeader className="text-center relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Sparkles className="h-8 w-8 animate-pulse" style={{ color: colorPalette.primary }} />
                  </div>
                </div>
                <CardTitle 
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={generateTextGradientStyle(colorPalette)}
                >
                  Choose Your Perfect Time
                </CardTitle>
                <p className="mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Select a time that works best for you. We&apos;ll send you a confirmation with all the details.
                </p>
              </CardHeader>
              
              <CardContent className="p-0 relative z-10">
                {/* Zcal Embed */}
                <div className="w-full h-[600px] rounded-b-lg overflow-hidden">
                  <iframe
                    src={zcalUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Book a consultation with MD Events & Services"
                    className="border-0"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="order-1 lg:order-2 space-y-6">
            
            {/* What to Expect */}
            <Card 
              className="border-2 shadow-xl"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '30'
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span 
                    className="bg-clip-text text-transparent font-bold"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                    What to Expect
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: colorPalette.primary }}
                    ></div>
                    <div>
                      <p className="font-medium" style={{ color: colorPalette.secondary }}>
                        Event Vision Discussion
                      </p>
                      <p className="text-sm" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                        Share your ideas, theme, and style preferences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: colorPalette.primary }}
                    ></div>
                    <div>
                      <p className="font-medium" style={{ color: colorPalette.secondary }}>
                        Budget & Timeline Planning
                      </p>
                      <p className="text-sm" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                        Transparent pricing and realistic timelines
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: colorPalette.primary }}
                    ></div>
                    <div>
                      <p className="font-medium" style={{ color: colorPalette.secondary }}>
                        Custom Proposal
                      </p>
                      <p className="text-sm" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                        Receive a detailed plan tailored to your needs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card 
              className="border-2 shadow-xl"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '30'
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                  >
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <span 
                    className="bg-clip-text text-transparent font-bold"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                    Alternative Contact
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Prefer to chat directly? We&apos;re here to help in any way that works best for you.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    <span style={{ color: colorPalette.secondary }}>
                      Email: {contactInfo?.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    <span style={{ color: colorPalette.secondary }}>
                      Phone: {contactInfo?.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    <span style={{ color: colorPalette.secondary }}>
                      Available 7 days a week
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

{/* TODO: Add testimonials */}
            {/* Testimonial */}
            {/* <Card 
              className="border-2 shadow-xl relative overflow-hidden"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '30'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 transform translate-x-8 -translate-y-8"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
              ></div>
              
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: colorPalette.primary }} />
                  ))}
                </div>
                <blockquote className="text-lg font-medium italic mb-4" style={{ color: colorPalette.secondary }}>
                  &quot;MD Events turned our dream wedding into reality. The consultation process was so smooth, 
                  and they understood our vision perfectly. Highly recommend booking a session!&quot;
                </blockquote>
                <cite className="text-sm font-medium" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  — Sarah & Michael, Wedding Clients
                </cite>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* Alternative Option Card */}
        <div className="mt-12">
          <Card 
            className="border-2 shadow-2xl relative overflow-hidden max-w-2xl mx-auto"
            style={{
              ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
              borderColor: colorPalette.primary + '30'
            }}
          >
            <div 
              className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 transform translate-x-10 -translate-y-10"
              style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
            ></div>
            
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                >
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle 
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={generateTextGradientStyle(colorPalette)}
              >
                Already Have a Plan?
              </CardTitle>
              <p className="mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                Skip the call — submit your event details now.
              </p>
            </CardHeader>
            
            <CardContent className="text-center relative z-10 pb-8">
              <LockEventButton colorPalette={colorPalette} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 