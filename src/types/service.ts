export interface Service {
  id: string
  title: string
  slug: string
  description: string
  category?: string | null
  iconUrl?: string | null
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
  siteId: string
}

export interface CreateServiceData {
  title: string
  slug: string
  description: string
  category?: string
  iconUrl?: string
  isFeatured?: boolean
}

export interface UpdateServiceData {
  title?: string
  slug?: string
  description?: string
  category?: string
  iconUrl?: string
  isFeatured?: boolean
} 