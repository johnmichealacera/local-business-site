'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Crown, Heart, CheckCircle, Send } from 'lucide-react'
import { generateDynamicGradientStyle, generateBrightTextGradientStyle } from '@/lib/colors'
import ServicePackageSelector from './service-package-selector'

interface LockEventFormProps {
  colorPalette: {
    primary: string
    secondary: string
    tertiary: string
  }
  siteName: string
  prefillData?: {
    serviceId: string | null
    serviceName: string | null
    packageId: string | null
    packageName: string | null
  }
}

export default function LockEventForm({ colorPalette, siteName, prefillData }: LockEventFormProps) {
  const [formData, setFormData] = useState({
    bookingTitle: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venueName: '',
    address: '',
    city: '',
    province: '',
    country: '',
    zipCode: '',
    maxAttendees: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    selectedServiceId: prefillData?.serviceId || '',
    selectedServiceName: prefillData?.serviceName || '',
    selectedPackageId: prefillData?.packageId || '',
    selectedPackageName: prefillData?.packageName || ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServicePackageSelection = (serviceId: string, serviceName: string, packageId: string, packageName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServiceId: serviceId,
      selectedServiceName: serviceName,
      selectedPackageId: packageId,
      selectedPackageName: packageName
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      console.log('Form data:', formData)

      const eventData = {
        bookingTitle: formData.bookingTitle,
        description: formData.description,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        venueName: formData.venueName,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        country: formData.country,
        zipCode: formData.zipCode,
        maxAttendees: parseInt(formData.maxAttendees),
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        selectedServiceId: formData.selectedServiceId,
        selectedServiceName: formData.selectedServiceName,
        selectedPackageId: formData.selectedPackageId,
        selectedPackageName: formData.selectedPackageName,
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      console.log('Event data:', eventData)

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit event')
      }

      const result = await response.json()
      console.log('Event submitted successfully:', result)
      
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting event:', error)
      setIsSubmitting(false)
      // You could add error state handling here
      alert('Failed to submit event. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <Card 
        className="border-2 shadow-2xl relative overflow-hidden"
        style={{
          ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
          borderColor: colorPalette.primary + '30'
        }}
      >
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 transform translate-x-16 -translate-y-16"
          style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
        ></div>
        
        <CardContent className="py-16 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 
            className="text-3xl font-bold bg-clip-text text-transparent mb-4"
            style={generateBrightTextGradientStyle(colorPalette)}
          >
            Event Details Locked! 🎉
          </h2>
          
          <p className="text-lg mb-6" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            Your event has been successfully secured. We&apos;ll be in touch within 24 hours to discuss the next steps.
          </p>
          
          <div className="flex items-center justify-center">
            <Heart className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
            <span className="font-medium" style={{ color: colorPalette.secondary }}>
              Thank you for choosing {siteName}
            </span>
            <Heart className="h-5 w-5 ml-2" style={{ color: colorPalette.primary }} />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className="border-2 shadow-2xl relative overflow-hidden"
      style={{
        ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
        borderColor: colorPalette.primary + '30'
      }}
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 transform translate-x-16 -translate-y-16"
        style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
      ></div>
      
      <CardHeader className="text-center relative z-10">
        {/* <div className="flex items-center justify-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={generateDynamicGradientStyle('to-br', colorPalette, 1, 'normal')}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div> */}
        <CardTitle 
          className="text-2xl font-bold bg-clip-text text-transparent"
          style={generateBrightTextGradientStyle(colorPalette)}
        >
          Event Details
        </CardTitle>
        <p className="mt-2" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
          Tell us about your perfect event
        </p>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm" style={{ color: colorPalette.secondary }}>
            💡 <strong>Quick & Easy:</strong> Only event title, description, and contact info are required. 
            Other details can be discussed later for a smoother booking experience!
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service & Package Selection */}
          <ServicePackageSelector
            colorPalette={colorPalette}
            onSelectionChange={handleServicePackageSelection}
            initialServiceId={prefillData?.serviceId || undefined}
            initialPackageId={prefillData?.packageId || undefined}
          />

          {/* Selected Service & Package Information */}
          {(formData.selectedServiceName || formData.selectedPackageName) && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
                <Crown className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
                Selected Service & Package
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.selectedServiceName && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                      Event Service
                    </label>
                    <div className="px-3 py-2 border-2 rounded-md bg-green-50 border-green-200">
                      <span className="font-medium text-green-800">{formData.selectedServiceName}</span>
                    </div>
                  </div>
                )}
                
                {formData.selectedPackageName && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                      Selected Package
                    </label>
                    <div className="px-3 py-2 border-2 rounded-md bg-blue-50 border-blue-200">
                      <span className="font-medium text-blue-800">{formData.selectedPackageName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Event Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
              <Crown className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
              Event Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="bookingTitle" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Event Title *
                </label>
                <input
                  id="bookingTitle"
                  name="bookingTitle"
                  type="text"
                  placeholder="e.g., Sarah & Michael's Wedding"
                  value={formData.bookingTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="maxAttendees" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Maximum Attendees
                  <span className="text-xs ml-1" style={{ color: colorPalette.secondary, opacity: 0.7 }}>
                    (Optional - helps us plan better)
                  </span>
                </label>
                <input
                  id="maxAttendees"
                  name="maxAttendees"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                Event Description *
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell us about your event vision, theme, and any special requirements..."
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300 resize-none"
                style={{
                  borderColor: colorPalette.primary + '30',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
              <Calendar className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
              Date & Time
              <span className="text-sm ml-2 font-normal" style={{ color: colorPalette.secondary, opacity: 0.7 }}>
                (Optional - we can discuss timing later)
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Start Time
                </label>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  End Time
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
              <MapPin className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
              Venue Information
              <span className="text-sm ml-2 font-normal" style={{ color: colorPalette.secondary, opacity: 0.7 }}>
                (Optional - helps us prepare better)
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="venueName" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Venue Name
                </label>
                <input
                  id="venueName"
                  name="venueName"
                  type="text"
                  placeholder="e.g., Grand Plaza Hotel"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g., 123 Main Street"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g., Manila"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="province" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Province/State
                </label>
                <input
                  id="province"
                  name="province"
                  type="text"
                  placeholder="e.g., Metro Manila"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="e.g., Philippines"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="zipCode" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  ZIP/Postal Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="e.g., 1000"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
              <Heart className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="contactName" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Contact Name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  placeholder="e.g., John Smith"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Email Address
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="e.g., john@example.com"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contactPhone" className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                  Phone Number *
                </label>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  placeholder="e.g., +63 917 123 4567"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  style={{
                    borderColor: colorPalette.primary + '30',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold relative overflow-hidden group"
              style={{
                backgroundColor: colorPalette.primary,
                color: 'white',
                border: `2px solid ${colorPalette.primary}`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colorPalette.secondary;
                e.currentTarget.style.borderColor = colorPalette.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorPalette.primary;
                e.currentTarget.style.borderColor = colorPalette.primary;
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Locking Your Event...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Lock My Event Details
                </>
              )}
            </Button>
            
            <p className="text-sm mt-4" style={{ color: colorPalette.secondary, opacity: 0.7 }}>
              By submitting this form, you agree to secure your event date with {siteName}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 