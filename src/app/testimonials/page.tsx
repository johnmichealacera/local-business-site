import { Suspense } from 'react'
import { getTestimonials } from '@/lib/testimonials'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Search, Filter } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering for fresh data
export const dynamic = 'force-dynamic'

async function TestimonialsList() {
  const testimonials = await getTestimonials()
  
  if (testimonials.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
          No Testimonials Available
        </h2>
        <p style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
          Check back soon for client reviews and testimonials.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center mb-4">
                {testimonial.avatarUrl && (
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.clientName}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <CardTitle className="text-lg" style={{ color: 'var(--color-secondary)' }}>
                    {testimonial.clientName}
                  </CardTitle>
                  {testimonial.clientTitle && (
                    <div className="text-sm opacity-70" style={{ color: 'var(--color-secondary)' }}>
                      {testimonial.clientTitle}
                    </div>
                  )}
                </div>
              </div>
              {testimonial.rating && (
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonial.rating}/5
                  </span>
                </div>
              )}
            </CardHeader>
            <CardDescription className="px-6 pb-6 italic" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
              &quot;{testimonial.content}&quot;
            </CardDescription>
            {testimonial.projectId && (
              <div className="px-6 pb-4">
                <div className="text-xs text-gray-500">
                  Project: {testimonial.projectId}
                </div>
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  )
}

function TestimonialsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Client Testimonials
          </h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search testimonials..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter by Rating
          </Button>
        </div>

        {/* Testimonials Grid */}
        <Suspense fallback={<TestimonialsListSkeleton />}>
          <TestimonialsList />
        </Suspense>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Ready to Join Our Happy Clients?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Start your journey with us and become part of our success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="btn-primary group">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="btn-secondary">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 