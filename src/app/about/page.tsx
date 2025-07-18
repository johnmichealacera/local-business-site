import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSiteInfo } from "@/lib/site";
import { parseColorPalette } from "@/lib/colors";
import { 
  Leaf, 
  Globe, 
  Heart,
  ArrowRight,
} from "lucide-react";
import { getAboutInfo } from "@/lib/about";
import Image from "next/image";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const siteInfo = await getSiteInfo();
  const aboutInfo = await getAboutInfo()
  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF']);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Image */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={siteInfo?.hero?.imageUrl || '/about-hero.jpg'}
            alt="About Us Hero"
            fill
            className="object-cover scale-105"
            priority
            quality={90}
          />
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${colorPalette.primary}40 0%, ${colorPalette.secondary}20 50%, ${colorPalette.tertiary}60 100%)`
            }}
          ></div>
          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-20 animate-float"
              style={{ backgroundColor: colorPalette.primary }}
            ></div>
            <div 
              className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-20 animate-float"
              style={{ 
                backgroundColor: colorPalette.secondary,
                animationDelay: '1s'
              }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              {/* Enhanced Badge */}
              <div className="mb-6 animate-bounce-in">
                <Badge 
                  variant="outline" 
                  className="border-2 backdrop-blur-sm bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  About Our Story
                </Badge>
              </div>
              
              {/* Enhanced Title */}
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up text-white hover-scale transition-transform duration-500"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  background: `linear-gradient(135deg, white 0%, ${colorPalette.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {aboutInfo?.title || 'About Our Story'}
              </h1>
              
              {/* Enhanced Description */}
              <p 
                className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed text-white/90"
                style={{ 
                  animationDelay: '0.2s',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {aboutInfo?.content || 'We believe that great style shouldn&apos;t come at the cost of our planet. Our mission is to make sustainable fashion accessible, affordable, and absolutely beautiful.'}
              </p>
              
              {/* Enhanced CTA Button */}
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="group bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full flex justify-center border-white/50">
            <div className="w-1 h-3 rounded-full mt-2 animate-pulse bg-white/80"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission, Vision, Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-20 right-20 w-64 h-64 rounded-full"
            style={{ backgroundColor: colorPalette.primary }}
          ></div>
          <div 
            className="absolute bottom-20 left-20 w-48 h-48 rounded-full"
            style={{ backgroundColor: colorPalette.secondary }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <Badge 
              variant="outline" 
              className="mb-4 border-2"
              style={{
                borderColor: colorPalette.primary,
                color: colorPalette.primary,
                backgroundColor: colorPalette.primary + '10'
              }}
            >
              Our Core Values
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: colorPalette.secondary }}>
              What Drives Us
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              Our mission, vision, and values guide everything we do, from the products we curate 
              to the relationships we build with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="text-center card-enhanced animate-fade-in hover-lift" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-6">
                <div 
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 hover-scale transition-transform duration-300"
                  style={{
                    backgroundColor: colorPalette.primary + '15',
                    color: colorPalette.primary,
                    boxShadow: `0 8px 32px ${colorPalette.primary}20`
                  }}
                >
                  <Leaf className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl" style={{ color: colorPalette.secondary }}>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  {aboutInfo?.mission}
                </p>
              </CardContent>
            </Card>
            
            {/* Vision */}
            <Card className="text-center card-enhanced animate-fade-in hover-lift" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-6">
                <div 
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 hover-scale transition-transform duration-300"
                  style={{
                    backgroundColor: colorPalette.primary + '15',
                    color: colorPalette.primary,
                    boxShadow: `0 8px 32px ${colorPalette.primary}20`
                  }}
                >
                  <Globe className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl" style={{ color: colorPalette.secondary }}>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  {aboutInfo?.vision}
                </p>
              </CardContent>
            </Card>
            
            {/* Values */}
            <Card className="text-center card-enhanced animate-fade-in hover-lift" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-6">
                <div 
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 hover-scale transition-transform duration-300"
                  style={{
                    backgroundColor: colorPalette.primary + '15',
                    color: colorPalette.primary,
                    boxShadow: `0 8px 32px ${colorPalette.primary}20`
                  }}
                >
                  <Heart className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl" style={{ color: colorPalette.secondary }}>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  {Array.isArray(aboutInfo?.values) ? aboutInfo?.values.join(', ') : aboutInfo?.values}. We believe 
                  in building lasting relationships with our customers and 
                  supporting ethical practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: colorPalette.tertiary,
          backgroundImage: `linear-gradient(135deg, ${colorPalette.primary}05, ${colorPalette.tertiary})`
        }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colorPalette.secondary }}>
            Our Impact
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            Numbers that tell our story of sustainable fashion and community impact
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: colorPalette.secondary }}>10,000+</div>
              <div style={{ color: colorPalette.secondary, opacity: 0.8 }}>Items Rescued</div>
              <div className="text-sm mt-1" style={{ color: colorPalette.secondary, opacity: 0.6 }}>From ending up in landfills</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: colorPalette.secondary }}>5,000+</div>
              <div style={{ color: colorPalette.secondary, opacity: 0.8 }}>Happy Customers</div>
              <div className="text-sm mt-1" style={{ color: colorPalette.secondary, opacity: 0.6 }}>Across the country</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: colorPalette.secondary }}>3 Years</div>
              <div style={{ color: colorPalette.secondary, opacity: 0.8 }}>In Business</div>
              <div className="text-sm mt-1" style={{ color: colorPalette.secondary, opacity: 0.6 }}>Since 2020</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: colorPalette.secondary }}>95%</div>
              <div style={{ color: colorPalette.secondary, opacity: 0.8 }}>Satisfaction Rate</div>
              <div className="text-sm mt-1" style={{ color: colorPalette.secondary, opacity: 0.6 }}>Based on customer reviews</div>
            </div>
          </div>
        </div>
      </section> */}


      {/* Not sure if we need this section */}
      {/* CTA Section */}
      {/* <section 
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colorPalette.secondary }}>
            Ready to Join the Movement?
          </h2>
          <p className="text-lg mb-8" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            Start your sustainable fashion journey today and make a positive impact on our planet.
          </p>
          <Button 
            size="lg" 
            className="text-white font-semibold"
            style={{
              backgroundColor: colorPalette.secondary,
              borderColor: colorPalette.secondary
            }}
          >
            Shop Now
          </Button>
        </div>
      </section> */}
    </div>
  );
} 