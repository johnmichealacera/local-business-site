import { prisma } from './prisma'

export async function getAboutInfo() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return about
  } catch (error) {
    console.error('Error fetching about info:', error)
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContactInfo(): Promise<any | null> {
  try {
    const contact = await prisma.contact.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return contact
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
} 