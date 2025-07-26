'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Package, Star, CheckCircle } from 'lucide-react'
import { EventService } from '@/types/event-service'

interface ServicePackageSelectorProps {
  colorPalette: {
    primary: string
    secondary: string
    tertiary: string
  }
  onSelectionChange: (serviceId: string, serviceName: string, packageId: string, packageName: string) => void
  initialServiceId?: string
  initialPackageId?: string
}

export default function ServicePackageSelector({ 
  colorPalette, 
  onSelectionChange, 
  initialServiceId, 
  initialPackageId 
}: ServicePackageSelectorProps) {
  const [services, setServices] = useState<EventService[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || '')
  const [selectedPackageId, setSelectedPackageId] = useState<string>(initialPackageId || '')
  const [isLoading, setIsLoading] = useState(true)

  // Get selected service and package objects
  const selectedService = services.find(s => s.id === selectedServiceId)
  const selectedPackage = selectedService?.servicePackages.find(p => p.id === selectedPackageId)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/event-services')
        if (response.ok) {
          const data = await response.json()
          setServices(data.eventServices || [])
        }
      } catch (error) {
        console.error('Error fetching event services:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId)
    setSelectedPackageId('') // Reset package selection when service changes
    onSelectionChange(serviceId, '', '', '')
  }

  const handlePackageChange = (packageId: string) => {
    setSelectedPackageId(packageId)
    const service = services.find(s => s.id === selectedServiceId)
    const package_ = service?.servicePackages.find(p => p.id === packageId)
    
    if (service && package_) {
      onSelectionChange(selectedServiceId, service.name, packageId, package_.name)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-2 shadow-lg">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className="border-2 shadow-lg relative overflow-hidden"
      style={{
        ...generateDynamicGradientStyle('to-br', colorPalette, 0.05, 'light'),
        borderColor: colorPalette.primary + '30'
      }}
    >
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 transform translate-x-12 -translate-y-12"
        style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'normal')}
      ></div>
      
      <CardHeader className="relative z-10">
        <CardTitle 
          className="text-xl font-bold bg-clip-text text-transparent flex items-center"
          style={generateBrightTextGradientStyle(colorPalette)}
        >
          <Crown className="h-5 w-5 mr-2" style={{ color: colorPalette.primary }} />
          Event Service & Package Selection
        </CardTitle>
        <p className="text-sm" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
          Choose a service and package for your event (optional)
        </p>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6">
        {/* Show current selection if any */}
        {(selectedService || selectedPackage) && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              Selected Service & Package
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedService && (
                <div className="space-y-2">
                  <label className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                    Event Service
                  </label>
                  <div className="px-3 py-2 border-2 rounded-md bg-green-50 border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-800">{selectedService.name}</span>
                      {selectedService.isFeatured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    {selectedService.description && (
                      <p className="text-sm text-green-700 mt-1">{selectedService.description}</p>
                    )}
                  </div>
                </div>
              )}
              
              {selectedPackage && (
                <div className="space-y-2">
                  <label className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                    Selected Package
                  </label>
                  <div className="px-3 py-2 border-2 rounded-md bg-blue-50 border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-800">{selectedPackage.name}</span>
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    {selectedPackage.price && selectedPackage.price > 0 && (
                      <p className="text-sm text-blue-700 mt-1">${selectedPackage.price}</p>
                    )}
                    {selectedPackage.description && (
                      <p className="text-sm text-blue-700 mt-1">{selectedPackage.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedServiceId('')
                setSelectedPackageId('')
                onSelectionChange('', '', '', '')
              }}
              className="text-sm"
            >
              Change Selection
            </Button>
          </div>
        )}

                 {/* Service and Package Selectors */}
         {(!selectedService || !selectedPackage) && (
           <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                 Select Event Service
               </label>
               <select
                 value={selectedServiceId}
                 onChange={(e) => handleServiceChange(e.target.value)}
                 className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                 style={{
                   borderColor: colorPalette.primary + '30',
                   backgroundColor: 'rgba(255, 255, 255, 0.9)',
                   backdropFilter: 'blur(10px)'
                 }}
               >
                 <option value="">Choose an event service...</option>
                 {services.map((service) => (
                   <option key={service.id} value={service.id}>
                     {service.name} {service.isFeatured ? '⭐' : ''}
                   </option>
                 ))}
               </select>
             </div>

             {selectedService && (
               <div className="space-y-2">
                 <label className="text-sm font-medium block" style={{ color: colorPalette.secondary }}>
                   Select Package
                 </label>
                 <select
                   value={selectedPackageId}
                   onChange={(e) => handlePackageChange(e.target.value)}
                   className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-opacity-100 transition-all duration-300"
                   style={{
                     borderColor: colorPalette.primary + '30',
                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
                     backdropFilter: 'blur(10px)'
                   }}
                 >
                   <option value="">Choose a package...</option>
                   {selectedService.servicePackages
                     .filter(pkg => pkg.isActive)
                     .sort((a, b) => a.sortOrder - b.sortOrder)
                     .map((package_) => (
                       <option key={package_.id} value={package_.id}>
                         {package_.name} {package_.price && package_.price > 0 ? `($${package_.price})` : ''}
                       </option>
                     ))}
                 </select>
               </div>
             )}
           </div>
         )}

        {/* Package details if selected */}
        {selectedPackage && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center" style={{ color: colorPalette.secondary }}>
              <Package className="h-4 w-4 mr-2" style={{ color: colorPalette.primary }} />
              Package Details
            </h4>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {selectedPackage.inclusions && selectedPackage.inclusions.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm mb-2" style={{ color: colorPalette.secondary }}>
                    Inclusions:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.inclusions.map((inclusion, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {inclusion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedPackage.freebies && selectedPackage.freebies.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm mb-2" style={{ color: colorPalette.secondary }}>
                    Freebies:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.freebies.map((freebie, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {freebie}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function for gradient styles (import from colors lib)
function generateDynamicGradientStyle(
  direction: string,
  colorPalette: { primary: string; secondary: string; tertiary: string },
  opacity: number,
  type: 'light' | 'normal'
) {
  const colors = [colorPalette.primary, colorPalette.secondary, colorPalette.tertiary]
  const alpha = type === 'light' ? opacity * 0.1 : opacity
  
  return {
    background: `linear-gradient(${direction}, ${colors.map((color, index) => 
      `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')} ${index * 50}%`
    ).join(', ')})`
  }
}

function generateBrightTextGradientStyle(colorPalette: { primary: string; secondary: string; tertiary: string }) {
  return {
    background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary}, ${colorPalette.tertiary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }
} 