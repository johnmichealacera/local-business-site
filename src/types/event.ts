export interface Event {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate?: Date
  location?: string
  address?: string
  city?: string
  province?: string
  zipCode?: string
  country?: string
  price: number
  maxAttendees?: number
  imageUrls: string[]
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  contactEmail?: string
  contactPhone?: string
  websiteUrl?: string
  contactName?: string
  isConfirmed?: boolean
  eventServicePackageId?: string
  eventServicePackage?: {
    id: string
    name: string
    description?: string
    price?: number
    inclusions: string[]
    addOns: unknown
    freebies: string[]
    isActive: boolean
    colorHexCode?: string
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    eventService?: {
      id: string
      name: string
      description?: string
    }
  }
  createdAt: Date
  updatedAt: Date
}

export interface EventFilters {
  city?: string
  province?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  tags?: string[]
  startDate?: Date
  endDate?: Date
  featured?: boolean
  sortBy?: 'price' | 'title' | 'startDate' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
} 