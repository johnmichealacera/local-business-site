import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json()
    
    // Optional: Add a secret key for security in production
    if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }
    
    // Revalidate specific paths or all paths
    if (path) {
      revalidatePath(path)
      console.log(`🔄 Revalidated path: ${path}`)
    } else {
      // Revalidate all product-related pages
      revalidatePath('/products')
      revalidatePath('/about')
      revalidatePath('/contact')
      revalidatePath('/')
      console.log('🔄 Revalidated all main pages')
    }
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: new Date().toISOString(),
      path: path || 'all pages'
    })
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
  }
} 