import { prisma } from './prisma'

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactInfo {
  id: string
  businessName: string
  email: string
  phone?: string
  address?: string
  city?: string
  province?: string
  zipCode?: string
  country?: string
  socialLinks?: Record<string, string> | null
  createdAt: Date
  updatedAt: Date
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  console.log('🔄 Fetching contact info from database...', new Date().toISOString())
  
  const siteId = process.env.SITE_ID
  
  if (!siteId) {
    console.error('❌ SITE_ID environment variable is not set')
    return null
  }

  try {
    const contact = await prisma.contact.findFirst({
      where: { siteId }
    })

    console.log('✅ Fetched contact info:', contact ? contact.businessName : 'Not found')
    return contact as ContactInfo
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

export async function submitContactForm(data: ContactSubmission) {
  try {
    // For now, we'll just log the submission
    // In the future, you could create a ContactSubmission model in your database
    console.log('Contact form submission:', data)
    
    // TODO: Create a ContactSubmission model in Prisma schema and save to database
    // const submission = await prisma.contactSubmission.create({
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //     phone: data.phone,
    //     subject: data.subject,
    //     message: data.message,
    //     createdAt: new Date()
    //   }
    // })
    
    // For now, simulate successful submission
    return { success: true, message: 'Contact form submitted successfully' }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, message: 'Failed to submit contact form' }
  }
}

// Function to get business hours (could be stored in database in the future)
export function getBusinessHours() {
  return {
    monday: { open: '09:00', close: '19:00' },
    tuesday: { open: '09:00', close: '19:00' },
    wednesday: { open: '09:00', close: '19:00' },
    thursday: { open: '09:00', close: '19:00' },
    friday: { open: '09:00', close: '19:00' },
    saturday: { open: '10:00', close: '18:00' },
    sunday: { open: '12:00', close: '17:00' }
  }
}

// Function to check if business is currently open
export function isBusinessOpen() {
  const hours = getBusinessHours()
  const now = new Date()
  const day = now.toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof hours
  const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
  
  const dayHours = hours[day]
  if (!dayHours) return false
  
  return currentTime >= dayHours.open && currentTime <= dayHours.close
} 