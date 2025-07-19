'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EventFilters } from '@/types/event'
import { Search, Filter, X, Calendar } from 'lucide-react'

interface EventFiltersProps {
  filters: EventFilters
  onFiltersChange: (filters: EventFilters) => void
}

export function EventFiltersComponent({ filters, onFiltersChange }: EventFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof EventFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => filters[key as keyof EventFilters])

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </span>
          {hasActiveFilters && (
            <span className="bg-slate-900 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`space-y-4 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        {/* Search */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Search</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Location</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="City"
                value={filters.city || ''}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <input
                type="text"
                placeholder="Province/State"
                value={filters.province || ''}
                onChange={(e) => handleFilterChange('province', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Price Range */}
        {/* <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Date Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500">From</label>
                <input
                  type="date"
                  value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleFilterChange('startDate', e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">To</label>
                <input
                  type="date"
                  value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleFilterChange('endDate', e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Type */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Booking Type</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.featured === true}
                  onChange={(e) => handleFilterChange('featured', e.target.checked ? true : undefined)}
                  className="w-4 h-4 text-slate-600"
                />
                <span className="text-sm">Featured Bookings</span>
              </label>
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
              value={`${filters.sortBy || 'startDate'}-${filters.sortOrder || 'asc'}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc']
                handleFilterChange('sortBy', sortBy)
                handleFilterChange('sortOrder', sortOrder)
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="startDate-asc">Date: Earliest First</option>
              <option value="startDate-desc">Date: Latest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
} 