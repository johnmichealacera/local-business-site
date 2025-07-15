import { Header } from './header'
import { Footer } from './footer'
import { getSiteInfo } from '@/lib/site'
import { getContactInfo } from '@/lib/contact'
import { ColorProvider } from '@/contexts/color-context'
import { parseColorPalette, lightenColor } from '@/lib/colors'

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
  const parsedPalette = parseColorPalette(colorPalette)
  
  // Create a very light tint of the primary color for background
  const backgroundStyle = {
    backgroundColor: lightenColor(parsedPalette.primary, 95), // 95% lighter for subtle branding
  }
  
  return (
    <ColorProvider colorPalette={colorPalette}>
      <div className="min-h-screen flex flex-col" style={backgroundStyle}>
        <Header siteName={siteName} logoUrl={logoUrl} features={siteInfo?.features || []} featuresOrder={siteInfo?.featuresOrder || []} />
        <main className="flex-1">
          {children}
        </main>
        <Footer siteName={siteName} logoUrl={logoUrl} contactInfo={contactInfo} features={siteInfo?.features || []} featuresOrder={siteInfo?.featuresOrder || []} />
      </div>
    </ColorProvider>
  )
} 