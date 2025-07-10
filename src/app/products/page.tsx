import { Suspense } from 'react'
import { ProductsClient } from '@/components/products/products-client'
import { getProducts, getCategories } from '@/lib/products'
import { ProductFilters } from '@/types/product'
import { Loader2 } from 'lucide-react'

// Force dynamic rendering - this prevents caching and ensures fresh data
export const dynamic = 'force-dynamic'

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams before using its properties
  const params = await searchParams
  
  // Convert search params to filters
  const filters: ProductFilters = {
    category: typeof params.category === 'string' ? params.category : undefined,
    minPrice: typeof params.minPrice === 'string' ? Number(params.minPrice) : undefined,
    maxPrice: typeof params.maxPrice === 'string' ? Number(params.maxPrice) : undefined,
    search: typeof params.search === 'string' ? params.search : undefined,
    sortBy: typeof params.sortBy === 'string' ? params.sortBy as 'price' | 'name' | 'createdAt' : 'createdAt',
    sortOrder: typeof params.sortOrder === 'string' ? params.sortOrder as 'asc' | 'desc' : 'desc'
  }

  // Fetch data from database
  const [products, categories] = await Promise.all([
    getProducts(filters),
    getCategories()
  ]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsClient 
        initialProducts={products} 
        categories={categories} 
        initialFilters={filters}
      />
    </Suspense>
  )
} 