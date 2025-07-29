import { SiteFeature, NavLink } from '@/types/site'

export function getNavigationLinks(features: SiteFeature[], featuresOrder: SiteFeature[]): NavLink[] {
  const featureMap: Record<SiteFeature, NavLink> = {
    [SiteFeature.DASHBOARD]: {
      name: 'Dashboard',
      href: '/dashboard',
      feature: SiteFeature.DASHBOARD
    },
    [SiteFeature.PRODUCTS]: {
      name: 'Products',
      href: '/products',
      feature: SiteFeature.PRODUCTS
    },
    [SiteFeature.CATEGORIES]: {
      name: 'Categories',
      href: '/categories',
      feature: SiteFeature.CATEGORIES
    },
    [SiteFeature.EVENTS]: {
      name: 'Bookings',
      href: '/bookings',
      feature: SiteFeature.EVENTS
    },
    [SiteFeature.EVENT_SERVICES]: {
      name: 'Event Services',
      href: '/events-services',
      feature: SiteFeature.EVENT_SERVICES
    },
    [SiteFeature.ABOUT]: {
      name: 'About',
      href: '/about',
      feature: SiteFeature.ABOUT
    },
    [SiteFeature.CONTACT]: {
      name: 'Contact',
      href: '/contact',
      feature: SiteFeature.CONTACT
    },
    [SiteFeature.SERVICES]: {
      name: 'Services',
      href: '/services',
      feature: SiteFeature.SERVICES
    },
    [SiteFeature.GALLERY]: {
      name: 'Gallery',
      href: '/gallery',
      feature: SiteFeature.GALLERY
    },
    [SiteFeature.TESTIMONIALS]: {
      name: 'Testimonials',
      href: '/testimonials',
      feature: SiteFeature.TESTIMONIALS
    }
  }

  // Filter out DASHBOARD and return navigation links for enabled features
  return featuresOrder
    .filter(feature => feature !== SiteFeature.DASHBOARD)
    .map(feature => featureMap[feature])
    .filter(Boolean) // Remove any undefined entries
}

export function getQuickLinks(features: SiteFeature[], featuresOrder: SiteFeature[]): NavLink[] {
  // For footer quick links, we might want different ordering or selection
  return getNavigationLinks(features, featuresOrder)
} 