import { getEventServices, getEventServiceCategories } from '@/lib/event-services'
import { EventServiceCard } from '@/components/event-services/event-service-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, Star, Calendar, Users, Award, Sparkles, Crown, Zap, Heart, ArrowRight, CheckCircle } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function EventServicesPage() {
  const [eventServices, categories] = await Promise.all([
    getEventServices(),
    getEventServiceCategories()
  ])

  const featuredServices = eventServices.filter(service => service.isFeatured)
  const regularServices = eventServices.filter(service => !service.isFeatured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Crown className="h-16 w-16 text-yellow-500 animate-bounce" />
              <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-ping" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Event Services
          </h1>
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-5 w-5 text-pink-500 mr-2" />
            <p className="text-xl text-slate-700 font-medium">
              Crafting Unforgettable Moments
            </p>
            <Heart className="h-5 w-5 text-pink-500 ml-2" />
          </div>
          <p className="text-slate-600 max-w-4xl mx-auto text-lg leading-relaxed">
            Experience the pinnacle of event excellence with our services. From intimate celebrations to grand corporate gatherings, 
            we transform your vision into extraordinary memories that sparkle with perfection.
          </p>
          
          {/* Features Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-slate-700">Quality</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Zap className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-slate-700">Lightning Fast Setup</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Crown className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-slate-700">VIP Treatment</span>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:scale-105">
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Calendar className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-2 bg-blue-200 rounded-full opacity-20 group-hover:animate-ping"></div>
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{eventServices.length}</div>
                <p className="text-slate-700 font-medium">Services</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-teal-50 hover:scale-105">
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Users className="h-12 w-12 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-2 bg-green-200 rounded-full opacity-20 group-hover:animate-ping"></div>
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">{categories.length}</div>
                <p className="text-slate-700 font-medium">Service Categories</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-yellow-50 to-orange-50 hover:scale-105">
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Award className="h-12 w-12 text-yellow-600 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-2 bg-yellow-200 rounded-full opacity-20 group-hover:animate-ping"></div>
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">{featuredServices.length}</div>
                <p className="text-slate-700 font-medium">Featured Experiences</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Explore Our Signature Categories
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Each category represents our commitment to excellence and attention to detail
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <div 
                  key={category} 
                  className="group relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-base px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer group-hover:scale-110 group-hover:shadow-lg"
                  >
                    <span className="flex items-center">
                      {category}
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </span>
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Services Section */}
        {featuredServices.length > 0 && (
          <div className="mb-20 relative">
            {/* Section Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 rounded-3xl -mx-4 py-12"></div>
            
            <div className="relative z-10 px-4">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Star className="h-12 w-12 text-yellow-500 animate-pulse" />
                    <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-30 animate-ping"></div>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  ✨ Signature Experiences ✨
                </h2>
                <p className="text-slate-700 max-w-3xl mx-auto text-lg">
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
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              {featuredServices.length > 0 ? 'Complete Service Portfolio' : 'Our Services'}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Discover our full range of professional services, each crafted with precision and passion
            </p>
            
            {/* Filter and Search */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 border-2 hover:border-purple-300">
                <Filter className="h-4 w-4 mr-2" />
                Filter Services
              </Button>
              <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 border-2 hover:border-blue-300">
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 rounded-3xl opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <Calendar className="h-24 w-24 text-purple-300 animate-pulse" />
                  <Sparkles className="h-8 w-8 text-purple-400 absolute -top-2 -right-2 animate-bounce" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Something Spectacular is Coming!
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-8">
                We&apos;re crafting extraordinary event experiences that will exceed your wildest expectations. 
                Our services are being prepared with meticulous attention to detail.
              </p>
              <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
                <Crown className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">Services Coming Soon</span>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-10"></div>
          <Card className="bg-gradient-to-br from-white/90 via-purple-50/80 to-pink-50/80 backdrop-blur-lg border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-pink-100/30 to-blue-100/30"></div>
            <div className="absolute top-4 right-4">
              <Sparkles className="h-8 w-8 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute bottom-4 left-4">
              <Crown className="h-8 w-8 text-yellow-500 animate-pulse" />
            </div>
            
            <CardContent className="py-16 px-8 relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-ping"></div>
                </div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Dream Beyond Boundaries
              </h3>
              
              <p className="text-slate-700 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Your vision deserves nothing less than perfection. Our bespoke event services transform impossible dreams 
                into unforgettable realities. Let us craft something extraordinary, just for you.
              </p>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Create My Custom Experience
                </Button>
                
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Free Consultation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    24/7 Support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
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