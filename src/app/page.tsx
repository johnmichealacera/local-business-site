import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Shield, Leaf, Heart, TrendingUp, Calendar, ShoppingBag, Grid3X3, CalendarDays, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/products'
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card'
import { getFeaturedEvents } from '@/lib/events'
import { EventCard } from '@/components/events/event-card'
import { getFeaturedEventServices } from '@/lib/event-services'
import { EventServiceCard } from '@/components/event-services/event-service-card'
import { getSiteInfo } from '@/lib/site'
import { Suspense } from 'react'
import { parseColorPalette, generateDynamicGradientStyle } from '@/lib/colors'
import { SiteFeature } from '@/types/site'

// Force dynamic rendering for fresh product data on homepage
export const dynamic = 'force-dynamic'

// Individual feature section components
async function FeaturedProducts() {
  const products = await getProducts({ sortBy: 'createdAt', sortOrder: 'desc' })
  
  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'var(--color-tertiary)',
        backgroundImage: `linear-gradient(135deg, var(--color-primary)05, var(--color-tertiary))`
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 mr-3" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Featured Products
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Hand-picked items from our latest collection. These pieces won&apos;t last long!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} priority={index < 4} />
            </div>
          ))}
        </div>

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
  )
}

function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

async function CategoriesShowcase() {
  const categories = await getCategories()
  
  if (categories.length === 0) return null
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Grid3X3 className="h-8 w-8 mr-3" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Shop by Category
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Explore our curated collection organized by category. Find exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category, index) => (
            <Card key={category.id} className="hover:shadow-lg transition-all duration-300 animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center mb-2">
                  <span className="mr-2">{category.name}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--color-primary)' }} />
                </CardTitle>
                {category.description && (
                  <CardDescription className="mb-4">
                    {category.description}
                  </CardDescription>
                )}
                <Link href={`/products?category=${category.id}`}>
                  <Button variant="outline" className="btn-secondary group">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link href="/categories">
            <Button size="lg" variant="outline" className="btn-secondary group">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

async function FeaturedEvents() {
  const events = await getFeaturedEvents()
  
  if (events.length === 0) return null
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <CalendarDays className="h-8 w-8 mr-3" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Upcoming Events
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Join us for exciting events, workshops, and community gatherings. Don&apos;t miss out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 6).map((event, index) => (
            <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <EventCard event={event} priority={index < 3} />
            </div>
          ))}
        </div>

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
  )
}

function FeaturedEventsSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

async function FeaturedEventServices() {
  const eventServices = await getFeaturedEventServices()
  
  if (eventServices.length === 0) return null
  
  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'var(--color-tertiary)',
        backgroundImage: `linear-gradient(135deg, var(--color-primary)05, var(--color-tertiary))`
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 mr-3" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Featured Event Services
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Professional event services to make your special occasions unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventServices.slice(0, 6).map((service, index) => (
            <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <EventServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link href="/events-services">
            <Button size="lg" variant="outline" className="btn-secondary group">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedEventServicesSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const siteInfo = await getSiteInfo()
  const siteName = siteInfo?.name
  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF'])
  const features = siteInfo?.features || []
  const featuresOrder = siteInfo?.featuresOrder || []
  
  // Filter features that should appear on homepage
  const homepageFeatures = featuresOrder.filter(feature => 
    features.includes(feature) && 
    feature !== SiteFeature.DASHBOARD && 
    feature !== SiteFeature.ABOUT && 
    feature !== SiteFeature.CONTACT
  )

  // Render feature sections based on featuresOrder
  const renderFeatureSection = (feature: SiteFeature) => {
    switch (feature) {
      case SiteFeature.PRODUCTS:
        return (
          <Suspense key="products" fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        )
      case SiteFeature.CATEGORIES:
        return <CategoriesShowcase key="categories" />
      case SiteFeature.EVENTS:
        return (
          <Suspense key="events" fallback={<FeaturedEventsSkeleton />}>
            <FeaturedEvents />
          </Suspense>
        )
      case SiteFeature.EVENT_SERVICES:
        return (
          <Suspense key="event-services" fallback={<FeaturedEventServicesSkeleton />}>
            <FeaturedEventServices />
          </Suspense>
        )
      default:
        return null
    }
  }
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30 animate-float"
            style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'light')}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-30 animate-float"
            style={{ 
              animationDelay: '1s',
              ...generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'light')
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <div className="mb-4 animate-bounce-in">
                <div 
                  className="inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  New Arrivals Weekly
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ color: colorPalette.secondary }}>
                Discover Your Next
                <span className="text-gradient block mt-2">
                  Fashion Treasure
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s', color: colorPalette.secondary, opacity: 0.8 }}>
                Curated pre-owned clothing and accessories that tell a story. 
                Sustainable fashion that doesn&apos;t compromise on style or quality. 
                {homepageFeatures.includes(SiteFeature.EVENTS) && ' Plus, discover exciting events and workshops in your community.'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {homepageFeatures.includes(SiteFeature.PRODUCTS) && (
                  <Link href="/products">
                    <Button size="lg" className="btn-primary group">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colorPalette.secondary }}>
              Why Choose {siteName}?
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              We&apos;re committed to sustainable fashion that makes a difference for you and the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover variant="elevated" className="text-center animate-slide-in-left">
              <CardHeader>
                <div 
                  className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Leaf className="h-6 w-6" />
                </div>
                <CardTitle>Sustainable Fashion</CardTitle>
                <CardDescription>
                  Every purchase extends the lifecycle of clothing and reduces environmental impact.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover variant="elevated" className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div 
                  className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Quality Guaranteed</CardTitle>
                <CardDescription>
                  Each item is carefully inspected and authenticated by our fashion experts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover variant="elevated" className="text-center animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div 
                  className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Heart className="h-6 w-6" />
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

      {/* Dynamic Feature Sections */}
      {homepageFeatures.map((feature) => renderFeatureSection(feature))}

      {/* Stats Section */}
      <section 
        className="py-16 px-4 sm:px-6 lg:px-8 text-white"
        style={{
          backgroundColor: colorPalette.secondary,
          backgroundImage: `linear-gradient(135deg, ${colorPalette.secondary}, ${colorPalette.primary}20)`
        }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div style={{ color: colorPalette.tertiary, opacity: 0.8 }}>Items Rescued</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">5,000+</div>
              <div style={{ color: colorPalette.tertiary, opacity: 0.8 }}>Happy Customers</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
              <div style={{ color: colorPalette.tertiary, opacity: 0.8 }}>Years in Business</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div style={{ color: colorPalette.tertiary, opacity: 0.8 }}>Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-white" style={{ 
        background: `linear-gradient(to right, var(--color-secondary), var(--color-primary))` 
      }}>
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Sustainable Fashion Journey?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of fashion-conscious customers who&apos;ve made the switch to sustainable style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {homepageFeatures.includes(SiteFeature.PRODUCTS) && (
                <Link href="/products">
                  <Button size="lg" variant="outline" className="bg-[var(--color-tertiary)] text-[var(--color-secondary)] hover:bg-[var(--color-tertiary-light)] group border-[var(--color-tertiary)]">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[var(--color-tertiary)] text-[var(--color-secondary)] hover:bg-[var(--color-tertiary)] hover:text-[var(--color-secondary-light)]">
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
