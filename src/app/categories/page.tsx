import { getCategories } from '@/lib/products'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getSiteInfo } from '@/lib/site'
import { parseColorPalette, generateDynamicGradientStyle } from '@/lib/colors'
import { SiteFeature } from '@/types/site'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const [categories, siteInfo] = await Promise.all([
    getCategories(),
    getSiteInfo()
  ])

  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF'])

  return (
    <div 
      className="min-h-screen"
      style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {siteInfo?.features.find(feature => feature.name === SiteFeature.CATEGORIES)?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.name}
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </CardTitle>
                {category.description && (
                  <CardDescription>
                    {category.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Link
                  href={`/products?category=${category.id}`}
                  className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Browse products
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No categories available at the moment.</div>
          </div>
        )}
      </div>
    </div>
  )
} 