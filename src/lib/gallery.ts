import { prisma } from './prisma'
import { GalleryItem, CreateGalleryItemData, UpdateGalleryItemData } from '@/types/gallery'

export async function getGalleryItems(): Promise<GalleryItem[] | null> {
  return await prisma.galleryItem.findMany({
    where: { siteId: process.env.SITE_ID },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  return await prisma.galleryItem.findUnique({
    where: { id, siteId: process.env.SITE_ID }
  })
}

export async function getFeaturedGalleryItems(): Promise<GalleryItem[]> {
  return await prisma.galleryItem.findMany({
    where: { 
      siteId: process.env.SITE_ID,
      isFeatured: true 
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createGalleryItem(data: CreateGalleryItemData): Promise<GalleryItem> {
  return await prisma.galleryItem.create({
    data: {
      ...data,
      siteId: process.env.SITE_ID!
    }
  })
}

export async function updateGalleryItem(id: string, data: UpdateGalleryItemData): Promise<GalleryItem> {
  return await prisma.galleryItem.update({
    where: { id, siteId: process.env.SITE_ID },
    data
  })
}

export async function deleteGalleryItem(id: string): Promise<GalleryItem> {
  return await prisma.galleryItem.delete({
    where: { id, siteId: process.env.SITE_ID }
  })
}

export async function getGalleryItemsByTags(tags: string[]): Promise<GalleryItem[]> {
  return await prisma.galleryItem.findMany({
    where: { 
      siteId: process.env.SITE_ID,
      tags: {
        hasSome: tags
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getGalleryItemsByDateRange(startDate: Date, endDate: Date): Promise<GalleryItem[]> {
  return await prisma.galleryItem.findMany({
    where: { 
      siteId: process.env.SITE_ID,
      projectDate: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: { projectDate: 'desc' }
  })
} 