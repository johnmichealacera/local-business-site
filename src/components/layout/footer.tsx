import Link from 'next/link'
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  // Default contact info - will be updated to use database in a future version
  const contact = {
    businessName: "Thrifted Treasures",
    email: "hello@thriftedtreasures.com",
    phone: "(555) 123-4567",
    address: "123 Thrift St",
    city: "Fashion City",
    state: "FC",
    zipCode: "12345"
  }
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-slate-900" />
              <span className="text-xl font-bold text-slate-900">
                {contact.businessName}
              </span>
            </Link>
            <p className="text-slate-600 text-sm">
              Your destination for quality pre-owned shoes and apparel. 
              Sustainable fashion that doesn&apos;t compromise on style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
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
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Contact Info
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600 text-sm">{contact.email}</span>
              </div>
              {contact.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">{contact.phone}</span>
                </div>
              )}
              {contact.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">
                    {contact.address}
                    {contact.city && `, ${contact.city}`}
                    {contact.state && `, ${contact.state}`}
                    {contact.zipCode && ` ${contact.zipCode}`}
                  </span>
                </div>
              )}
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">
              © 2024 {contact.businessName}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 