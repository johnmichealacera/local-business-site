import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSiteInfo } from "@/lib/site";
import { parseColorPalette, generateDynamicGradientStyle } from "@/lib/colors";
import { 
  Leaf, 
  Shield, 
  Heart, 
  Users
} from "lucide-react";

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const siteInfo = await getSiteInfo();
  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF']);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={generateDynamicGradientStyle('to-br', colorPalette, 0.1, 'light')}
      >
        <div className="container mx-auto">
          <Badge 
            variant="outline" 
            className="mb-4 border-2"
            style={{
              borderColor: colorPalette.primary,
              color: colorPalette.primary,
              backgroundColor: colorPalette.primary + '10'
            }}
          >
            About Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: colorPalette.secondary }}>
            Sustainable Fashion for Everyone
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
            We believe that great style shouldn&apos;t come at the cost of our planet. 
            Our mission is to make sustainable fashion accessible, affordable, and absolutely beautiful.
          </p>
          <Button 
            size="lg" 
            className="text-white font-semibold"
            style={{
              backgroundColor: colorPalette.secondary,
              borderColor: colorPalette.secondary
            }}
          >
            Join Our Mission
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colorPalette.secondary }}>
              Our Mission
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              We&apos;re committed to creating a more sustainable future through fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Leaf className="w-8 h-8" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Every purchase helps reduce textile waste and supports circular fashion economy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Shield className="w-8 h-8" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Each item is carefully inspected and authenticated to ensure premium quality.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Heart className="w-8 h-8" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  We build lasting relationships with our customers and support local communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
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
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colorPalette.secondary }}>
              Meet Our Team
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              Passionate individuals working together to revolutionize sustainable fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Users className="w-12 h-12" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Sarah Johnson</CardTitle>
                <p className="text-sm font-medium" style={{ color: colorPalette.primary }}>Founder & CEO</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Former fashion buyer with 10+ years experience in sustainable fashion and circular economy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Users className="w-12 h-12" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Mike Chen</CardTitle>
                <p className="text-sm font-medium" style={{ color: colorPalette.primary }}>Head of Operations</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Supply chain expert ensuring quality and authenticity in every piece we offer.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div 
                  className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colorPalette.primary + '20',
                    color: colorPalette.primary
                  }}
                >
                  <Users className="w-12 h-12" />
                </div>
                <CardTitle style={{ color: colorPalette.secondary }}>Emma Davis</CardTitle>
                <p className="text-sm font-medium" style={{ color: colorPalette.primary }}>Community Manager</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
                  Building connections with our community and spreading awareness about sustainable fashion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
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
      </section>
    </div>
  );
} 