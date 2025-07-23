import { notFound } from 'next/navigation'
import { getEventServiceById } from '@/lib/event-services'
import { getSiteInfo } from '@/lib/site'
import { parseColorPalette, generateDynamicGradientStyle } from '@/lib/colors'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Mail, 
  Phone, 
  Tag, 
  Check, 
  Plus, 
  Gift, 
  Crown,
  Calendar,
  Users,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { BookingButton } from '@/components/booking/booking-button'
import { SiteFeature } from '@/types/site'

interface EventServiceDetailPageProps {
  params: Promise<{ id: string }>
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

  const zcalUrl = siteInfo?.features.find(f => f.name === SiteFeature.EVENT_SERVICES)?.zcalLink

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

      {/* Header */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/events-services"
            className="inline-flex items-center mb-6 group"
            style={{ color: colorPalette.primary }}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          {/* Service Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Badge 
                variant="secondary" 
                className="text-sm font-semibold px-4 py-2"
                style={{ backgroundColor: colorPalette.primary + '20', color: colorPalette.primary }}
              >
                {service.category}
              </Badge>
              {service.isFeatured && (
                <Star className="ml-3 h-5 w-5 text-yellow-500 fill-current" />
              )}
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: colorPalette.secondary }}
            >
              {service.name}
            </h1>
            
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
              style={{ color: colorPalette.secondary, opacity: 0.8 }}
            >
              {service.description}
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                <span style={{ color: colorPalette.secondary }}>{service.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
                <span style={{ color: colorPalette.secondary }}>{service.servicePackages.length} Packages Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Service Packages */}
              <div className="space-y-6">
                <h2 
                  className="text-3xl font-bold text-center mb-8"
                  style={{ color: colorPalette.secondary }}
                >
                  Choose Your Package
                </h2>
                
                {service.servicePackages.map((pkg, index) => (
                  <Card 
                    key={pkg.id}
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
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            index === 0 ? 'bg-gray-400' : 
                            index === 1 ? 'bg-yellow-500' : 'bg-purple-500'
                          }`}>
                            <Crown className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle 
                              className="text-2xl font-bold capitalize"
                              style={{ color: colorPalette.secondary }}
                            >
                              {pkg.name} Package
                            </CardTitle>
                            {pkg.description && (
                              <p className="mt-1" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                                {pkg.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Inclusions */}
                      {pkg.inclusions.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center" style={{ color: colorPalette.secondary }}>
                            <Check className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                            Inclusions
                          </h4>
                          <ul className="space-y-2">
                            {pkg.inclusions.map((inclusion, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                <span style={{ color: colorPalette.secondary }}>{inclusion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Add-ons */}
                      {pkg.addOns && pkg.addOns.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center" style={{ color: colorPalette.secondary }}>
                            <Plus className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                            Add-ons
                          </h4>
                          <div className="space-y-3">
                            {pkg.addOns.map((addOn, idx) => (
                              <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                                <div>
                                  <p className="font-medium" style={{ color: colorPalette.secondary }}>{addOn.name}</p>
                                  <p className="text-sm" style={{ color: colorPalette.secondary, opacity: 0.7 }}>{addOn.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Freebies */}
                      {pkg.freebies.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center" style={{ color: colorPalette.secondary }}>
                            <Gift className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                            Complimentary Items
                          </h4>
                          <ul className="space-y-2">
                            {pkg.freebies.map((freebie, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                <span style={{ color: colorPalette.secondary }}>{freebie}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

{/* TODO: Add package CTA */}
                      {/* Package CTA */}
                      {/* <div className="pt-4 border-t" style={{ borderColor: colorPalette.primary + '30' }}>
                        <Button 
                          className="w-full group"
                          size="lg"
                          style={{
                            background: generateDynamicGradientStyle('to-r', colorPalette, 1, 'normal').background
                          }}
                        >
                          Choose {pkg.name} Package
                          <ArrowLeft className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div> */}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tags */}
              {service.tags.length > 0 && (
                <Card 
                  className="border-2"
                  style={{
                    ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                    borderColor: colorPalette.primary + '50'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center" style={{ color: colorPalette.secondary }}>
                      <Tag className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                      Service Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          style={{ borderColor: colorPalette.primary + '50', color: colorPalette.primary }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact & Booking */}
              <Card 
                className="border-2 sticky top-8"
                style={{
                  ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                  borderColor: colorPalette.primary + '50'
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: colorPalette.secondary }}>
                    <Calendar className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                    Book This Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {zcalUrl ? (
                    <BookingButton 
                      zcalUrl={zcalUrl}
                      colorPalette={siteInfo?.colorPalette}
                      size="lg"
                      className="w-full"
                    />
                  ) : (
                    <Link href="/book">
                      <Button 
                        size="lg" 
                        className="w-full"
                        style={{
                          background: generateDynamicGradientStyle('to-r', colorPalette, 1, 'normal').background
                        }}
                      >
                        Contact for Booking
                      </Button>
                    </Link>
                  )}
                  
                  <div className="text-center">
                    <p className="text-sm" style={{ color: colorPalette.secondary, opacity: 0.7 }}>
                      Get a custom quote and book your perfect event
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              {(service.contactEmail || service.contactPhone) && (
                <Card 
                  className="border-2"
                  style={{
                    ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                    borderColor: colorPalette.primary + '50'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center" style={{ color: colorPalette.secondary }}>
                      <Award className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {service.contactEmail && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3" style={{ color: colorPalette.primary }} />
                        <span className="text-sm" style={{ color: colorPalette.secondary }}>
                          {service.contactEmail}
                        </span>
                      </div>
                    )}
                    {service.contactPhone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3" style={{ color: colorPalette.primary }} />
                        <span className="text-sm" style={{ color: colorPalette.secondary }}>
                          {service.contactPhone}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

{/* TODO: Add service summary */}
              {/* Service Summary */}
              {/* <Card 
                className="border-2"
                style={{
                  ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
                  borderColor: colorPalette.primary + '50'
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: colorPalette.secondary }}>
                    <Shield className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                    Service Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: colorPalette.secondary }}>Category</span>
                    <span className="font-semibold" style={{ color: colorPalette.primary }}>{service.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: colorPalette.secondary }}>Duration</span>
                    <span className="font-semibold" style={{ color: colorPalette.primary }}>{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: colorPalette.secondary }}>Packages</span>
                    <span className="font-semibold" style={{ color: colorPalette.primary }}>{service.servicePackages.length}</span>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 