import { Header } from './header'
import { Footer } from './footer'
import { getSiteInfo } from '@/lib/site'
import { getContactInfo } from '@/lib/contact'
import { ColorProvider } from '@/contexts/color-context'

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
  const colorPalette = siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF']
  
  return (
    <ColorProvider colorPalette={colorPalette}>
      <div className="min-h-screen flex flex-col">
        <Header siteName={siteName} logoUrl={logoUrl} features={siteInfo?.features || []} featuresOrder={siteInfo?.featuresOrder || []} />
        <main className="flex-1">
          {children}
        </main>
        <Footer siteName={siteName} logoUrl={logoUrl} contactInfo={contactInfo} features={siteInfo?.features || []} featuresOrder={siteInfo?.featuresOrder || []} />
      </div>
    </ColorProvider>
  )
} 