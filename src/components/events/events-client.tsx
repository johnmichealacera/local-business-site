'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { EventCard } from './event-card'
import { EventFiltersComponent } from './event-filters'
import { Button } from '@/components/ui/button'
import { Event, EventFilters } from '@/types/event'
import { Grid, List } from 'lucide-react'

interface EventsClientProps {
  initialEvents: Event[]
  initialFilters: EventFilters
}

export function EventsClient({ initialEvents, initialFilters }: EventsClientProps) {
  const [events] = useState<Event[]>(initialEvents)
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(initialEvents)
  const [filters, setFilters] = useState<EventFilters>(initialFilters)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Apply filters
  useEffect(() => {
    let filtered = [...events]

    // City filter
    if (filters.city) {
      filtered = filtered.filter(event => 
        event.city?.toLowerCase().includes(filters.city!.toLowerCase())
      )
    }

    // Province filter
    if (filters.province) {
      filtered = filtered.filter(event => 
        event.province?.toLowerCase().includes(filters.province!.toLowerCase())
      )
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(event => event.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(event => event.price <= filters.maxPrice!)
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm) ||
        event.location?.toLowerCase().includes(searchTerm)
      )
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(event => 
        filters.tags!.some(tag => event.tags.includes(tag))
      )
    }

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(event => 
        new Date(event.startDate) >= new Date(filters.startDate!)
      )
    }
    if (filters.endDate) {
      filtered = filtered.filter(event => 
        new Date(event.startDate) <= new Date(filters.endDate!)
      )
    }

    // Featured filter
    if (filters.featured !== undefined) {
      filtered = filtered.filter(event => event.isFeatured === filters.featured)
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue, bValue
        
        switch (filters.sortBy) {
          case 'price':
            aValue = a.price
            bValue = b.price
            break
          case 'title':
            aValue = a.title.toLowerCase()
            bValue = b.title.toLowerCase()
            break
          case 'startDate':
            aValue = new Date(a.startDate)
            bValue = new Date(b.startDate)
            break
          case 'createdAt':
            aValue = new Date(a.createdAt)
            bValue = new Date(b.createdAt)
            break
          default:
            return 0
        }

        if (filters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
      })
    }

    setFilteredEvents(filtered)
  }, [events, filters])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    
    // Update URL params based on filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(','))
          } else {
            params.delete(key)
          }
        } else if (value instanceof Date) {
          params.set(key, value.toISOString().split('T')[0])
        } else {
          params.set(key, value.toString())
        }
      } else {
        params.delete(key)
      }
    })

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [filters, router, searchParams])

  const handleFiltersChange = (newFilters: EventFilters) => {
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Upcoming Events
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Discover exciting events happening in your area. From workshops to markets, 
          find something that interests you and join the community.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <EventFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Events Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No events found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 