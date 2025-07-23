import { getContactInfo } from "@/lib/contact";
import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteInfo } from "@/lib/site";
import { parseColorPalette, generateDynamicGradientStyle } from "@/lib/colors";
import { 
  Mail, 
  Phone, 
  MapPin,
  Building,
  Globe
} from "lucide-react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaLinkedin, 
  FaSpotify, 
  FaTiktok,
  FaGlobe
} from "react-icons/fa";
import { SiteFeature } from "@/types/site";

// Force dynamic rendering - this prevents caching and ensures fresh data
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const [contactInfo, siteInfo] = await Promise.all([
    getContactInfo(),
    getSiteInfo()
  ]);

  const colorPalette = parseColorPalette(siteInfo?.colorPalette || ['#F59E0B', '#000000', '#FFFFFF']);
  
  // Default contact info if no database data exists
  const defaultContact = {
    businessName: "Thrifted Treasures",
    email: "hello@thriftedtreasures.com",
    phone: "09123456789",
    address: "Bingkahan",
    city: "Manticao",
    province: "Misamis Oriental",
    zipCode: "9000",
    country: "Philippines",
    socialLinks: {
      facebook: "https://facebook.com/thriftedtreasures",
      instagram: "https://instagram.com/thriftedtreasures",
      twitter: "https://twitter.com/thriftedtreasures",
      youtube: "https://youtube.com/@thriftedtreasures",
      spotify: "https://open.spotify.com/user/thriftedtreasures",
      linkedin: "https://linkedin.com/company/thriftedtreasures",
      tiktok: "https://tiktok.com/@thriftedtreasures",
      website: "https://thriftedtreasures.com"
    }
  };

  const contact = contactInfo || defaultContact;
  const socialLinks = typeof contact.socialLinks === 'object' ? contact.socialLinks : defaultContact.socialLinks;

  // Format full address
  const fullAddress = [
    contact.address,
    contact.city,
    contact.province && contact.zipCode ? `${contact.province} ${contact.zipCode}` : contact.province || contact.zipCode,
    contact.country
  ].filter(Boolean).join(', ');
  const contactDescription = siteInfo?.features?.find((feature) => feature.name === SiteFeature.CONTACT)?.description;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative py-16 px-4 sm:px-6 lg:px-8"
        style={generateDynamicGradientStyle('to-r', colorPalette, 0.1, 'light')}
      >
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              {contactDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-slate-600">
                Have a question or feedback? Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {/* Business Name */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-slate-600" />
                      <CardTitle className="text-lg">{contact.businessName}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>

                {/* Email */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <div>
                        <CardTitle className="text-lg">Email</CardTitle>
                        <CardDescription className="text-base">
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-slate-900 hover:text-slate-700 transition-colors"
                          >
                            {contact.email}
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Phone */}
                {contact.phone && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-slate-600" />
                        <div>
                          <CardTitle className="text-lg">Phone</CardTitle>
                          <CardDescription className="text-base">
                            <a 
                              href={`tel:${contact.phone}`}
                              className="text-slate-900 hover:text-slate-700 transition-colors"
                            >
                              {contact.phone}
                            </a>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )}

                {/* Address */}
                {contact.address && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-slate-600" />
                        <div>
                          <CardTitle className="text-lg">Address</CardTitle>
                          <CardDescription className="text-base">
                            <a 
                              href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-900 hover:text-slate-700 transition-colors"
                            >
                              {fullAddress}
                            </a>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )}

{/* TODO: Add business hours */}
                {/* Business Hours */}
                {/* <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-slate-600" />
                      <div>
                        <CardTitle className="text-lg">Business Hours</CardTitle>
                        <CardDescription className="text-base">
                          <span className="block">
                            Monday - Friday: 9:00 AM - 7:00 PM<br />
                            Saturday: 10:00 AM - 6:00 PM<br />
                            Sunday: 12:00 PM - 5:00 PM
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card> */}
              </div>
            </div>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Follow Us</span>
                </CardTitle>
                <CardDescription>
                  Stay connected with us on social media for updates and behind-the-scenes content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
                  {socialLinks?.facebook && (
                    <a 
                      href={socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.instagram && (
                    <a 
                      href={socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.twitter && (
                    <a 
                      href={socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.youtube && (
                    <a 
                      href={socialLinks.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.spotify && (
                    <a 
                      href={socialLinks.spotify} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaSpotify className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.linkedin && (
                    <a 
                      href={socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.tiktok && (
                    <a 
                      href={socialLinks.tiktok} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {socialLinks?.website && (
                    <a 
                      href={socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: colorPalette.primary + '20',
                        color: colorPalette.primary
                      }}
                    >
                      <FaGlobe className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {/* Default social links if none in database */}
                  {(!socialLinks?.facebook && !socialLinks?.instagram && !socialLinks?.twitter && !socialLinks?.youtube && !socialLinks?.spotify && !socialLinks?.linkedin && !socialLinks?.tiktok && !socialLinks?.website) && (
                    <>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaSpotify className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.primary + '20',
                          color: colorPalette.primary
                        }}
                      >
                        <FaGlobe className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

{/* Not needed for now */}
      {/* FAQ Section */}
      {/* <section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: colorPalette.tertiary,
          backgroundImage: `linear-gradient(135deg, ${colorPalette.primary}05, ${colorPalette.tertiary})`
        }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colorPalette.secondary }}>
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: colorPalette.secondary, opacity: 0.8 }}>
              Find answers to common questions about our products, services, and policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>What condition are the items in?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All our items are carefully inspected and graded for quality. We provide detailed 
                  condition descriptions and photos for each item, and we only sell items that 
                  meet our high standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Do you offer returns?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Yes! We offer a 30-day return policy for items that don&apos;t meet your expectations. 
                  Items must be in the same condition as received, with original tags if applicable.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>How do you ensure authenticity?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our team includes experienced fashion professionals who authenticate every designer 
                  and luxury item. We guarantee the authenticity of all items sold on our platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>What are your shipping options?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We offer free standard shipping on orders over ₱2,500. Express shipping is available 
                  for faster delivery. All orders are carefully packaged to ensure safe arrival.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  );
} 