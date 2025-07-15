import { Header } from './header'
import { Footer } from './footer'
import { getSiteInfo } from '@/lib/site'
import { getContactInfo } from '@/lib/contact'

interface MainLayoutProps {
  children: React.ReactNode
}

export async function MainLayout({ children }: MainLayoutProps) {
  const [siteInfo, contactInfo] = await Promise.all([
    getSiteInfo(),
    getContactInfo()
  ])
  
  const siteName = siteInfo?.name || 'Thrifted Treasures'
  const logoUrl = siteInfo?.logoUrl
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName={siteName} logoUrl={logoUrl} features={siteInfo?.features || []} featuresOrder={siteInfo?.featuresOrder || []} />
      <main className="flex-1">
        {children}
      </main>
      <Footer siteName={siteName} logoUrl={logoUrl} contactInfo={contactInfo} features={siteInfo?.features || []} featuresOrder={siteInfo?.featuresOrder || []} />
    </div>
  )
} 