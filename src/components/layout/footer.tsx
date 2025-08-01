'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaSpotify, FaTiktok, FaGlobe } from 'react-icons/fa'
import { ContactInfo } from '@/lib/contact'
import { SiteFeature } from '@/types/site'
import { getQuickLinks } from '@/lib/navigation'
import { Button } from '@/components/ui/button'

interface FooterProps {
  siteName: string
  siteDescription: string
  logoUrl?: string
  contactInfo: ContactInfo | null
  features: SiteFeature[]
  featuresOrder: SiteFeature[]
}

// Back to Top Button Component
function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white border-0"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

export function Footer({ siteName, siteDescription, logoUrl, contactInfo, features, featuresOrder }: FooterProps) {
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
    <>
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
                {siteDescription}
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
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                {contactInfo?.socialLinks?.facebook && (
                  <Link href={contactInfo.socialLinks.facebook} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.instagram && (
                  <Link href={contactInfo.socialLinks.instagram} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.twitter && (
                  <Link href={contactInfo.socialLinks.twitter} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.youtube && (
                  <Link href={contactInfo.socialLinks.youtube} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.spotify && (
                  <Link href={contactInfo.socialLinks.spotify} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaSpotify className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.linkedin && (
                  <Link href={contactInfo.socialLinks.linkedin} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.tiktok && (
                  <Link href={contactInfo.socialLinks.tiktok} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {contactInfo?.socialLinks?.website && (
                  <Link href={contactInfo.socialLinks.website} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer">
                    <FaGlobe className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
                {/* Show fallback social links if no database social links exist */}
                {!contactInfo?.socialLinks && (
                  <>
                    <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110">
                      <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                    <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110">
                      <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                    <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110">
                      <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
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
              {/* TODO: Add privacy policy, terms of service, and returns */}
              {/* <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 text-sm transition-all">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 text-sm transition-all">
                  Terms of Service
                </Link>
                <Link href="#" className="text-[var(--color-secondary)] opacity-70 hover:opacity-100 text-sm transition-all">
                  Returns
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </>
  )
} 