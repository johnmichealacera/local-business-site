'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types/product'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Truck,
  Shield,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

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
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
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
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-slate-600 ml-2">(12 reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                {isInStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Purchase Options */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center border border-slate-200 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-slate-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-slate-200">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 hover:bg-slate-100"
                      disabled={quantity >= product.stock || !isInStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!isInStock}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart - {formatPrice(product.price * quantity)}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    disabled={!isInStock}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Truck className="w-6 h-6 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-slate-500">On orders over ₱350</p>
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
      <div className="mt-12 pt-8 border-t">
        <Button variant="outline">
          <Link href="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>
    </div>
  )
} 