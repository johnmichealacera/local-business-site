export interface Site {
  id: string
  name: string
  domain: string
  subdomain?: string
  description?: string
  logoUrl?: string
  googleAnalyticsTag?: string
  colorPalette: string[] // [primary, secondary, tertiary]
  isActive: boolean
  packageType: SitePackage
  features: SiteFeatureData[]
  featuresOrder: SiteFeature[]
  hero?: {
    id: string
    title: string
    subtitle: string
    description: string
    imageUrl: string
    videoUrl: string
    ctaButton: string
    ctaLink: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface SiteFeatureData {
  siteId: string;
  name: FeatureName;
  description: string;
  zcalEnabled?: boolean;
  zcalLink?: string;
}

// Temporary alias for feature name type
export type FeatureName = SiteFeature; 

export interface NavLink {
  name: string
  href: string
  feature: SiteFeature
}

export enum SitePackage {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export enum SiteFeature {
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
  EVENTS = 'EVENTS',
  EVENT_SERVICES = 'EVENT_SERVICES',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
} 