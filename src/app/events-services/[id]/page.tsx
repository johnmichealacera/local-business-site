import { getEventServiceById } from '@/lib/event-services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Phone, ExternalLink, Tag, Star, ArrowLeft, Check, Plus, Crown, Sparkles, Heart, Zap, Shield, Award, Gem, Gift } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface EventServiceDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventServiceDetailPage({ params }: EventServiceDetailPageProps) {
  const { id } = await params
  const service = await getEventServiceById(id)

  if (!service) {
    notFound()
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/events-services" className="group inline-flex items-center bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-200/50">
            <ArrowLeft className="h-5 w-5 mr-3 text-purple-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-slate-700 font-medium group-hover:text-purple-700 transition-colors">Back to Services</span>
            <Sparkles className="h-4 w-4 ml-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 relative">
          {/* Header Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-purple-50/40 to-pink-50/60 backdrop-blur-sm rounded-3xl -mx-4 py-8"></div>
          
          <div className="relative z-10 px-4">
            <div className="text-center mb-8">
              {service.isFeatured && (
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <Crown className="h-16 w-16 text-yellow-500 animate-pulse" />
                    <div className="absolute -inset-4 bg-yellow-300 rounded-full opacity-20 animate-ping"></div>
                    <Award className="h-6 w-6 text-yellow-600 absolute -top-2 -right-2 animate-bounce" />
                  </div>
                </div>
              )}
              
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
                {service.name}
              </h1>
              
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-5 w-5 text-pink-500 mr-2 animate-pulse" />
                <p className="text-xl text-slate-700 font-medium italic">
                  &quot;Where Dreams Become Reality&quot;
                </p>
                <Heart className="h-5 w-5 text-pink-500 ml-2 animate-pulse" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">{service.description}</p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                    <Gem className="h-5 w-5 text-purple-600 mr-2" />
                    <Badge variant="secondary" className="bg-transparent border-0 text-purple-700 font-semibold">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center bg-gradient-to-r from-blue-100 to-teal-100 px-4 py-2 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-blue-700 font-medium">{service.duration}</span>
                  </div>
                  
                  <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-700 font-medium">Quality</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 rounded-3xl shadow-2xl border border-purple-200/50">
                    <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-4 animate-bounce" />
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {formatPrice(service.basePrice)}
                    </div>
                    <p className="text-slate-600 font-medium">Starting Price</p>
                    <div className="mt-4">
                      <div className="flex items-center justify-center text-sm text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span>Best Value Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Inclusions */}
            <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200/50 shadow-xl group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-20 transform translate-x-10 -translate-y-10"></div>
                <CardTitle className="flex items-center relative z-10">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-green-300 rounded-full opacity-0 group-hover:opacity-30 animate-pulse"></div>
                  </div>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold text-xl">
                    Inclusions
                  </span>
                </CardTitle>
                <p className="text-slate-600 mt-2">Everything you need for the perfect experience</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-start group/item">
                      <div className="relative">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <div className="absolute -inset-1 bg-green-300 rounded-full opacity-0 group-hover/item:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <span className="text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors leading-relaxed">{inclusion}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <p className="text-sm text-green-700 font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>All inclusions guaranteed with our service promise</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            {service.addOns.length > 0 && (
              <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200/50 shadow-xl">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-20 transform translate-x-12 -translate-y-12"></div>
                  <CardTitle className="flex items-center relative z-10">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <Sparkles className="h-4 w-4 text-blue-400 absolute -top-1 -right-1 animate-ping" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xl">
                      Add-ons
                    </span>
                  </CardTitle>
                  <p className="text-slate-600 mt-2">Enhance your experience with our exclusive extras</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {service.addOns.map((addOn, index) => (
                      <div key={index} className="group p-6 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                              <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{addOn.name}</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{addOn.description}</p>
                          </div>
                          <div className="text-right ml-6">
                            <div className="relative">
                              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                              <div className="relative bg-white px-4 py-2 rounded-lg shadow-sm">
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatPrice(addOn.price)}</div>
                                <p className="text-slate-500 text-sm font-medium">Additional</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-xl border-2 border-blue-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Crown className="h-6 w-6 text-blue-600 mr-3" />
                        <span className="text-lg font-bold text-blue-700">Complete Package Total:</span>
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(service.basePrice + totalAddOnPrice)}
                      </div>
                    </div>
                    <p className="text-sm text-blue-600 mt-2 flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Ultimate experience with all enhancements included
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Freebies */}
            {service.freebies.length > 0 && (
              <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border-2 border-yellow-200/50 shadow-xl">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
                  <CardTitle className="flex items-center relative z-10">
                    <div className="relative">
                      <Gift className="h-6 w-6 text-yellow-600 mr-3 animate-bounce" />
                      <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-ping" />
                    </div>
                    <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
                      Exclusive Complimentary Items
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.freebies.map((freebie, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="relative">
                          <Star className="h-5 w-5 text-yellow-600 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute -inset-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{freebie}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                    <p className="text-sm text-yellow-700 font-medium flex items-center">
                      <Gift className="h-4 w-4 mr-2" />
                      <span>All complimentary items included at no extra cost!</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {service.tags.length > 0 && (
              <Card className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 border-2 border-slate-200/50 shadow-xl">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-slate-300 to-gray-300 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
                  <CardTitle className="flex items-center relative z-10">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full flex items-center justify-center mr-3">
                        <Tag className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-slate-300 rounded-full opacity-30 animate-pulse"></div>
                    </div>
                    <span className="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent font-bold">
                      Service Excellence Tags
                    </span>
                  </CardTitle>
                  <p className="text-slate-600 text-sm mt-2">Specialized categories that define our expertise</p>
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
                          className="px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-slate-400 hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 transition-all duration-300 cursor-default group-hover:scale-110 group-hover:shadow-md font-medium"
                        >
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full mr-2 group-hover:animate-pulse"></span>
                            {tag}
                          </span>
                        </Badge>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10"></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium flex items-center">
                      <Award className="h-4 w-4 mr-2 text-slate-500" />
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
            <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-purple-300 rounded-full opacity-30 animate-ping"></div>
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                    Connect With Us
                  </span>
                </CardTitle>
                <p className="text-slate-600 text-sm mt-2">Ready to make your dreams come true?</p>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                {service.contactEmail && (
                  <div className="group flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Email</p>
                      <span className="text-sm font-medium text-slate-700">{service.contactEmail}</span>
                    </div>
                  </div>
                )}
                {service.contactPhone && (
                  <div className="group flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Phone</p>
                      <span className="text-sm font-medium text-slate-700">{service.contactPhone}</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3 pt-4">
                  {service.bookingUrl && (
                    <Link href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Book Now - Service
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full py-3 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Custom Quote
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <p className="text-xs text-purple-700 font-medium flex items-center">
                    <Crown className="h-3 w-3 mr-1" />
                    <span>VIP customer service guaranteed</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-20 transform translate-x-10 -translate-y-10"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                    <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1 animate-ping" />
                  </div>
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">
                    Investment Summary
                  </span>
                </CardTitle>
                <p className="text-slate-600 text-sm mt-2">Transparent pricing for your peace of mind</p>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg">
                  <span className="text-slate-700 font-medium">Base Experience</span>
                  <span className="font-bold text-slate-900">{formatPrice(service.basePrice)}</span>
                </div>
                {service.addOns.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <span className="text-slate-700 font-medium">Add-ons</span>
                    <span className="font-semibold text-blue-600">+{formatPrice(totalAddOnPrice)}</span>
                  </div>
                )}
                <div className="border-t-2 border-gradient-to-r from-amber-200 to-orange-200 pt-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
                    <div className="flex items-center">
                      <Crown className="h-5 w-5 text-amber-600 mr-2" />
                      <span className="font-bold text-lg text-amber-700">Total Investment</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {formatPrice(service.basePrice + totalAddOnPrice)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Flexible payment options</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                  <p className="text-xs text-amber-700 font-medium flex items-center">
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