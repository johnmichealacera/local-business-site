'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  googleAnalyticsTag?: string
}

export function GoogleAnalytics({ googleAnalyticsTag }: GoogleAnalyticsProps) {
  // Only render if googleAnalyticsTag exists and is not undefined
  if (!googleAnalyticsTag) {
    console.log('🔍 Google Analytics: No tag provided, skipping initialization')
    return null
  }

  // Validate the Google Analytics tag format (should start with G-)
  if (!googleAnalyticsTag.startsWith('G-')) {
    console.warn('⚠️ Google Analytics: Invalid tag format. Expected format: G-XXXXXXXXXX')
    return null
  }

  console.log('📊 Google Analytics: Initializing with tag:', googleAnalyticsTag)

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTag}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Google Analytics: Script loaded successfully')
        }}
        onError={() => {
          console.error('❌ Google Analytics: Failed to load script')
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsTag}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
          
          // Track page views on route changes
          if (typeof window !== 'undefined') {
            window.addEventListener('popstate', function() {
              gtag('config', '${googleAnalyticsTag}', {
                page_title: document.title,
                page_location: window.location.href
              });
            });
          }
        `}
      </Script>
    </>
  )
} 