import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Calendar, ShoppingBag, Grid3X3, CalendarDays, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/products'
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card'
import { getFeaturedEvents } from '@/lib/events'
import { EventCard } from '@/components/events/event-card'
import { getFeaturedEventServices } from '@/lib/event-services'
import { EventServiceCard } from '@/components/event-services/event-service-card'
import { getSiteInfo } from '@/lib/site'
import { Suspense } from 'react'
import { SiteFeature } from '@/types/site'
import { Hero } from '@/components/hero/hero'

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

function CategoriesShowcaseSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 rounded animate-pulse"></div>
          ))}
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
            Featured Bookings
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Book your next event with us.
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
          <Link href="/bookings">
            <Button size="lg" variant="outline" className="btn-secondary group">
              <Calendar className="mr-2 h-4 w-4" />
              View All Bookings
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
  const features = siteInfo?.features || []
  const featuresOrder = siteInfo?.featuresOrder || []
  
  // Filter features that should appear on homepage based on featuresOrder and enabled features
  const homepageFeatures = featuresOrder.filter(feature => 
    features.some(f => f.name === feature) && 
    [SiteFeature.PRODUCTS, SiteFeature.CATEGORIES, SiteFeature.EVENTS, SiteFeature.EVENT_SERVICES].includes(feature)
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
        return (
          <Suspense key="categories" fallback={<CategoriesShowcaseSkeleton />}>
            <CategoriesShowcase />
          </Suspense>
        )
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

  // Generate primary CTA based on first available feature
  const getPrimaryCTA = () => {
    const firstFeature = homepageFeatures[0]
    switch (firstFeature) {
      case SiteFeature.PRODUCTS:
        return { text: "Shop Now", href: "/products" }
      case SiteFeature.EVENTS:
        return { text: "View Bookings", href: "/bookings" }
      case SiteFeature.EVENT_SERVICES:
        return { text: "Our Services", href: "/events-services" }
      case SiteFeature.CATEGORIES:
        return { text: "Browse Categories", href: "/categories" }
      default:
        return { text: "Get Started", href: "/about" }
    }
  }

  const primaryCTA = getPrimaryCTA()
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero 
        siteInfo={siteInfo} 
        defaultCTA={primaryCTA}
        showBookingButton={siteInfo?.name?.includes('MD Events') || siteInfo?.name?.includes('Events')}
        zcalUrl="/book"
      />

{/* Removed the about section in homepage */}
      {/* Features Section */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colorPalette.secondary }}>
              Why Choose {siteName}?
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              We&apos;re committed to quality experiences that make a difference for you and the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Leaf className="w-8 h-8" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  {aboutInfo?.mission}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Globe className="w-8 h-8" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {aboutInfo?.vision}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Heart className="w-8 h-8" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Community First</CardTitle>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-base">
                  {Array.isArray(aboutInfo?.values) ? aboutInfo?.values.join(', ') : aboutInfo?.values}. We believe 
                  in building lasting relationships with our customers and 
                  supporting ethical practices.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Dynamic Feature Sections - Rendered in featuresOrder */}
      {homepageFeatures.map((feature) => renderFeatureSection(feature))}

      {/* Not sure if we need this section */}
      {/* Stats Section */}
      {/* <section 
        className="py-16 px-4 sm:px-6 lg:px-8 text-white"
        style={{
          backgroundColor: colorPalette.secondary,
          backgroundImage: `linear-gradient(135deg, ${colorPalette.secondary}, ${colorPalette.primary}20)`
        }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {homepageFeatures.includes(SiteFeature.PRODUCTS) ? '10,000+' : '1,000+'}
              </div>
              <div style={{ color: colorPalette.tertiary, opacity: 0.8 }}>
                {homepageFeatures.includes(SiteFeature.PRODUCTS) ? 'Items Rescued' : 'Happy Customers'}
              </div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {homepageFeatures.includes(SiteFeature.EVENTS) ? '500+' : '5,000+'}
              </div>
              <div style={{ color: colorPalette.tertiary, opacity: 0.8 }}>
                {homepageFeatures.includes(SiteFeature.EVENTS) ? 'Events Hosted' : 'Happy Customers'}
              </div>
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
      </section> */}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-white" style={{ 
        background: `linear-gradient(to right, var(--color-secondary), var(--color-primary))` 
      }}>
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            {/* <p className="mb-8 text-lg opacity-90">
              {homepageFeatures.includes(SiteFeature.PRODUCTS) 
                ? "Join thousands of fashion-conscious customers who've made the switch to sustainable style."
                : "Join our community and discover what makes us special."
              }
            </p> */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href={primaryCTA.href}>
                <Button size="lg" variant="outline" className="bg-[var(--color-tertiary)] text-[var(--color-secondary)] hover:bg-[var(--color-tertiary-light)] group border-[var(--color-tertiary)]">
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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
