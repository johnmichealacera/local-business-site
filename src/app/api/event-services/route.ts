import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const siteId = process.env.SITE_ID

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID not configured' },
        { status: 500 }
      )
    }

    const eventServices = await prisma.eventService.findMany({
      where: {
        siteId,
        isActive: true
      },
      include: {
        servicePackages: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      eventServices
    })

  } catch (error) {
    console.error('Error fetching event services:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 