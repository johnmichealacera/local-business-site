import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      siteId,
      bookingTitle,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      venueName,
      address,
      city,
      province,
      country,
      zipCode,
      maxAttendees,
      contactName,
      contactEmail,
      contactPhone
    } = body

    // Validate required fields
    if (!siteId || !bookingTitle || !description || !startDate || !startTime || 
        !endDate || !endTime || !venueName || !address || !city || !province || 
        !country || !zipCode || !maxAttendees || !contactName || !contactPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create event using Prisma
    const event = await prisma.event.create({
      data: {
        siteId,
        title: bookingTitle,
        description: `${description}\n\nContact: ${contactName}\nPhone: ${contactPhone}${contactEmail ? `\nEmail: ${contactEmail}` : ''}`,
        startDate: new Date(`${startDate}T${startTime}`),
        endDate: new Date(`${endDate}T${endTime}`),
        location: venueName,
        address,
        city,
        province,
        country,
        zipCode,
        maxAttendees,
        contactEmail,
        contactName,
        contactPhone
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Event submitted successfully',
      event: {
        id: event.id,
        title: event.title,
        createdAt: event.createdAt
      }
    })

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const siteId = process.env.SITE_ID

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID not configured' },
        { status: 500 }
      )
    }

    const events = await prisma.event.findMany({
      where: {
        siteId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      events
    })

  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 