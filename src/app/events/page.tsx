import { Suspense } from 'react'
import { EventsClient } from '@/components/events/events-client'
import { getEvents } from '@/lib/events'
import { EventFilters } from '@/types/event'
import { Loader2 } from 'lucide-react'

// Force dynamic rendering - this prevents caching and ensures fresh data
export const dynamic = 'force-dynamic'

interface EventsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  )
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  // Await searchParams before using its properties
  const params = await searchParams
  
  // Convert search params to filters
  const filters: EventFilters = {
    city: typeof params.city === 'string' ? params.city : undefined,
    province: typeof params.province === 'string' ? params.province : undefined,
    minPrice: typeof params.minPrice === 'string' ? Number(params.minPrice) : undefined,
    maxPrice: typeof params.maxPrice === 'string' ? Number(params.maxPrice) : undefined,
    search: typeof params.search === 'string' ? params.search : undefined,
    tags: typeof params.tags === 'string' ? params.tags.split(',') : undefined,
    startDate: typeof params.startDate === 'string' ? new Date(params.startDate) : undefined,
    endDate: typeof params.endDate === 'string' ? new Date(params.endDate) : undefined,
    featured: typeof params.featured === 'string' ? params.featured === 'true' : undefined,
    sortBy: typeof params.sortBy === 'string' ? params.sortBy as 'price' | 'title' | 'startDate' | 'createdAt' : 'startDate',
    sortOrder: typeof params.sortOrder === 'string' ? params.sortOrder as 'asc' | 'desc' : 'asc'
  }

  // Fetch data from database
  const events = await getEvents(filters)

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EventsClient 
        initialEvents={events} 
        initialFilters={filters}
      />
    </Suspense>
  )
} 