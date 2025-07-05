import { getContactInfo } from "@/lib/about";
import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  MessageCircle,
  Building,
  Globe
} from "lucide-react";

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  
  // Default contact info if no database data exists
  const defaultContact = {
    businessName: "Thrifted Treasures",
    email: "hello@thriftedtreasures.com",
    phone: "(555) 123-4567",
    address: "123 Thrift St",
    city: "Fashion City",
    state: "FC",
    zipCode: "12345",
    country: "United States",
    socialLinks: {
      facebook: "https://facebook.com/thriftedtreasures",
      instagram: "https://instagram.com/thriftedtreasures",
      twitter: "https://twitter.com/thriftedtreasures"
    }
  };

  const contact = contactInfo || defaultContact;
  const socialLinks = typeof contact.socialLinks === 'object' ? contact.socialLinks : defaultContact.socialLinks;

  // Format full address
  const fullAddress = [
    contact.address,
    contact.city,
    contact.state && contact.zipCode ? `${contact.state} ${contact.zipCode}` : contact.state || contact.zipCode,
    contact.country
  ].filter(Boolean).join(', ');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              We&apos;d love to hear from you! Whether you have questions about our products, 
              need help with an order, or want to learn more about sustainable fashion, 
              we&apos;re here to help.
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

                {/* Business Hours */}
                <Card>
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
                </Card>
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
                <div className="flex space-x-4">
                  {socialLinks?.facebook && (
                    <a 
                      href={socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-slate-600" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a 
                      href={socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-slate-600" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a 
                      href={socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-slate-600" />
                    </a>
                  )}
                  {/* Default social links if none in database */}
                  {(!socialLinks.facebook && !socialLinks.instagram && !socialLinks.twitter) && (
                    <>
                      <a 
                        href="#" 
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <Facebook className="w-5 h-5 text-slate-600" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <Instagram className="w-5 h-5 text-slate-600" />
                      </a>
                      <a 
                        href="#" 
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-slate-600" />
                      </a>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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
                  We offer free standard shipping on orders over $50. Express shipping is available 
                  for faster delivery. All orders are carefully packaged to ensure safe arrival.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 