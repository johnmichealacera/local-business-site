import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { LoadingSkeleton } from '@/components/ui/loading-spinner'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isOnSale = product.salePrice && product.salePrice < product.price
  const finalPrice = product.salePrice || product.price
  const discountPercentage = isOnSale 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <Card hover variant="elevated" className="group overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrls[0] || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
        />
        
        {/* Overlay with action buttons */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <Link href={`/products/${product.id}`}>
            <Button size="sm" variant="outline" className="hover-lift">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
          {/* Not yet supported */}
          {/* <Button size="sm" variant="outline" className="hover-lift">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button> */}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isOnSale && (
            <Badge variant="destructive" className="animate-bounce-in">
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="outline" className="animate-fade-in">
              Out of Stock
            </Badge>
          )}
          {product.featured && (
            <Badge variant="default" className="animate-fade-in">
              Featured
            </Badge>
          )}
        </div>

        {/* TODO: Add wishlist button */}
        {/* Wishlist button */}
        {/* <div className="absolute top-2 right-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white hover:text-red-500 transition-all duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div> */}

        {/* Quick view on mobile */}
        <div className="absolute bottom-2 right-2 md:hidden">
          <Link href={`/products/${product.id}`}>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-slate-600 transition-colors">
              {product.name}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1 capitalize">{product.category.name}</p>
          </div>
          
          {/* TODO: Add rating */}
          {/* Rating */}
          {/* <div className="flex items-center space-x-1 ml-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-slate-600">4.5</span>
          </div> */}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(finalPrice)}
            </span>
            {isOnSale && (
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium">
                {product.stock} left
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">
                Sold out
              </span>
            )}
          </div>
        </div>

        {/* Size availability (if applicable) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((size: string) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Description preview */}
        <p className="text-sm text-slate-600 mt-3 line-clamp-2">
          {product.description}
        </p>

        {/* Action buttons for desktop */}
        <div className="mt-4 hidden md:flex space-x-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full hover-lift">
              View Details
            </Button>
          </Link>
          {/* Not yet supported */}
          {/* <Button 
            className="btn-primary flex-1" 
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button> */}
        </div>
      </CardContent>
    </Card>
  )
}

// Product card skeleton for loading states
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square">
        <LoadingSkeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <LoadingSkeleton className="h-6 w-3/4" />
          <LoadingSkeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <LoadingSkeleton className="h-6 w-20" />
            <LoadingSkeleton className="h-4 w-16" />
          </div>
          <div className="flex space-x-1">
            <LoadingSkeleton className="h-6 w-12" />
            <LoadingSkeleton className="h-6 w-12" />
            <LoadingSkeleton className="h-6 w-12" />
          </div>
          <LoadingSkeleton className="h-10 w-full" />
          <div className="flex space-x-2">
            <LoadingSkeleton className="h-10 flex-1" />
            <LoadingSkeleton className="h-10 flex-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 