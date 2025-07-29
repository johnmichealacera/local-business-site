export interface GalleryItem {
  id: string
  title?: string | null
  imageUrl: string
  description?: string | null
  projectDate?: Date | null
  tags: string[]
  isFeatured: boolean
  createdAt: Date
  siteId: string
}

export interface CreateGalleryItemData {
  title?: string
  imageUrl: string
  description?: string
  projectDate?: Date
  tags?: string[]
  isFeatured?: boolean
}

export interface UpdateGalleryItemData {
  title?: string
  imageUrl?: string
  description?: string
  projectDate?: Date
  tags?: string[]
  isFeatured?: boolean
} 