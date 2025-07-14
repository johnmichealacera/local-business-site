'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Eye, Clock, Users, PhilippinePeso, ChevronLeft, ChevronRight } from 'lucide-react'
import { Event } from '@/types/event'
import { formatPrice } from '@/lib/utils'
import { LoadingSkeleton } from '@/components/ui/loading-spinner'

interface EventCardProps {
  event: Event
  priority?: boolean
}

export function EventCard({ event, priority = false }: EventCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = event.imageUrls.length > 1
  const images = event.imageUrls.length > 0 ? event.imageUrls : ['/placeholder-event.jpg']

  const isUpcoming = new Date(event.startDate) > new Date()
  const isFree = event.price === 0
  const eventDate = new Date(event.startDate)
  const eventEndDate = event.endDate ? new Date(event.endDate) : null

  // Auto-advance carousel every 4 seconds when there are multiple images
  useEffect(() => {
    if (hasMultipleImages) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
      }, 4000)

      return () => clearInterval(timer)
    }
  }, [hasMultipleImages, images.length])

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }
  
  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card hover variant="elevated" className="group overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
          unoptimized={images[currentImageIndex] === '/placeholder-event.jpg'}
        />
        
        {/* Carousel Navigation - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                goToPreviousImage()
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                goToNextImage()
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    goToImage(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-md' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Overlay with action buttons */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <Link href={`/events/${event.id}`}>
            <Button size="sm" variant="outline" className="hover-lift">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {event.isFeatured && (
            <Badge variant="default" className="animate-fade-in">
              Featured
            </Badge>
          )}
          {isFree && (
            <Badge variant="secondary" className="animate-fade-in">
              Free
            </Badge>
          )}
          {!isUpcoming && (
            <Badge variant="outline" className="animate-fade-in">
              Past Event
            </Badge>
          )}
        </div>

        {/* Date badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg">
            <div className="text-xs font-medium text-slate-600">
              {eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
            </div>
            <div className="text-lg font-bold text-slate-900">
              {eventDate.getDate()}
            </div>
          </div>
        </div>

        {/* Image counter badge - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2">
            <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
              {currentImageIndex + 1}/{images.length}
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-slate-600 transition-colors">
              {event.title}
            </CardTitle>
            <div className="flex items-center space-x-1 mt-1 text-sm text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>{formatEventDate(eventDate)}</span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>{formatEventTime(eventDate)}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Event details */}
        <div className="space-y-2 mb-3">
          {event.location && (
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhilippinePeso className="h-4 w-4 text-slate-600" />
              <span className="text-lg font-bold text-slate-900">
                {isFree ? 'Free' : formatPrice(event.price)}
              </span>
            </div>
            
            {event.maxAttendees && (
              <div className="flex items-center space-x-1 text-sm text-slate-500">
                <Users className="h-4 w-4" />
                <span>Max {event.maxAttendees}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Description preview */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Link href={`/events/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full hover-lift">
              View Details
            </Button>
          </Link>
          {/* Not sure if we need this */}
          {/* {isUpcoming && (
            <Button className="btn-primary flex-1">
              Register
            </Button>
          )} */}
        </div>

        {/* Event duration */}
        {eventEndDate && (
          <div className="mt-3 text-xs text-slate-500 text-center">
            Until {formatEventDate(eventEndDate)} • {formatEventTime(eventEndDate)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Event card skeleton for loading states
export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video">
        <LoadingSkeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <LoadingSkeleton className="h-6 w-3/4" />
          <LoadingSkeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <LoadingSkeleton className="h-4 w-full" />
          <div className="flex items-center justify-between">
            <LoadingSkeleton className="h-6 w-20" />
            <LoadingSkeleton className="h-4 w-16" />
          </div>
          <div className="flex space-x-1">
            <LoadingSkeleton className="h-6 w-12" />
            <LoadingSkeleton className="h-6 w-12" />
            <LoadingSkeleton className="h-6 w-12" />
          </div>
          <LoadingSkeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
} 