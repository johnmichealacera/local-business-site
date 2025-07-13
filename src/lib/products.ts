import { prisma } from './prisma'
import { Product, ProductFilters } from '@/types/product'

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  console.log('🔄 Fetching products from database...', new Date().toISOString(), { filters })
  
  const {
    category,
    minPrice,
    maxPrice,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = filters

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    isActive: true
  }

  if (category) {
    where.categoryId = category
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {}
    if (minPrice !== undefined) {
      where.price.gte = minPrice
    }
    if (maxPrice !== undefined) {
      where.price.lte = maxPrice
    }
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }

  where.siteId = process.env.SITE_ID

  // Build orderBy clause
  const orderBy: Record<string, 'asc' | 'desc'> = {}
  orderBy[sortBy] = sortOrder

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true
      }
    })

    console.log(`✅ Fetched ${products.length} products from database`)
    return products as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  console.log('🔄 Fetching product by ID from database...', id, new Date().toISOString())
  
  try {
    const product = await prisma.product.findUnique({
      where: { id, siteId: process.env.SITE_ID },
      include: {
        category: true
      }
    })

    console.log('✅ Fetched product:', product ? product.name : 'Not found')
    return product as Product;
  } catch (error) {
    console.error('Error fetching product:', error)
    return null;
  }
}

export async function getCategories() {
  console.log('🔄 Fetching categories from database...', new Date().toISOString())
  
  try {
    const categories = await prisma.category.findMany({
      where: {
        siteId: process.env.SITE_ID
      },
      orderBy: {
        name: 'asc'
      }
    })

    console.log(`✅ Fetched ${categories.length} categories from database`)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
        isActive: true,
        siteId: process.env.SITE_ID
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
} 