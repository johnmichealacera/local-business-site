'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { Site } from '@/types/site'
import { parseColorPalette, generateDynamicGradientStyle } from '@/lib/colors'
import { useState } from 'react'

interface HeroProps {
  siteInfo: Site | null
  defaultCTA?: {
    text: string
    href: string
  }
}

export function Hero({ siteInfo, defaultCTA = { text: "Get Started", href: "/about" } }: HeroProps) {
  const [videoError, setVideoError] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#3B82F6', '#10B981', '#F59E0B'])
  
  // Hero content with fallbacks
  const heroTitle = siteInfo?.hero?.title || `Welcome to ${siteInfo?.name || 'Our Platform'}`
  const heroSubtitle = siteInfo?.hero?.subtitle || "Experience Excellence"
  const heroDescription = siteInfo?.hero?.description || 
    "Discover amazing products, services, and experiences that make a difference in your life."
  const heroCTAButton = siteInfo?.hero?.ctaButton || defaultCTA.text
  const heroCTALink = siteInfo?.hero?.ctaLink || defaultCTA.href
  const heroImageUrl = siteInfo?.hero?.imageUrl
  const heroVideoUrl = siteInfo?.hero?.videoUrl

  // Determine background media
  const hasVideo = heroVideoUrl && !videoError
  const hasImage = heroImageUrl && !hasVideo
  const useGradient = !hasVideo && !hasImage

  const handleVideoError = () => {
    setVideoError(true)
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      {hasVideo && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay={isVideoPlaying}
            muted
            loop
            playsInline
            onError={handleVideoError}
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {hasImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImageUrl})`
            }}
          ></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {useGradient && (
        <div 
          className="absolute inset-0 z-0"
          style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
        >
          {/* Background decoration elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30 animate-float"
              style={generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'light')}
            ></div>
            <div 
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-30 animate-float"
              style={{ 
                animationDelay: '1s',
                ...generateDynamicGradientStyle('to-br', colorPalette, 0.3, 'light')
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            {/* Subtitle Badge */}
            <div className="mb-6 animate-bounce-in">
              <div 
                className="inline-flex items-center rounded-full border-transparent px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: hasVideo || hasImage ? 'rgba(255, 255, 255, 0.2)' : colorPalette.primary + '20',
                  color: hasVideo || hasImage ? 'white' : colorPalette.primary,
                  backdropFilter: hasVideo || hasImage ? 'blur(10px)' : 'none'
                }}
              >
                {heroSubtitle}
              </div>
            </div>
            
            {/* Main Title */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up"
              style={{ 
                color: hasVideo || hasImage ? 'white' : colorPalette.secondary,
                textShadow: hasVideo || hasImage ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              {heroTitle}
            </h1>
            
            {/* Description */}
            <p 
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed"
              style={{ 
                animationDelay: '0.2s',
                color: hasVideo || hasImage ? 'white' : colorPalette.secondary,
                opacity: hasVideo || hasImage ? 0.9 : 0.8,
                textShadow: hasVideo || hasImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              {heroDescription}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href={heroCTALink}>
                <Button 
                  size="lg" 
                  className={`group ${hasVideo || hasImage ? 'bg-white text-gray-900 hover:bg-gray-100' : 'btn-primary'}`}
                >
                  {heroCTAButton}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {hasVideo && !isVideoPlaying && (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={toggleVideo}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play Video
                </Button>
              )}
              
              {!hasVideo && (
                <Link href="/about">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className={hasVideo || hasImage ? 'border-white/50 text-white hover:bg-white/20 backdrop-blur-sm' : 'btn-secondary'}
                  >
                    Learn More
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{
            borderColor: hasVideo || hasImage ? 'rgba(255, 255, 255, 0.5)' : colorPalette.primary + '50'
          }}
        >
          <div 
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{
              backgroundColor: hasVideo || hasImage ? 'rgba(255, 255, 255, 0.8)' : colorPalette.primary
            }}
          ></div>
        </div>
      </div>
    </section>
  )
} 