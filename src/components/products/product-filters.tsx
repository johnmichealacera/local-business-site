'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductFilters } from '@/types/product'
import { Search, Filter, X } from 'lucide-react'

interface ProductFiltersProps {
  categories: { id: string; name: string }[]
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
}

export function ProductFiltersComponent({ categories, filters, onFiltersChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => filters[key as keyof ProductFilters])

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between shadow-sm"
        >
          <span className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full">
                {Object.keys(filters).filter(key => filters[key as keyof ProductFilters]).length}
              </span>
            )}
          </span>
          <span className="text-slate-500">
            {isOpen ? 'Hide' : 'Show'}
          </span>
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`space-y-4 ${isOpen ? 'block' : 'hidden'} lg:block transition-all duration-200`}>
        {/* Search */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Search Products</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or description..."
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
              />
              {filters.search && (
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-md transition-colors">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category}
                  onChange={() => handleFilterChange('category', '')}
                  className="w-4 h-4 text-slate-600 focus:ring-slate-500"
                />
                <span className="text-sm font-medium">All Categories</span>
              </label>
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-md transition-colors">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.id}
                    onChange={() => handleFilterChange('category', category.id)}
                    className="w-4 h-4 text-slate-600 focus:ring-slate-500"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Price Range Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 block">
                    Min Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                      ₱
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 block">
                    Max Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                      ₱
                    </span>
                    <input
                      type="number"
                      placeholder="5000"
                      min="0"
                      step="0.01"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Price Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 block">
                  Quick Select
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleFilterChange('minPrice', 0)
                      handleFilterChange('maxPrice', 500)
                    }}
                    className={`text-xs h-8 ${filters.minPrice === 0 && filters.maxPrice === 500 ? 'bg-slate-100 border-slate-300' : ''}`}
                  >
                    Under ₱500
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleFilterChange('minPrice', 500)
                      handleFilterChange('maxPrice', 1000)
                    }}
                    className={`text-xs h-8 ${filters.minPrice === 500 && filters.maxPrice === 1000 ? 'bg-slate-100 border-slate-300' : ''}`}
                  >
                    ₱500-₱1,000
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleFilterChange('minPrice', 1000)
                      handleFilterChange('maxPrice', 2000)
                    }}
                    className={`text-xs h-8 ${filters.minPrice === 1000 && filters.maxPrice === 2000 ? 'bg-slate-100 border-slate-300' : ''}`}
                  >
                    ₱1,000-₱2,000
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleFilterChange('minPrice', 2000)
                      handleFilterChange('maxPrice', undefined)
                    }}
                    className={`text-xs h-8 ${filters.minPrice === 2000 && !filters.maxPrice ? 'bg-slate-100 border-slate-300' : ''}`}
                  >
                    ₱2,000+
                  </Button>
                </div>
              </div>

              {/* Clear Price Filter */}
              {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleFilterChange('minPrice', undefined)
                    handleFilterChange('maxPrice', undefined)
                  }}
                  className="w-full text-xs h-8 text-slate-500 hover:text-slate-700"
                >
                  Clear Price Filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sort */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Sort By</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <select
              value={`${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc']
                handleFilterChange('sortBy', sortBy)
                handleFilterChange('sortOrder', sortOrder)
              }}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full shadow-sm hover:shadow-md transition-shadow"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
} 