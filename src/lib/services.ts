import { prisma } from './prisma'
import { Service, CreateServiceData, UpdateServiceData } from '@/types/service'

export async function getServices(): Promise<Service[]> {
  return await prisma.service.findMany({
    where: { siteId: process.env.SITE_ID },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getService(id: string): Promise<Service | null> {
  return await prisma.service.findUnique({
    where: { id, siteId: process.env.SITE_ID }
  })
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return await prisma.service.findFirst({
    where: { slug, siteId: process.env.SITE_ID }
  })
}

export async function getFeaturedServices(): Promise<Service[]> {
  return await prisma.service.findMany({
    where: { 
      siteId: process.env.SITE_ID,
      isFeatured: true 
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createService(data: CreateServiceData): Promise<Service> {
  return await prisma.service.create({
    data: {
      ...data,
      siteId: process.env.SITE_ID!
    }
  })
}

export async function updateService(id: string, data: UpdateServiceData): Promise<Service> {
  return await prisma.service.update({
    where: { id, siteId: process.env.SITE_ID },
    data
  })
}

export async function deleteService(id: string): Promise<Service> {
  return await prisma.service.delete({
    where: { id, siteId: process.env.SITE_ID }
  })
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  return await prisma.service.findMany({
    where: { 
      category,
      siteId: process.env.SITE_ID 
    },
    orderBy: { createdAt: 'desc' }
  })
} 