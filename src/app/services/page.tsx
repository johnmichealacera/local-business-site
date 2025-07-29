import { Suspense } from 'react'
import { getServices } from '@/lib/services'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, Filter } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering for fresh data
export const dynamic = 'force-dynamic'

async function ServicesList() {
  const services = await getServices()
  
  if (services.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
          No Services Available
        </h2>
        <p style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
          Check back soon for our latest services.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              {service.iconUrl && (
                <div className="w-12 h-12 mb-4">
                  <img src={service.iconUrl} alt={service.title} className="w-full h-full object-contain" />
                </div>
              )}
              <CardTitle className="text-xl" style={{ color: 'var(--color-secondary)' }}>
                {service.title}
              </CardTitle>
              {service.category && (
                <div className="text-sm opacity-70" style={{ color: 'var(--color-secondary)' }}>
                  {service.category}
                </div>
              )}
            </CardHeader>
            <CardDescription className="px-6 pb-6" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
              {service.description}
            </CardDescription>
          </Card>
        </div>
      ))}
    </div>
  )
}

function ServicesListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Our Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Professional services tailored to meet your needs and exceed your expectations.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Services Grid */}
        <Suspense fallback={<ServicesListSkeleton />}>
          <ServicesList />
        </Suspense>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Ready to Get Started?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Contact us to learn more about our services and how we can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="btn-primary group">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="btn-secondary">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 