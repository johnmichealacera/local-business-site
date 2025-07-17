import { getSiteInfo } from '@/lib/site'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Sparkles, CheckCircle, Star, Crown, Heart } from 'lucide-react'
import { parseColorPalette, generateDynamicGradientStyle, generateTextGradientStyle } from '@/lib/colors'
import { SiteFeature } from '@/types/site'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function BookingPage() {
  const siteInfo = await getSiteInfo()
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
              >
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -inset-4 rounded-full opacity-20 animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent mb-6 leading-tight"
            style={generateTextGradientStyle(colorPalette)}
          >
            Book Your Event
          </h1>
          
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

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>Free Consultation</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Clock className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>30-60 Minutes</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Star className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>Expert Guidance</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Crown className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>Personalized Service</span>
            </div>
          </div>
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
                      Email: events@mdservices.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    <span style={{ color: colorPalette.secondary }}>
                      Phone: +63 917 123 4567
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

            {/* Testimonial */}
            <Card 
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 