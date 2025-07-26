import { NextResponse } from 'next/server'
import { getSiteInfo } from '@/lib/site'

export async function GET() {
  try {
    const siteInfo = await getSiteInfo()
    return NextResponse.json(siteInfo)
  } catch (error) {
    console.error('Error fetching site info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site information' },
      { status: 500 }
    )
  }
} 