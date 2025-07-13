export interface Category {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  imageUrls: string[]
  isActive: boolean
  categoryId: string
  category: Category
  createdAt: Date
  updatedAt: Date 
  sizes?: string[]
  salePrice?: number
  featured?: boolean
  discountPercentage?: number
  siteId: string
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'price' | 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
} 