import { getEventServices, getEventServiceCategories } from '@/lib/event-services'
import { EventServiceCard } from '@/components/event-services/event-service-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, Star, Calendar, Users, Award, Sparkles, Crown, Zap, Heart, ArrowRight, CheckCircle } from 'lucide-react'
import { getSiteInfo } from '@/lib/site'
import { parseColorPalette, generateDynamicGradientStyle, generateTextGradientStyle } from '@/lib/colors'
import { BookingButton } from '@/components/booking/booking-button'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function EventServicesPage() {
  const [eventServices, categories, siteInfo] = await Promise.all([
    getEventServices(),
    getEventServiceCategories(),
    getSiteInfo()
  ])

  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF'])

  const featuredServices = eventServices.filter(service => service.isFeatured)
  const regularServices = eventServices.filter(service => !service.isFeatured)

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
          style={generateDynamicGradientStyle('to-br', colorPalette, 0.4, 'normal')}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 animate-pulse" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.4, 'normal'),
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 animate-spin" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.2, 'light'),
            animationDuration: '20s'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Crown className="h-16 w-16 animate-bounce" style={{ color: colorPalette.primary }} />
              <Sparkles className="h-6 w-6 absolute -top-2 -right-2 animate-ping" style={{ color: colorPalette.primary }} />
            </div>
          </div>
          <h1 
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent mb-6 leading-tight"
            style={generateTextGradientStyle(colorPalette)}
          >
            Event Services
          </h1>
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
            <p className="text-xl font-medium" style={{ color: colorPalette.secondary }}>
              Crafting Unforgettable Moments
            </p>
            <Heart className="h-5 w-5 ml-2" style={{ color: colorPalette.primary }} />
          </div>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            Experience the pinnacle of event excellence with our services. From intimate celebrations to grand corporate gatherings, 
            we transform your vision into extraordinary memories that sparkle with perfection.
          </p>
          
          {/* Features Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-12">
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>Quality</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Zap className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>Lightning Fast Setup</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Crown className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>VIP Treatment</span>
            </div>
          </div>

          {/* Booking CTA Section */}
          <div className="relative mb-16">
            <Card 
              className="backdrop-blur-lg border-2 shadow-2xl relative overflow-hidden mx-auto max-w-2xl"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.08, 'light'),
                borderColor: colorPalette.primary + '30'
              }}
            >
              <div 
                className="absolute inset-0 opacity-50"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}
              ></div>
              <div className="absolute top-4 right-4">
                <Sparkles className="h-6 w-6 animate-pulse" style={{ color: colorPalette.primary }} />
              </div>
              
              <CardContent className="py-12 px-8 text-center relative z-10">
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                  >
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 
                    className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent mb-3"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                    Ready to Begin Your Event Journey?
                  </h3>
                  <p className="text-lg max-w-lg mx-auto leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                                         Skip the back-and-forth emails. Book your consultation instantly and let&apos;s start planning your unforgettable event.
                  </p>
                </div>
                
                <BookingButton 
                  zcalUrl="https://zcal.co/md-events-services"
                  colorPalette={siteInfo?.colorPalette}
                  variant="primary"
                  size="lg"
                  description="Free consultation • Instant booking • 24/7 availability"
                  className="mb-4"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105" style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}>
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
              ></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Calendar className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" style={{ color: colorPalette.primary }} />
                    <div className="absolute -inset-2 rounded-full opacity-20 group-hover:animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
                  </div>
                </div>
                <div 
                  className="text-4xl font-bold bg-clip-text text-transparent mb-2"
                  style={generateTextGradientStyle(colorPalette)}
                >
                  {eventServices.length}
                </div>
                <p className="font-medium" style={{ color: colorPalette.secondary }}>Services</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105" style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}>
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
              ></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Users className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" style={{ color: colorPalette.primary }} />
                    <div className="absolute -inset-2 rounded-full opacity-20 group-hover:animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
                  </div>
                </div>
                <div 
                  className="text-4xl font-bold bg-clip-text text-transparent mb-2"
                  style={generateTextGradientStyle(colorPalette)}
                >
                  {categories?.length || 0}
                </div>
                <p className="font-medium" style={{ color: colorPalette.secondary }}>Service Categories</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105" style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}>
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
              ></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Award className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" style={{ color: colorPalette.primary }} />
                    <div className="absolute -inset-2 rounded-full opacity-20 group-hover:animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
                  </div>
                </div>
                <div 
                  className="text-4xl font-bold bg-clip-text text-transparent mb-2"
                  style={generateTextGradientStyle(colorPalette)}
                >
                  {featuredServices.length}
                </div>
                <p className="font-medium" style={{ color: colorPalette.secondary }}>Featured Experiences</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent mb-4"
                style={generateTextGradientStyle(colorPalette)}
              >
                Explore Our Signature Categories
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                Each category represents our commitment to excellence and attention to detail
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories?.map((category, index) => (
                <div 
                  key={category} 
                  className="group relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-base px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-transparent hover:bg-gradient-to-r transition-all duration-300 cursor-pointer group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      borderColor: colorPalette.primary + '50',
                      background: `linear-gradient(to right, ${colorPalette.primary}10, ${colorPalette.tertiary}10)`
                    }}
                  >
                    <span className="flex items-center">
                      {category}
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </span>
                  </Badge>
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"
                    style={generateDynamicGradientStyle('to-r', colorPalette, 0.4, 'normal')}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Services Section */}
        {featuredServices.length > 0 && (
          <div className="mb-20 relative">
            {/* Section Background */}
            <div 
              className="absolute inset-0 rounded-3xl -mx-4 py-12"
              style={generateDynamicGradientStyle('to-r', colorPalette, 0.05, 'light')}
            ></div>
            
            <div className="relative z-10 px-4">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Star className="h-12 w-12 animate-pulse" style={{ color: colorPalette.primary }} />
                    <div className="absolute inset-0 rounded-full opacity-30 animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
                  </div>
                </div>
                <h2 
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4"
                  style={generateTextGradientStyle(colorPalette)}
                >
                  ✨ Signature Experiences ✨
                </h2>
                <p className="max-w-3xl mx-auto text-lg" style={{ color: colorPalette.secondary }}>
                  Our most exclusive and sought-after services, handpicked for those who demand nothing but extraordinary
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service, index) => (
                  <div 
                    key={service.id} 
                    className="transform hover:scale-105 transition-all duration-500"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <EventServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Services Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent mb-4"
              style={generateTextGradientStyle(colorPalette)}
            >
              {featuredServices.length > 0 ? 'Complete Service Portfolio' : 'Our Services'}
            </h2>
            <p className="max-w-2xl mx-auto mb-8" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              Discover our full range of professional services, each crafted with precision and passion
            </p>
            
            {/* Filter and Search */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 border-2"
                style={{ borderColor: colorPalette.primary + '50' }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter Services
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 border-2"
                style={{ borderColor: colorPalette.primary + '50' }}
              >
                <Search className="h-4 w-4 mr-2" />
                Search Services
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredServices.length > 0 ? regularServices : eventServices).map((service, index) => (
              <div 
                key={service.id}
                className="transform hover:scale-105 transition-all duration-500"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <EventServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {eventServices.length === 0 && (
          <div className="text-center py-20 relative">
            <div 
              className="absolute inset-0 rounded-3xl opacity-50"
              style={generateDynamicGradientStyle('to-r', colorPalette, 0.05, 'light')}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <Calendar className="h-24 w-24 animate-pulse" style={{ color: colorPalette.primary, opacity: 0.3 }} />
                  <Sparkles className="h-8 w-8 absolute -top-2 -right-2 animate-bounce" style={{ color: colorPalette.primary }} />
                </div>
              </div>
              <h3 
                className="text-3xl font-bold bg-clip-text text-transparent mb-4"
                style={generateTextGradientStyle(colorPalette)}
              >
                Something Spectacular is Coming!
              </h3>
              <p className="max-w-2xl mx-auto text-lg mb-8" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                We&apos;re crafting extraordinary event experiences that will exceed your wildest expectations. 
                Our services are being prepared with meticulous attention to detail.
              </p>
              <div 
                className="inline-flex items-center px-6 py-3 rounded-full"
                style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
              >
                <Crown className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                <span className="font-medium" style={{ color: colorPalette.secondary }}>Services Coming Soon</span>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20 relative">
          <div 
            className="absolute inset-0 rounded-3xl opacity-10"
            style={generateDynamicGradientStyle('to-r', colorPalette, 1, 'normal')}
          ></div>
          <Card className="backdrop-blur-lg border-0 shadow-2xl relative overflow-hidden" style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}>
            <div 
              className="absolute inset-0"
              style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
            ></div>
            <div className="absolute top-4 right-4">
              <Sparkles className="h-8 w-8 animate-spin" style={{ color: colorPalette.primary, animationDuration: '3s' }} />
            </div>
            <div className="absolute bottom-4 left-4">
              <Crown className="h-8 w-8 animate-pulse" style={{ color: colorPalette.primary }} />
            </div>
            
            <CardContent className="py-16 px-8 relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                  >
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <div 
                    className="absolute -inset-4 rounded-full opacity-20 animate-ping"
                    style={generateDynamicGradientStyle('to-r', colorPalette, 0.4, 'normal')}
                  ></div>
                </div>
              </div>
              
              <h3 
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-6"
                style={generateTextGradientStyle(colorPalette)}
              >
                Dream Beyond Boundaries
              </h3>
              
              <p className="mb-8 max-w-3xl mx-auto text-lg leading-relaxed" style={{ color: colorPalette.secondary }}>
                Your vision deserves nothing less than perfection. Our bespoke event services transform impossible dreams 
                into unforgettable realities. Let us craft something extraordinary, just for you.
              </p>
              
              <div className="space-y-6">
                <BookingButton 
                  zcalUrl="https://zcal.co/md-events-services"
                  colorPalette={siteInfo?.colorPalette}
                  variant="primary"
                  size="lg"
                  description="Easily book a meeting or event with MD using our smart scheduler"
                />
                
                <Button 
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
                
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    Free Consultation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    24/7 Support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                    Satisfaction Guarantee
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 