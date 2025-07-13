import { getEventServices, getEventServiceCategories } from '@/lib/event-services'
import { EventServiceCard } from '@/components/event-services/event-service-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, Star, Calendar, Users, Award } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function EventServicesPage() {
  const [eventServices, categories] = await Promise.all([
    getEventServices(),
    getEventServiceCategories()
  ])

  const featuredServices = eventServices.filter(service => service.isFeatured)
  const regularServices = eventServices.filter(service => !service.isFeatured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Event Services
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Discover our comprehensive range of professional event services designed to make your special occasions unforgettable. 
            From weddings to corporate events, we have everything you need.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{eventServices.length}</div>
              <p className="text-slate-600">Available Services</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{categories.length}</div>
              <p className="text-slate-600">Service Categories</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{featuredServices.length}</div>
              <p className="text-slate-600">Featured Services</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-sm px-4 py-2">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Featured Services Section */}
        {featuredServices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-slate-900">Featured Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <EventServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* All Services Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {featuredServices.length > 0 ? 'All Services' : 'Our Services'}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredServices.length > 0 ? regularServices : eventServices).map((service) => (
              <EventServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {eventServices.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Event Services Available</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              We&apos;re currently updating our event services. Please check back soon for our exciting offerings!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Need a Custom Event Service?
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? We specialize in creating custom event solutions 
                tailored to your specific needs and vision.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Contact Us for Custom Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 