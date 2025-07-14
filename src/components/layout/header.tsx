'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SiteFeature } from '@/types/site'
import { getNavigationLinks } from '@/lib/navigation'

interface HeaderProps {
  siteName: string
  logoUrl?: string
  features: SiteFeature[]
}

export function Header({ siteName, logoUrl, features }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  // Get navigation links based on site features
  const navigationLinks = getNavigationLinks(features)

  console.log('navigationLinks', navigationLinks)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with enhanced animation */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1 rounded-lg group-hover:bg-slate-100 transition-all duration-300">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${siteName} logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <ShoppingBag className="h-8 w-8 text-slate-900 group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>
            <span className="text-xl font-bold text-slate-900 group-hover:text-gradient transition-all duration-300">
              {siteName}
            </span>
          </Link>

          {/* Desktop Navigation with enhanced animations */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Home
            </Link>
            {navigationLinks.map((link) => (
              <Link 
                key={link.feature} 
                href={link.href} 
                className="nav-link text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions with enhanced buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover-lift h-10 w-10 rounded-full hover:bg-slate-100">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover-lift h-10 w-10 rounded-full hover:bg-slate-100">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover-lift h-10 w-10 rounded-full hover:bg-slate-100 relative">
              <ShoppingBag className="h-4 w-4" />
              {/* Optional cart badge */}
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-in">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button with enhanced animation */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMenu}
              className="h-10 w-10 rounded-full hover:bg-slate-100 transition-all duration-300"
            >
              <div className="relative">
                <Menu className={`h-4 w-4 transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-4 w-4 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with enhanced animations */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 border-t animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {navigationLinks.map((link) => (
                <Link 
                  key={link.feature}
                  href={link.href} 
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-4 border-t">
                <Button variant="ghost" size="sm" className="hover-lift h-10 w-10 rounded-full hover:bg-slate-100">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover-lift h-10 w-10 rounded-full hover:bg-slate-100">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover-lift h-10 w-10 rounded-full hover:bg-slate-100 relative">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
} 