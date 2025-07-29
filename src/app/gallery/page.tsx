import { Suspense } from 'react'
import { getGalleryItems } from '@/lib/gallery'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, Filter, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Force dynamic rendering for fresh data
export const dynamic = 'force-dynamic'

async function GalleryGrid() {
  const galleryItems = await getGalleryItems()
  
  if (galleryItems && galleryItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
          No Gallery Items Available
        </h2>
        <p style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
          Check back soon for our latest work and projects.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {galleryItems && galleryItems.map((item, index) => (
        <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-square relative">
              <Image 
                src={item.imageUrl} 
                alt={item.title || 'Gallery item'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              {(item.title || item.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {item.title && (
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  )}
                  {item.description && (
                    <p className="text-sm text-white opacity-90">{item.description}</p>
                  )}
                  {item.projectDate && (
                    <div className="flex items-center text-xs text-white opacity-75 mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.projectDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>
            {item.tags && item.tags.length > 0 && (
              <div className="p-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  )
}

function GalleryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  )
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Our Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Take a look at our latest work and projects that showcase our expertise and creativity.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search gallery..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Gallery Grid */}
        <Suspense fallback={<GalleryGridSkeleton />}>
          <GalleryGrid />
        </Suspense>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
            Interested in Our Work?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
            Let&apos;s discuss how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="btn-primary group">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="btn-secondary">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 