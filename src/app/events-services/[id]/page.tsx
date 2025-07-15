import { getEventServiceById } from '@/lib/event-services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Phone, ExternalLink, Tag, Star, ArrowLeft, Check, Plus, Crown, Sparkles, Heart, Shield, Award, Gem, Gift } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteInfo } from '@/lib/site'
import { parseColorPalette, generateDynamicGradientStyle, generateTextGradientStyle } from '@/lib/colors'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface EventServiceDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventServiceDetailPage({ params }: EventServiceDetailPageProps) {
  const { id } = await params
  const [service, siteInfo] = await Promise.all([
    getEventServiceById(id),
    getSiteInfo()
  ])

  if (!service) {
    notFound()
  }

  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF'])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const totalAddOnPrice = service.addOns.reduce((sum, addOn) => sum + addOn.price, 0)

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light')}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-15 animate-pulse"
          style={generateDynamicGradientStyle('to-br', colorPalette, 0.4, 'normal')}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 animate-pulse" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.4, 'normal'),
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full opacity-10 animate-bounce" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal'),
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full opacity-10 animate-bounce" 
          style={{
            ...generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal'),
            animationDelay: '3s'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/events-services" 
            className="inline-flex items-center text-sm font-medium hover:scale-105 transition-all duration-300 border-2 border-transparent hover:shadow-lg"
            style={{ 
              color: colorPalette.secondary,
              borderColor: colorPalette.primary + '50'
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event Services
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12 text-center relative">
          <div 
            className="absolute inset-0 rounded-3xl -mx-4 py-8"
            style={generateDynamicGradientStyle('to-r', colorPalette, 0.03, 'light')}
          ></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                >
                  <Crown className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -inset-4 rounded-full opacity-20 animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
              </div>
            </div>
            
            <h1 
              className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent mb-6 leading-tight"
              style={generateTextGradientStyle(colorPalette)}
            >
              {service.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div 
                className="flex items-center px-4 py-2 rounded-full"
                style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
              >
                <Tag className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>{service.category}</span>
              </div>
              <div 
                className="flex items-center px-4 py-2 rounded-full"
                style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
              >
                <Clock className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>{service.duration}</span>
              </div>
              <div 
                className="flex items-center px-4 py-2 rounded-full"
                style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
              >
                <Star className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>Premium Service</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div 
                  className="p-8 rounded-3xl shadow-2xl border-2"
                  style={{
                    ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                    borderColor: colorPalette.primary + '50'
                  }}
                >
                  <div 
                    className="text-5xl font-bold bg-clip-text text-transparent mb-2"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                                         {formatPrice(service.basePrice)}
                  </div>
                  <p className="text-lg font-medium" style={{ color: colorPalette.secondary }}>Starting Price</p>
                </div>
                <div className="absolute -inset-4 rounded-full opacity-20 animate-pulse" style={generateDynamicGradientStyle('to-r', colorPalette, 0.4, 'normal')}></div>
              </div>
            </div>
            
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              {service.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Inclusions */}
            <Card 
              className="border-2 shadow-xl group hover:shadow-2xl transition-all duration-500"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '50'
              }}
            >
              <CardHeader className="relative overflow-hidden">
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 transform translate-x-10 -translate-y-10"
                  style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
                ></div>
                <CardTitle className="flex items-center relative z-10">
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300"
                      style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                    >
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-30 animate-pulse" style={{ backgroundColor: colorPalette.primary }}></div>
                  </div>
                  <span 
                    className="bg-clip-text text-transparent font-bold text-xl"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                    Inclusions
                  </span>
                </CardTitle>
                <p className="mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>Everything you need for the perfect experience</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-start group/item">
                      <div className="relative">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300"
                          style={generateDynamicGradientStyle('to-br', colorPalette, 0.8, 'normal')}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <div className="absolute -inset-1 rounded-full opacity-0 group-hover/item:opacity-20 transition-opacity duration-300" style={{ backgroundColor: colorPalette.primary }}></div>
                      </div>
                      <span className="font-medium group-hover/item:transition-colors leading-relaxed" style={{ color: colorPalette.secondary }}>{inclusion}</span>
                    </li>
                  ))}
                </ul>
                <div 
                  className="mt-6 p-4 rounded-lg"
                  style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
                >
                  <p className="text-sm font-medium flex items-center" style={{ color: colorPalette.secondary }}>
                    <Shield className="h-4 w-4 mr-2" />
                    <span>All inclusions guaranteed with our service promise</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            {service.addOns.length > 0 && (
              <Card 
                className="border-2 shadow-xl"
                style={{
                  ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                  borderColor: colorPalette.primary + '50'
                }}
              >
                <CardHeader className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-20 transform translate-x-12 -translate-y-12"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
                  ></div>
                  <CardTitle className="flex items-center relative z-10">
                    <div className="relative">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 animate-pulse"
                        style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                      >
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-ping" style={{ color: colorPalette.primary }} />
                    </div>
                    <span 
                      className="bg-clip-text text-transparent font-bold text-xl"
                      style={generateTextGradientStyle(colorPalette)}
                    >
                      Add-ons
                    </span>
                  </CardTitle>
                  <p className="mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>Enhance your experience with our exclusive extras</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {service.addOns.map((addOn, index) => (
                      <div 
                        key={index} 
                        className="group p-6 backdrop-blur-sm rounded-xl border hover:shadow-lg transition-all duration-300"
                        style={{
                          ...generateDynamicGradientStyle('to-r', colorPalette, 0.03, 'light'),
                          borderColor: colorPalette.primary + '50'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div 
                                className="w-2 h-2 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"
                                style={generateDynamicGradientStyle('to-r', colorPalette, 1, 'normal')}
                              ></div>
                              <h4 className="font-bold group-hover:transition-colors" style={{ color: colorPalette.secondary }}>{addOn.name}</h4>
                            </div>
                            <p className="leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>{addOn.description}</p>
                          </div>
                          <div className="text-right ml-6">
                            <div className="relative">
                              <div 
                                className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                style={generateDynamicGradientStyle('to-r', colorPalette, 0.4, 'normal')}
                              ></div>
                              <div className="relative bg-white px-4 py-2 rounded-lg shadow-sm">
                                <div 
                                  className="text-2xl font-bold bg-clip-text text-transparent"
                                  style={generateTextGradientStyle(colorPalette)}
                                >
                                  {formatPrice(addOn.price)}
                                </div>
                                <p className="text-sm font-medium" style={{ color: colorPalette.secondary, opacity: 0.6 }}>Additional</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div 
                    className="mt-8 p-6 rounded-xl border-2"
                    style={{
                      ...generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light'),
                      borderColor: colorPalette.primary + '50'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Crown className="h-6 w-6 mr-3" style={{ color: colorPalette.primary }} />
                        <span className="text-lg font-bold" style={{ color: colorPalette.secondary }}>Complete Package Total:</span>
                      </div>
                      <div 
                        className="text-3xl font-bold bg-clip-text text-transparent"
                        style={generateTextGradientStyle(colorPalette)}
                      >
                        {formatPrice(service.basePrice + totalAddOnPrice)}
                      </div>
                    </div>
                    <p className="text-sm mt-2 flex items-center" style={{ color: colorPalette.secondary }}>
                      <Star className="h-4 w-4 mr-1" />
                      Ultimate experience with all enhancements included
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Freebies */}
            {service.freebies.length > 0 && (
              <Card 
                className="border-2 shadow-xl"
                style={{
                  ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                  borderColor: colorPalette.primary + '50'
                }}
              >
                <CardHeader className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 transform translate-x-8 -translate-y-8"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
                  ></div>
                  <CardTitle className="flex items-center relative z-10">
                    <div className="relative">
                      <Gift className="h-6 w-6 mr-3 animate-bounce" style={{ color: colorPalette.primary }} />
                      <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-ping" style={{ color: colorPalette.primary }} />
                    </div>
                    <span 
                      className="bg-clip-text text-transparent font-bold"
                      style={generateTextGradientStyle(colorPalette)}
                    >
                      Exclusive Complimentary Items
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.freebies.map((freebie, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="relative">
                          <Star className="h-5 w-5 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ color: colorPalette.primary }} />
                          <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: colorPalette.primary }}></div>
                        </div>
                        <span className="font-medium group-hover:transition-colors" style={{ color: colorPalette.secondary }}>{freebie}</span>
                      </li>
                    ))}
                  </ul>
                  <div 
                    className="mt-6 p-4 rounded-lg"
                    style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
                  >
                    <p className="text-sm font-medium flex items-center" style={{ color: colorPalette.secondary }}>
                      <Gift className="h-4 w-4 mr-2" />
                      <span>All complimentary items included at no extra cost!</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {service.tags.length > 0 && (
              <Card 
                className="border-2 shadow-xl"
                style={{
                  ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                  borderColor: colorPalette.primary + '50'
                }}
              >
                <CardHeader className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 transform translate-x-8 -translate-y-8"
                    style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
                  ></div>
                  <CardTitle className="flex items-center relative z-10">
                    <div className="relative">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                        style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                      >
                        <Tag className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -inset-1 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: colorPalette.primary }}></div>
                    </div>
                    <span 
                      className="bg-clip-text text-transparent font-bold"
                      style={generateTextGradientStyle(colorPalette)}
                    >
                      Service Excellence Tags
                    </span>
                  </CardTitle>
                  <p className="text-sm mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>Specialized categories that define our expertise</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map((tag, index) => (
                      <div 
                        key={tag} 
                        className="group relative"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <Badge 
                          variant="outline" 
                          className="px-4 py-2 bg-white/80 backdrop-blur-sm border-2 hover:bg-gradient-to-r transition-all duration-300 cursor-default group-hover:scale-110 group-hover:shadow-md font-medium"
                          style={{
                            borderColor: colorPalette.primary + '50',
                            background: `linear-gradient(to right, ${colorPalette.primary}05, ${colorPalette.tertiary}05)`
                          }}
                        >
                          <span className="flex items-center">
                            <span 
                              className="w-2 h-2 rounded-full mr-2 group-hover:animate-pulse"
                              style={generateDynamicGradientStyle('to-r', colorPalette, 0.8, 'normal')}
                            ></span>
                            {tag}
                          </span>
                        </Badge>
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10"
                          style={generateDynamicGradientStyle('to-r', colorPalette, 0.4, 'normal')}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div 
                    className="mt-6 p-4 rounded-lg"
                    style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
                  >
                    <p className="text-sm font-medium flex items-center" style={{ color: colorPalette.secondary }}>
                      <Award className="h-4 w-4 mr-2" />
                      <span>Each tag represents our commitment to specialized excellence</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact & Booking */}
            <Card 
              className="border-2 shadow-xl relative overflow-hidden"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '50'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 transform translate-x-16 -translate-y-16"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
              ></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center">
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -inset-1 rounded-full opacity-30 animate-ping" style={{ backgroundColor: colorPalette.primary }}></div>
                  </div>
                  <span 
                    className="bg-clip-text text-transparent font-bold"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                    Connect With Us
                  </span>
                </CardTitle>
                <p className="text-sm mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>Ready to make your dreams come true?</p>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                {service.contactEmail && (
                  <div className="group flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300"
                      style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                    >
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: colorPalette.secondary, opacity: 0.6 }}>Email</p>
                      <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>{service.contactEmail}</span>
                    </div>
                  </div>
                )}
                {service.contactPhone && (
                  <div className="group flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300"
                      style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                    >
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: colorPalette.secondary, opacity: 0.6 }}>Phone</p>
                      <span className="text-sm font-medium" style={{ color: colorPalette.secondary }}>{service.contactPhone}</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3 pt-4">
                  {service.bookingUrl && (
                    <Link href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button 
                        className="w-full text-white py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        style={{
                          background: `linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary}, ${colorPalette.tertiary})`
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Book Now - Service
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full py-3 rounded-xl border-2 transition-all duration-300"
                    style={{
                      borderColor: colorPalette.primary + '50',
                      background: `linear-gradient(to right, ${colorPalette.primary}05, ${colorPalette.tertiary}05)`
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Request Custom Quote
                  </Button>
                </div>
                
                <div 
                  className="mt-6 p-4 rounded-lg"
                  style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
                >
                  <p className="text-xs font-medium flex items-center" style={{ color: colorPalette.secondary }}>
                    <Crown className="h-3 w-3 mr-1" />
                    <span>VIP customer service guaranteed</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card 
              className="border-2 shadow-xl relative overflow-hidden"
              style={{
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                borderColor: colorPalette.primary + '50'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 transform translate-x-10 -translate-y-10"
                style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
              ></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center">
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3 animate-pulse"
                      style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
                    >
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                    <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-ping" style={{ color: colorPalette.primary }} />
                  </div>
                  <span 
                    className="bg-clip-text text-transparent font-bold"
                    style={generateTextGradientStyle(colorPalette)}
                  >
                    Investment Summary
                  </span>
                </CardTitle>
                <p className="text-sm mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>Transparent pricing for your peace of mind</p>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg">
                  <span className="font-medium" style={{ color: colorPalette.secondary }}>Base Experience</span>
                  <span className="font-bold" style={{ color: colorPalette.secondary }}>{formatPrice(service.basePrice)}</span>
                </div>
                {service.addOns.length > 0 && (
                  <div 
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={generateDynamicGradientStyle('to-r', colorPalette, 0.05, 'light')}
                  >
                    <span className="font-medium" style={{ color: colorPalette.secondary }}>Add-ons</span>
                    <span className="font-semibold" style={{ color: colorPalette.primary }}>+{formatPrice(totalAddOnPrice)}</span>
                  </div>
                )}
                <div className="border-t-2 pt-4" style={{ borderColor: colorPalette.primary + '50' }}>
                  <div 
                    className="flex justify-between items-center p-4 rounded-xl"
                    style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
                  >
                    <div className="flex items-center">
                      <Crown className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                      <span className="font-bold text-lg" style={{ color: colorPalette.secondary }}>Total Investment</span>
                    </div>
                    <span 
                      className="text-2xl font-bold bg-clip-text text-transparent"
                      style={generateTextGradientStyle(colorPalette)}
                    >
                      {formatPrice(service.basePrice + totalAddOnPrice)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center text-sm" style={{ color: colorPalette.primary }}>
                    <Check className="h-4 w-4 mr-2" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center text-sm" style={{ color: colorPalette.primary }}>
                    <Check className="h-4 w-4 mr-2" />
                    <span>Satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center text-sm" style={{ color: colorPalette.primary }}>
                    <Check className="h-4 w-4 mr-2" />
                    <span>Flexible payment options</span>
                  </div>
                </div>
                
                <div 
                  className="mt-6 p-4 rounded-lg"
                  style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
                >
                  <p className="text-xs font-medium flex items-center" style={{ color: colorPalette.secondary }}>
                    <Star className="h-3 w-3 mr-1" />
                    <span>Final pricing customized to your specific vision and requirements.</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 