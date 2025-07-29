import { prisma } from './prisma'
import { Testimonial, CreateTestimonialData, UpdateTestimonialData } from '@/types/testimonial'

export async function getTestimonials(): Promise<Testimonial[]> {
  return await prisma.testimonial.findMany({
    where: { siteId: process.env.SITE_ID },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
  return await prisma.testimonial.findUnique({
    where: { id, siteId: process.env.SITE_ID }
  })
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return await prisma.testimonial.findMany({
    where: { siteId: process.env.SITE_ID },
    orderBy: { createdAt: 'desc' },
    take: 6 // Limit to 6 featured testimonials
  })
}

export async function createTestimonial(data: CreateTestimonialData): Promise<Testimonial> {
  return await prisma.testimonial.create({
    data: {
      ...data,
      siteId: process.env.SITE_ID!
    }
  })
}

export async function updateTestimonial(id: string, data: UpdateTestimonialData): Promise<Testimonial> {
  return await prisma.testimonial.update({
    where: { id, siteId: process.env.SITE_ID },
    data
  })
}

export async function deleteTestimonial(id: string): Promise<Testimonial> {
  return await prisma.testimonial.delete({
    where: { id, siteId: process.env.SITE_ID }
  })
}

export async function getTestimonialsByRating(rating: number): Promise<Testimonial[]> {
  return await prisma.testimonial.findMany({
    where: { 
      rating,
      siteId: process.env.SITE_ID 
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getTestimonialsByProject(projectId: string): Promise<Testimonial[]> {
  return await prisma.testimonial.findMany({
    where: { 
      projectId,
      siteId: process.env.SITE_ID 
    },
    orderBy: { createdAt: 'desc' }
  })
} 