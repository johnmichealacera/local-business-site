'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Event } from '@/types/event'
import { 
  Calendar, 
  MapPin, 
  Clock,
  Users,
  Share2, 
  Heart,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface EventDetailClientProps {
  event: Event
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const isUpcoming = new Date(event.startDate) > new Date()
  const images = event.imageUrls.length > 0 ? event.imageUrls : ['/placeholder-event.jpg']
  const eventDate = new Date(event.startDate)
  const eventEndDate = event.endDate ? new Date(event.endDate) : null

  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-slate-600">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/events" className="hover:text-slate-900">Events</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium">{event.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Event Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src={images[selectedImageIndex]}
              alt={event.title}
              fill
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-slate-900' : 'border-slate-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${event.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {event.isFeatured && (
                  <Badge variant="default">Featured</Badge>
                )}
                {!isUpcoming && (
                  <Badge variant="outline">Past Event</Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {event.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-3 h-3 rounded-full ${isUpcoming ? 'bg-green-500' : 'bg-slate-400'}`} />
              <span className={`text-sm font-medium ${isUpcoming ? 'text-green-600' : 'text-slate-600'}`}>
                {isUpcoming ? 'Upcoming' : 'Past Event'}
              </span>
            </div>
          </div>

          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium">Date:</span>
                    <span className="text-sm">{formatEventDate(eventDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium">Time:</span>
                    <span className="text-sm">{formatEventTime(eventDate)}</span>
                  </div>
                  {eventEndDate && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">Ends:</span>
                      <span className="text-sm">{formatEventDate(eventEndDate)} • {formatEventTime(eventEndDate)}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {event.location && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium">Location:</span>
                        <p className="text-sm">{event.location}</p>
                        {event.address && (
                          <p className="text-sm text-slate-600">
                            {event.address}
                            {event.city && `, ${event.city}`}
                            {event.province && `, ${event.province}`}
                            {event.zipCode && ` ${event.zipCode}`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {event.maxAttendees && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">Max Attendees:</span>
                      <span className="text-sm">{event.maxAttendees}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration */}
          {isUpcoming && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Ready to join us?</p>
                    <p className="text-sm text-slate-600 mb-4">
                      Secure your spot at this event
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          {(event.contactEmail || event.contactPhone || event.websiteUrl) && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {event.contactEmail && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <a href={`mailto:${event.contactEmail}`} className="text-sm hover:text-slate-900">
                      {event.contactEmail}
                    </a>
                  </div>
                )}
                {event.contactPhone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <a href={`tel:${event.contactPhone}`} className="text-sm hover:text-slate-900">
                      {event.contactPhone}
                    </a>
                  </div>
                )}
                {event.websiteUrl && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <a 
                      href={event.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm hover:text-slate-900"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Event Description */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 