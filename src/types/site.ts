export interface Site {
  id: string
  name: string
  domain: string
  subdomain?: string
  description?: string
  isActive: boolean
  packageType: SitePackage
  features: SiteFeature[]
  createdAt: Date
  updatedAt: Date
}

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