export interface Testimonial {
  id: string
  clientName: string
  clientTitle?: string | null
  content: string
  rating?: number | null
  avatarUrl?: string | null
  projectId?: string | null
  createdAt: Date
  siteId: string
}

export interface CreateTestimonialData {
  clientName: string
  clientTitle?: string
  content: string
  rating?: number
  avatarUrl?: string
  projectId?: string
}

export interface UpdateTestimonialData {
  clientName?: string
  clientTitle?: string
  content?: string
  rating?: number
  avatarUrl?: string
  projectId?: string
} 