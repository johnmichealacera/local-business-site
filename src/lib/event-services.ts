import { prisma } from './prisma'
import { EventService, EventServiceFilters } from '@/types/event-service'

export async function getEventServices(filters: EventServiceFilters = {}): Promise<EventService[]> {
  console.log('🔄 Fetching event services from database...', new Date().toISOString(), { filters })
  
  const {
    category,
    minPrice,
    maxPrice,
    search,
    tags,
    isFeatured,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = filters

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    isActive: true,
    siteId: process.env.SITE_ID
  }

  if (category) {
    where.category = category
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.basePrice = {}
    if (minPrice !== undefined) {
      where.basePrice.gte = minPrice
    }
    if (maxPrice !== undefined) {
      where.basePrice.lte = maxPrice
    }
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } }
    ]
  }

  if (tags && tags.length > 0) {
    where.tags = {
      hasSome: tags
    }
  }

  if (isFeatured !== undefined) {
    where.isFeatured = isFeatured
  }

  // Build orderBy clause
  const orderBy: Record<string, 'asc' | 'desc'> = {}
  orderBy[sortBy] = sortOrder

  try {
    const eventServices = await prisma.eventService.findMany({
      where,
      orderBy,
      include: {
        servicePackages: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    console.log(`✅ Fetched ${eventServices.length} event services from database`)
    return eventServices as unknown as EventService[]
  } catch (error) {
    console.error('Error fetching event services:', error)
    return []
  }
}

export async function getEventServiceById(id: string): Promise<EventService | null> {
  console.log('🔄 Fetching event service by ID from database...', id, new Date().toISOString())
  
  try {
    const eventService = await prisma.eventService.findUnique({
      where: { id },
      include: {
        servicePackages: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    console.log('✅ Fetched event service:', eventService ? eventService.name : 'Not found')
    return eventService as unknown as EventService
  } catch (error) {
    console.error('Error fetching event service:', error)
    return null
  }
}

export async function getFeaturedEventServices(): Promise<EventService[]> {
  console.log('🔄 Fetching featured event services from database...', new Date().toISOString())
  
  try {
    const featuredServices = await prisma.eventService.findMany({
      where: {
        isActive: true,
        isFeatured: true,
        siteId: process.env.SITE_ID
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        servicePackages: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    console.log(`✅ Fetched ${featuredServices.length} featured event services from database`)
    return featuredServices as unknown as EventService[]
  } catch (error) {
    console.error('Error fetching featured event services:', error)
    return []
  }
}

// TODO: Change this to packages
// export async function getEventServiceCategories(): Promise<string[]> {
//   console.log('🔄 Fetching event service categories from database...', new Date().toISOString())
  
//   try {
//     const categories = await prisma.eventService.findMany({
//       where: {
//         isActive: true,
//         siteId: process.env.SITE_ID
//       },
//       select: {
//         category: true
//       },
//       distinct: ['category']
//     })

//     const categoryList = categories.map(cat => cat.category).filter((cat): cat is string => cat !== null)
//     console.log('✅ Fetched event service categories:', categoryList)
//     return categoryList
//   } catch (error) {
//     console.error('Error fetching event service categories:', error)
//     return []
//   }
// } 