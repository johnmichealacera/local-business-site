import { getEventServiceById } from '@/lib/event-services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Phone, ExternalLink, Tag, Star, ArrowLeft, Check, Plus } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/events-services" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event Services
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {service.name}
                {service.isFeatured && (
                  <Star className="inline ml-3 h-8 w-8 text-yellow-500 fill-current" />
                )}
              </h1>
              <p className="text-slate-600 text-lg mb-4">{service.description}</p>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  {service.category}
                </Badge>
                <div className="flex items-center text-slate-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right ml-8">
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {formatPrice(service.basePrice)}
              </div>
              <p className="text-slate-500">Base Price</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Inclusions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  What&apos;s Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Add-ons */}
            {service.addOns.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 text-blue-600 mr-2" />
                    Available Add-ons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {service.addOns.map((addOn, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">{addOn.name}</h4>
                          <p className="text-slate-600 text-sm">{addOn.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold text-slate-900">{formatPrice(addOn.price)}</div>
                          <p className="text-slate-500 text-sm">Additional</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Total with all add-ons:</strong> {formatPrice(service.basePrice + totalAddOnPrice)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Freebies */}
            {service.freebies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-600 mr-2" />
                    Complimentary Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.freebies.map((freebie, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{freebie}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {service.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="h-5 w-5 text-slate-600 mr-2" />
                    Service Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-sm">
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
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.contactEmail && (
                  <div className="flex items-center text-slate-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">{service.contactEmail}</span>
                  </div>
                )}
                {service.contactPhone && (
                  <div className="flex items-center text-slate-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">{service.contactPhone}</span>
                  </div>
                )}
                
                <div className="space-y-2 pt-4">
                  {service.bookingUrl && (
                    <Link href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Base Price</span>
                  <span className="font-semibold">{formatPrice(service.basePrice)}</span>
                </div>
                {service.addOns.length > 0 && (
                  <div className="flex justify-between items-center text-slate-500">
                    <span>All Add-ons</span>
                    <span>+{formatPrice(totalAddOnPrice)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Maximum Total</span>
                    <span>{formatPrice(service.basePrice + totalAddOnPrice)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Final pricing may vary based on specific requirements and customizations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 