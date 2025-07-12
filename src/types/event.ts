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