import { prisma } from './prisma'
import { Event, EventFilters } from '@/types/event'

export async function getEvents(filters: EventFilters = {}): Promise<Event[]> {
  console.log('🔄 Fetching events from database...', new Date().toISOString(), { filters })
  
  const {
    city,
    province,
    minPrice,
    maxPrice,
    search,
    tags,
    startDate,
    endDate,
    featured,
    sortBy = 'startDate',
    sortOrder = 'asc'
  } = filters

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    isActive: true,
    isConfirmed: true,
  }

  if (city) {
    where.city = { contains: city, mode: 'insensitive' }
  }

  if (province) {
    where.province = { contains: province, mode: 'insensitive' }
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {}
    if (minPrice !== undefined) {
      where.price.gte = minPrice
    }
    if (maxPrice !== undefined) {
      where.price.lte = maxPrice
    }
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } }
    ]
  }

  if (tags && tags.length > 0) {
    where.tags = {
      hasSome: tags
    }
  }

  if (startDate || endDate) {
    where.startDate = {}
    if (startDate) {
      where.startDate.gte = startDate
    }
    if (endDate) {
      where.startDate.lte = endDate
    }
  }

  if (featured !== undefined) {
    where.isFeatured = featured
  }

  where.siteId = process.env.SITE_ID

  // Build orderBy clause
  const orderBy: Record<string, 'asc' | 'desc'> = {}
  orderBy[sortBy] = sortOrder

  try {
    const events = await prisma.event.findMany({
      where,
      orderBy
    })

    console.log(`✅ Fetched ${events.length} events from database`)
    return events as Event[]
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  console.log('🔄 Fetching event by ID from database...', id, new Date().toISOString())
  
  try {
    const event = await prisma.event.findUnique({
      where: { id, siteId: process.env.SITE_ID }
    })

    console.log('✅ Fetched event:', event ? event.title : 'Not found')
    return event as Event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  console.log('🔄 Fetching featured events from database...', new Date().toISOString())
  
  try {
    const events = await prisma.event.findMany({
      where: {
        isActive: true,
        isFeatured: true,
        isConfirmed: true,
        siteId: process.env.SITE_ID
      },
      orderBy: {
        startDate: 'asc'
      }
    })

    console.log(`✅ Fetched ${events.length} featured events from database`)
    return events as Event[]
  } catch (error) {
    console.error('Error fetching featured events:', error)
    return []
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  console.log('🔄 Fetching upcoming events from database...', new Date().toISOString())
  
  try {
    const events = await prisma.event.findMany({
      where: {
        isActive: true,
        startDate: {
          gte: new Date()
        },
        siteId: process.env.SITE_ID
      },
      orderBy: {
        startDate: 'asc'
      }
    })

    console.log(`✅ Fetched ${events.length} upcoming events from database`)
    return events as Event[]
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
} 