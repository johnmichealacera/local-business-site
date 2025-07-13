export interface EventServiceAddOn {
  name: string
  price: number
  description: string
}

export interface EventService {
  id: string
  name: string
  description: string
  basePrice: number
  category: string
  duration: string
  inclusions: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addOns: any[]
  freebies: string[]
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  contactEmail?: string
  contactPhone?: string
  bookingUrl?: string
  siteId: string
  createdAt: Date
  updatedAt: Date
}

export interface EventServiceFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  tags?: string[]
  isFeatured?: boolean
  sortBy?: 'basePrice' | 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
} 