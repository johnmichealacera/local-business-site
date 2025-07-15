import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import { ContactInfo } from '@/lib/contact'
import { SiteFeature } from '@/types/site'
import { getQuickLinks } from '@/lib/navigation'

interface FooterProps {
  siteName: string
  logoUrl?: string
  contactInfo: ContactInfo | null
  features: SiteFeature[]
  featuresOrder: SiteFeature[]
}

export function Footer({ siteName, logoUrl, contactInfo, features, featuresOrder }: FooterProps) {
  // Use database contact info or fallback to defaults
  const contact = {
    businessName: contactInfo?.businessName || siteName,
    email: contactInfo?.email,
    phone: contactInfo?.phone,
    address: contactInfo?.address,
    city: contactInfo?.city,
    province: contactInfo?.province,
    zipCode: contactInfo?.zipCode
  }

  // Get quick links based on site features
  const quickLinks = getQuickLinks(features, featuresOrder)
  return (
    <footer className="bg-[var(--color-tertiary-light)] border-t border-[var(--color-secondary)] border-opacity-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${contact.businessName} logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <ShoppingBag className="h-8 w-8 text-[var(--color-secondary)]" />
              )}
              <span className="text-xl font-bold text-[var(--color-secondary)]">
                {contact.businessName}
              </span>
            </Link>
            <p className="text-[var(--color-secondary)] opacity-70 text-sm">
              Your destination for quality pre-owned shoes and apparel. 
              Sustainable fashion that doesn&apos;t compromise on style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 transition-all">
                  Home
                </Link>
              </li>
              {quickLinks.map((link) => (
                <li key={link.feature}>
                  <Link href={link.href} className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Not sure if we need this */}
          {/* Categories */}
          {/* <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=shoes" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?category=clothing" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=vintage" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Vintage
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wide">
              Contact Info
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                <span className="text-[var(--color-secondary)] opacity-70 text-sm">{contact.email}</span>
              </div>
              {contact.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                  <span className="text-[var(--color-secondary)] opacity-70 text-sm">{contact.phone}</span>
                </div>
              )}
              {contact.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                  <span className="text-[var(--color-secondary)] opacity-70 text-sm">
                    {contact.address}
                    {contact.city && `, ${contact.city}`}
                    {contact.province && `, ${contact.province}`}
                    {contact.zipCode && ` ${contact.zipCode}`}
                  </span>
                </div>
              )}
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              {contactInfo?.socialLinks?.facebook && (
                <Link href={contactInfo.socialLinks.facebook} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {contactInfo?.socialLinks?.instagram && (
                <Link href={contactInfo.socialLinks.instagram} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {contactInfo?.socialLinks?.twitter && (
                <Link href={contactInfo.socialLinks.twitter} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {/* Show fallback social links if no database social links exist */}
              {!contactInfo?.socialLinks && (
                <>
                  <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-secondary)] border-opacity-20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--color-secondary)] opacity-70 text-sm">
              © 2025 {contact.businessName}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 text-sm transition-all">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 text-sm transition-all">
                Terms of Service
              </Link>
              <Link href="#" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 text-sm transition-all">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 