import { prisma } from './prisma'

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
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
  const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof typeof hours
  const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
  
  const dayHours = hours[day]
  if (!dayHours) return false
  
  return currentTime >= dayHours.open && currentTime <= dayHours.close
} 