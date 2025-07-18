'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types/product'
import {
  Share2, 
  ArrowLeft, 
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const isInStock = product.stock > 0
  const images = product.imageUrls.length > 0 ? product.imageUrls : ['/placeholder-product.jpg']

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-slate-600">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-slate-900">Products</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/products?category=${product.categoryId}`} className="hover:text-slate-900">
              {product.category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src={images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-slate-900' : 'border-slate-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                {product.category.name}
              </span>
              <div className="flex items-center space-x-2">
                {/* TODO: Wishlist functionality - Coming in next iteration */}
                {/* <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button> */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out this amazing ${product.category.name.toLowerCase()}: ${product.name}`,
                        url: window.location.href,
                      }).catch((error) => {
                        console.log('Error sharing:', error);
                        // Fallback to copying URL
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      });
                    } else {
                      // Fallback for browsers that don't support Web Share API
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="hover:bg-slate-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {/* <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-slate-600 ml-2">(12 reviews)</span>
              </div> */}
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                {isInStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* TODO: Purchase Options - Coming Soon */}
          {/* 
          TODO: Implement shopping cart and checkout functionality
          - Add to cart functionality
          - Quantity selector
          - Buy now button
          - Checkout process
          - Payment integration
          */}
          <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Shopping Coming Soon</h3>
                <p className="text-slate-600 mb-4">
                  We&apos;re working on bringing you a seamless shopping experience. 
                  Check back soon for the ability to purchase items directly from our store.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>In development</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <svg className="w-6 h-6 mx-auto mb-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm font-medium">Local Pickup</p>
              <p className="text-xs text-slate-500">Visit our store</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Shield className="w-6 h-6 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-medium">Quality Guarantee</p>
              <p className="text-xs text-slate-500">Thoroughly inspected</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <RotateCcw className="w-6 h-6 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-medium">30-Day Returns</p>
              <p className="text-xs text-slate-500">Easy return policy</p>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {product.description?.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back to Products */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/products">
            <Button 
              variant="outline" 
              className="group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Products
            </Button>
          </Link>
          
          {/* Additional Actions */}
          <div className="flex items-center space-x-2">
            <Link href={`/products?category=${product.categoryId}`}>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                View More {product.category.name}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.name,
                    text: `Check out this amazing ${product.category.name.toLowerCase()}: ${product.name}`,
                    url: window.location.href,
                  }).catch((error) => {
                    console.log('Error sharing:', error);
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 