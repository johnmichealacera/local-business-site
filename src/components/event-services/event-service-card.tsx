'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { EventService } from '@/types/event-service'

interface EventServiceCardProps {
  service: EventService
}

export function EventServiceCard({ service }: EventServiceCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex-shrink-0">
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
            <p className="text-sm text-slate-500">
              {service.servicePackages.length} Package{service.servicePackages.length !== 1 ? 's' : ''} Available
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-center text-slate-600">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{service.duration}</span>
        </div>

        {/* Service Packages */}
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-3">Available Packages:</h4>
          <div className="space-y-2">
            {service.servicePackages.slice(0, 3).map((pkg, index) => (
              <div key={pkg.id} className="flex items-center p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    index === 0 ? 'bg-gray-400' : 
                    index === 1 ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-700 capitalize">{pkg.name}</span>
                </div>
              </div>
            ))}
            {service.servicePackages.length > 3 && (
              <div className="text-sm text-slate-500 italic text-center">
                +{service.servicePackages.length - 3} more packages
              </div>
            )}
          </div>
        </div>

        {/* Sample Inclusions from first package */}
        {service.servicePackages.length > 0 && service.servicePackages[0].inclusions.length > 0 && (
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-2">Sample Inclusions:</h4>
            <ul className="space-y-1">
              {service.servicePackages[0].inclusions.slice(0, 3).map((inclusion, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  {inclusion}
                </li>
              ))}
              {service.servicePackages[0].inclusions.length > 3 && (
                <li className="text-sm text-slate-500 italic">
                  +{service.servicePackages[0].inclusions.length - 3} more inclusions
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Sample Freebies from first package */}
        {service.servicePackages.length > 0 && service.servicePackages[0].freebies.length > 0 && (
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-2">Sample Freebies:</h4>
            <ul className="space-y-1">
              {service.servicePackages[0].freebies.slice(0, 2).map((freebie, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  {freebie}
                </li>
              ))}
              {service.servicePackages[0].freebies.length > 2 && (
                <li className="text-sm text-slate-500 italic">
                  +{service.servicePackages[0].freebies.length - 2} more freebies
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Tags */}
        {service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 flex-shrink-0">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
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

        {/* CTA Button */}
        <Link href={`/events-services/${service.id}`} className="block flex-shrink-0">
          <Button className="w-full group">
            View Packages
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
} 