import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Shield, Leaf, Heart, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card'
import { getFeaturedEvents } from '@/lib/events'
import { EventCard, EventCardSkeleton } from '@/components/events/event-card'
import { getSiteInfo } from '@/lib/site'
import { Suspense } from 'react'

// Force dynamic rendering for fresh product data on homepage
export const dynamic = 'force-dynamic'

async function FeaturedProducts() {
  const products = await getProducts({ sortBy: 'createdAt', sortOrder: 'desc' })
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.slice(0, 8).map((product, index) => (
        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <ProductCard product={product} priority={index < 4} />
        </div>
      ))}
    </div>
  )
}

function FeaturedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

async function FeaturedEvents() {
  const events = await getFeaturedEvents()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.slice(0, 6).map((event, index) => (
        <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <EventCard event={event} priority={index < 3} />
        </div>
      ))}
    </div>
  )
}

function FeaturedEventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default async function HomePage() {
  const siteInfo = await getSiteInfo()
  const siteName = siteInfo?.name || 'Thrifted Treasures'
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full opacity-30 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <div className="mb-4 animate-bounce-in">
                <div className="inline-flex items-center rounded-full border-transparent bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-semibold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  New Arrivals Weekly
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-slide-up">
                Discover Your Next
                <span className="text-gradient block mt-2">
                  Fashion Treasure
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Curated pre-owned clothing and accessories that tell a story. 
                Sustainable fashion that doesn&apos;t compromise on style or quality. 
                Plus, discover exciting events and workshops in your community.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link href="/products">
                  <Button size="lg" className="btn-primary group">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="btn-secondary">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose {siteName}?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We&apos;re committed to sustainable fashion that makes a difference for you and the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover variant="elevated" className="text-center animate-slide-in-left">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Sustainable Fashion</CardTitle>
                <CardDescription>
                  Every purchase extends the lifecycle of clothing and reduces environmental impact.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover variant="elevated" className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Quality Guaranteed</CardTitle>
                <CardDescription>
                  Each item is carefully inspected and authenticated by our fashion experts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover variant="elevated" className="text-center animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Unique Finds</CardTitle>
                <CardDescription>
                  Discover one-of-a-kind pieces that express your individual style.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Hand-picked items from our latest collection. These pieces won&apos;t last long!
            </p>
          </div>

          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>

          <div className="text-center mt-12 animate-fade-in">
            <Link href="/products">
              <Button size="lg" variant="outline" className="btn-secondary group">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Join us for exciting events, workshops, and community gatherings. Don&apos;t miss out!
            </p>
          </div>

          <Suspense fallback={<FeaturedEventsSkeleton />}>
            <FeaturedEvents />
          </Suspense>

          <div className="text-center mt-12 animate-fade-in">
            <Link href="/events">
              <Button size="lg" variant="outline" className="btn-secondary group">
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-slate-300">Items Rescued</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">5,000+</div>
              <div className="text-slate-300">Happy Customers</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
              <div className="text-slate-300">Years in Business</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-slate-300">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Sustainable Fashion Journey?
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Join thousands of fashion-conscious customers who&apos;ve made the switch to sustainable style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products">
                <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 group border-white">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
