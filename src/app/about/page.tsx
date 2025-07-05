import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAboutInfo } from "@/lib/about";
import { 
  Heart, 
  Users, 
  ShoppingBag, 
  Recycle, 
  Award, 
  Mail,
  Phone,
  Globe
} from "lucide-react";

export default async function AboutPage() {
  // Fetch data from database
  const aboutInfo = await getAboutInfo()

  // Default content if no database data exists
  const defaultAbout = {
    title: "Our Story",
    content: "Founded in 2020, Thrifted Treasures was born from a simple belief: beautiful, quality fashion should be accessible to everyone while protecting our planet. What started as a small passion project has grown into a thriving community of conscious consumers who believe in the power of sustainable fashion.",
    mission: "To make sustainable fashion accessible by offering high-quality, pre-owned clothing and accessories at affordable prices while reducing textile waste and environmental impact.",
    vision: "A world where fashion is circular, sustainable, and inclusive - where every person can express their unique style without compromising the planet's future.",
    values: ["Quality", "Sustainability", "Inclusivity", "Community"]
  }

  const about = aboutInfo || defaultAbout
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-50 to-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              {about.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              {about.content}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                <Link href="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Our Collection
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our mission, vision, and values guide everything we do, from the products we curate 
              to the relationships we build with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {about.mission}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {about.vision}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {Array.isArray(about.values) ? about.values.join(', ') : about.values}. We believe 
                  in building lasting relationships with our customers and 
                  supporting ethical fashion practices.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Impact
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Together with our community, we&apos;re making a real difference in sustainable fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">10,000+</div>
              <div className="text-slate-600">Items Rescued</div>
              <div className="text-sm text-slate-500 mt-1">From ending up in landfills</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">5,000+</div>
              <div className="text-slate-600">Happy Customers</div>
              <div className="text-sm text-slate-500 mt-1">Across the country</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">3 Years</div>
              <div className="text-slate-600">In Business</div>
              <div className="text-sm text-slate-500 mt-1">Since 2020</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-slate-600">Satisfaction Rate</div>
              <div className="text-sm text-slate-500 mt-1">Based on customer reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The passionate people behind Thrifted Treasures who make sustainable fashion accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-slate-400" />
                </div>
                <CardTitle>Sarah Johnson</CardTitle>
                <CardDescription>Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Sarah founded Thrifted Treasures with a vision to make sustainable fashion 
                  accessible. With 10 years in fashion retail, she brings expertise in 
                  curating quality pieces.
                </p>
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-slate-400" />
                </div>
                <CardTitle>Michael Chen</CardTitle>
                <CardDescription>Head of Operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Michael ensures our operations run smoothly, from inventory management 
                  to customer service. His attention to detail keeps our quality standards high.
                </p>
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-slate-400" />
                </div>
                <CardTitle>Emily Rodriguez</CardTitle>
                <CardDescription>Style Curator</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Emily has an eye for unique pieces and timeless style. She curates our 
                  collection to ensure every item meets our standards for quality and fashion.
                </p>
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Recycle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Commitment to Sustainability
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Environmental Impact</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Diverting thousands of items from landfills annually</li>
                  <li>• Reducing textile waste in the fashion industry</li>
                  <li>• Promoting circular fashion economy</li>
                  <li>• Carbon-neutral shipping options</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Quality Assurance</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Rigorous quality inspection process</li>
                  <li>• Professional cleaning and conditioning</li>
                  <li>• Accurate condition descriptions</li>
                  <li>• 30-day satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Discover unique pieces, support sustainable fashion, and be part of a movement 
              that&apos;s making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                <Link href="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 