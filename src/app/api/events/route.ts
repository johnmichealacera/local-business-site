import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const siteId = process.env.SITE_ID;
    const {
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
      contactPhone,
      selectedPackageId
    } = body

    // Validate required fields
    if (!siteId || !bookingTitle || !description || !contactName || !contactPhone) {
      return NextResponse.json(
        { error: 'Missing required fields: Event title, description, contact name, and phone number are required' },
        { status: 400 }
      )
    }

    // Create event using Prisma
    const event = await prisma.event.create({
      data: {
        siteId,
        title: bookingTitle,
        description: `${description}\n\nContact: ${contactName}\nPhone: ${contactPhone}${contactEmail ? `\nEmail: ${contactEmail}` : ''}`,
        startDate: startDate && startTime ? new Date(`${startDate}T${startTime}`) : new Date(),
        endDate: endDate && endTime ? new Date(`${endDate}T${endTime}`) : null,
        location: venueName || null,
        address: address || null,
        city: city || null,
        province: province || null,
        country: country || null,
        zipCode: zipCode || null,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
        contactEmail,
        contactName,
        contactPhone,
        eventServicePackageId: selectedPackageId || null
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
      include: {
        eventServicePackage: {
          include: {
            eventService: true
          }
        }
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