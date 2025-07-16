'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCard } from './product-card'
import { ProductFiltersComponent } from './product-filters'
import { Button } from '@/components/ui/button'
import { Product, ProductFilters } from '@/types/product'
import { Grid, List } from 'lucide-react'
import { Site } from '@/types/site'

interface ProductsClientProps {
  siteInfo: Site | null
  initialProducts: Product[]
  categories: { id: string; name: string }[]
  initialFilters: ProductFilters
}

export function ProductsClient({ siteInfo, initialProducts, categories, initialFilters }: ProductsClientProps) {
  const [products] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const router = useRouter()
  const searchParams = useSearchParams()
  const productsFeature = siteInfo?.features.find(f => f.name === 'PRODUCTS')
  const productsDescription = productsFeature?.description || "Discover our carefully curated collection of pre-owned shoes, clothing, and accessories. Each item is inspected for quality and authenticity."

  // Apply filters
  useEffect(() => {
    let filtered = [...products]

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.categoryId === filters.category)
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!)
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      )
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue, bValue
        
        switch (filters.sortBy) {
          case 'price':
            aValue = a.price
            bValue = b.price
            break
          case 'name':
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case 'createdAt':
            aValue = a.createdAt
            bValue = b.createdAt
            break
          default:
            return 0
        }

        if (filters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
      })
    }

    setFilteredProducts(filtered)
  }, [products, filters])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    
    // Update URL params based on filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [filters, router, searchParams])

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Our Products
        </h1>
        <p className="text-slate-600 max-w-2xl">
          {productsDescription}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <ProductFiltersComponent
            categories={categories}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 