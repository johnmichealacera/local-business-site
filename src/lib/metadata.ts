import { Metadata } from 'next'
import { getSiteInfo } from './site'
import { getAboutInfo } from './about'
import { getServices } from './services'
import { getProducts } from './products'
import { getGalleryItems } from './gallery'
import { getTestimonials } from './testimonials'

export interface MetadataConfig {
  title?: string
  description?: string
  imageUrl?: string
  type?: 'website' | 'article'
}

export async function generatePageMetadata(config: MetadataConfig): Promise<Metadata> {
  try {
    const siteInfo = await getSiteInfo()
    const siteName = siteInfo?.name || 'Local Business'
    const siteDescription = siteInfo?.description || 'Your local business'
    const logoUrl = siteInfo?.logoUrl

    const title = config.title 
      ? `${config.title} | ${siteName}`
      : siteName

    const description = config.description || siteDescription

    const openGraphImage = config.imageUrl || logoUrl || '/default-og-image.jpg'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: config.type || 'website',
        images: [
          {
            url: openGraphImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        siteName,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [openGraphImage],
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    console.error('Error generating page metadata:', error)
    // Return fallback metadata
    return {
      title: config.title || 'Local Business',
      description: config.description || 'Your local business',
      openGraph: {
        title: config.title || 'Local Business',
        description: config.description || 'Your local business',
        type: config.type || 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title || 'Local Business',
        description: config.description || 'Your local business',
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  }
}

export async function generateHomepageMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()
  const hero = siteInfo?.hero

  return generatePageMetadata({
    title: hero?.title || 'Welcome',
    description: hero?.subtitle || hero?.description || siteInfo?.description,
    imageUrl: hero?.imageUrl,
    type: 'website',
  })
}

export async function generateAboutMetadata(): Promise<Metadata> {
  const aboutInfo = await getAboutInfo()
  const siteInfo = await getSiteInfo()

  return generatePageMetadata({
    title: aboutInfo?.title || 'About Us',
    description: aboutInfo?.content 
      ? aboutInfo.content.substring(0, 160) + (aboutInfo.content.length > 160 ? '...' : '')
      : `Learn more about ${siteInfo?.name || 'our business'} and our mission.`,
    type: 'website',
  })
}

export async function generateServicesMetadata(): Promise<Metadata> {
  const [services, siteInfo] = await Promise.all([
    getServices(),
    getSiteInfo()
  ])

  // Use the first service as the main content for metadata
  const mainService = services[0]

  return generatePageMetadata({
    title: 'Our Services',
    description: mainService?.description 
      ? mainService.description.substring(0, 160) + (mainService.description.length > 160 ? '...' : '')
      : `Explore our professional services at ${siteInfo?.name || 'our business'}.`,
    type: 'website',
  })
}

export async function generateProductsMetadata(): Promise<Metadata> {
  const [products, siteInfo] = await Promise.all([
    getProducts({ sortBy: 'createdAt', sortOrder: 'desc' }),
    getSiteInfo()
  ])

  // Use the first product as the main content for metadata
  const mainProduct = products[0]

  return generatePageMetadata({
    title: 'Our Products',
    description: mainProduct?.description 
      ? mainProduct.description.substring(0, 160) + (mainProduct.description.length > 160 ? '...' : '')
      : `Discover our latest products at ${siteInfo?.name || 'our business'}.`,
    imageUrl: mainProduct?.imageUrls?.[0],
    type: 'website',
  })
}

export async function generateContactMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()

  return generatePageMetadata({
    title: 'Contact Us',
    description: `Get in touch with ${siteInfo?.name || 'our business'}. We're here to help with your questions and needs.`,
    type: 'website',
  })
}

export async function generateGalleryMetadata(): Promise<Metadata> {
  const [siteInfo, galleryItems] = await Promise.all([
    getSiteInfo(),
    getGalleryItems()
  ])

  // Use the first gallery item as the main content for metadata
  const mainItem = galleryItems?.[0]

  return generatePageMetadata({
    title: 'Gallery',
    description: mainItem?.description 
      ? mainItem.description.substring(0, 160) + (mainItem.description.length > 160 ? '...' : '')
      : `Browse our photo gallery showcasing our work and products at ${siteInfo?.name || 'our business'}.`,
    imageUrl: mainItem?.imageUrl,
    type: 'website',
  })
}

export async function generateTestimonialsMetadata(): Promise<Metadata> {
  const [siteInfo, testimonials] = await Promise.all([
    getSiteInfo(),
    getTestimonials()
  ])

  // Use the first testimonial as the main content for metadata
  const mainTestimonial = testimonials[0]

  return generatePageMetadata({
    title: 'Testimonials',
    description: mainTestimonial?.content 
      ? mainTestimonial.content.substring(0, 160) + (mainTestimonial.content.length > 160 ? '...' : '')
      : `Read what our customers have to say about ${siteInfo?.name || 'our business'}.`,
    type: 'website',
  })
}

export async function generateEventsServicesMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()

  return generatePageMetadata({
    title: 'Event Services',
    description: `Professional event services and packages offered by ${siteInfo?.name || 'our business'}.`,
    type: 'website',
  })
}

export async function generateCategoriesMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()

  return generatePageMetadata({
    title: 'Product Categories',
    description: `Browse our product categories and find exactly what you're looking for at ${siteInfo?.name || 'our business'}.`,
    type: 'website',
  })
}

export async function generateBookingsMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()

  return generatePageMetadata({
    title: 'Bookings',
    description: `Book our services and events with ${siteInfo?.name || 'our business'}. Easy online booking available.`,
    type: 'website',
  })
}

export async function generateBookMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()

  return generatePageMetadata({
    title: 'Book Your Event',
    description: `Schedule your consultation and book your event with ${siteInfo?.name || 'our business'}. Expert event planning services.`,
    type: 'website',
  })
} 