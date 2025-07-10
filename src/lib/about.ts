import { prisma } from './prisma'

export async function getAboutInfo() {
  console.log('🔄 Fetching about info from database...', new Date().toISOString())
  
  try {
    const about = await prisma.about.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    console.log('✅ Fetched about info:', about ? 'Found' : 'Using defaults')
    return about
  } catch (error) {
    console.error('Error fetching about info:', error)
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContactInfo(): Promise<any | null> {
  console.log('🔄 Fetching contact info from database...', new Date().toISOString())
  
  try {
    const contact = await prisma.contact.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    console.log('✅ Fetched contact info:', contact ? 'Found' : 'Using defaults')
    return contact
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
} 