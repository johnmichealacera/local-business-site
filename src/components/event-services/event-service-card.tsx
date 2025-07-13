import { EventService } from '@/types/event-service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Phone, ExternalLink, Tag, Star } from 'lucide-react'
import Link from 'next/link'

interface EventServiceCardProps {
  service: EventService
}

export function EventServiceCard({ service }: EventServiceCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 line-clamp-2">
              {service.name}
              {service.isFeatured && (
                <Star className="inline ml-2 h-4 w-4 text-yellow-500 fill-current" />
              )}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {service.description}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <Badge variant="secondary" className="font-semibold">
            {service.category}
          </Badge>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">
              {formatPrice(service.basePrice)}
            </p>
            <p className="text-sm text-slate-500">Base Price</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-slate-600">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{service.duration}</span>
        </div>

        {/* Inclusions */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Inclusions:</h4>
          <ul className="space-y-1">
            {service.inclusions.slice(0, 3).map((inclusion, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                {inclusion}
              </li>
            ))}
            {service.inclusions.length > 3 && (
              <li className="text-sm text-slate-500 italic">
                +{service.inclusions.length - 3} more inclusions
              </li>
            )}
          </ul>
        </div>

        {/* Freebies */}
        {service.freebies.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Freebies:</h4>
            <ul className="space-y-1">
              {service.freebies.slice(0, 2).map((freebie, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  {freebie}
                </li>
              ))}
              {service.freebies.length > 2 && (
                <li className="text-sm text-slate-500 italic">
                  +{service.freebies.length - 2} more freebies
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Tags */}
        {service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <Tag className="h-3 w-3 text-slate-400 mr-1" />
            {service.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {service.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 pt-4 border-t">
          {service.contactEmail && (
            <div className="flex items-center text-slate-600">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm truncate">{service.contactEmail}</span>
            </div>
          )}
          {service.contactPhone && (
            <div className="flex items-center text-slate-600">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">{service.contactPhone}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Link href={`/events-services/${service.id}`} className="flex-1">
            <Button className="w-full">
              View Details
            </Button>
          </Link>
          {service.bookingUrl && (
            <Link href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 