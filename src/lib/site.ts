import { prisma } from './prisma'
import { Site } from '@/types/site'

export async function getSiteInfo(): Promise<Site | null> {
  console.log('🔄 Fetching site info from database...', new Date().toISOString())
  
  const siteId = process.env.SITE_ID
  
  if (!siteId) {
    console.error('❌ SITE_ID environment variable is not set')
    return null
  }

  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      select: {
        id: true,
        name: true,
        domain: true,
        subdomain: true,
        logoUrl: true,
        description: true,
        isActive: true,
        features: { select: { siteId: true, name: true, description: true } },
        featuresOrder: true,
        colorPalette: true,
        packageType: true,
        heroTitle: true,
        heroSubtitle: true,
        heroDescription: true,
        heroImageUrl: true,
        heroVideoUrl: true,
        heroCTAButton: true,
        heroCTALink: true,
        updatedAt: true,
        createdAt: true
      }
    })

    console.log('site', site);
    

    console.log('✅ Fetched site info:', site ? site.name : 'Not found')
    return site as Site
  } catch (error) {
    console.error('Error fetching site info:', error)
    return null
  }
}

export async function getSiteById(id: string): Promise<Site | null> {
  console.log('🔄 Fetching site by ID from database...', id, new Date().toISOString())
  
  try {
    const site = await prisma.site.findUnique({
      where: { id }
    })

    console.log('✅ Fetched site:', site ? site.name : 'Not found')
    return site as Site
  } catch (error) {
    console.error('Error fetching site:', error)
    return null
  }
}

export async function getSiteByDomain(domain: string): Promise<Site | null> {
  console.log('🔄 Fetching site by domain from database...', domain, new Date().toISOString())
  
  try {
    const site = await prisma.site.findUnique({
      where: { domain }
    })

    console.log('✅ Fetched site by domain:', site ? site.name : 'Not found')
    return site as Site
  } catch (error) {
    console.error('Error fetching site by domain:', error)
    return null
  }
}

export async function getSiteBySubdomain(subdomain: string): Promise<Site | null> {
  console.log('🔄 Fetching site by subdomain from database...', subdomain, new Date().toISOString())
  
  try {
    const site = await prisma.site.findUnique({
      where: { subdomain }
    })

    console.log('✅ Fetched site by subdomain:', site ? site.name : 'Not found')
    return site as Site
  } catch (error) {
    console.error('Error fetching site by subdomain:', error)
    return null
  }
}

export async function getCurrentSite(): Promise<Site | null> {
  return getSiteInfo()
} 