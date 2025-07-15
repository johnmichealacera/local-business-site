'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {submitStatus === 'success' && (
        <Card className="mb-6 border-2" style={{ backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' }}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3" style={{ color: 'var(--color-primary)' }}>
              <CheckCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Message sent successfully!</h3>
                <p className="text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6">
          <div className="flex items-center space-x-3 p-4 rounded-md" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B' }}>
            <AlertCircle className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Error sending message</h3>
              <p className="text-sm">Please try again or contact us directly.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ 
              borderColor: 'var(--color-secondary-light)'
            }}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ 
              borderColor: 'var(--color-secondary-light)'
            }}
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ 
              borderColor: 'var(--color-secondary-light)',
            }}
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ 
              borderColor: 'var(--color-secondary-light)',
            }}
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="product">Product Question</option>
            <option value="order">Order Support</option>
            <option value="return">Returns & Exchanges</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent resize-none"
            style={{ 
              borderColor: 'var(--color-secondary-light)'
            }}
            placeholder="Tell us how we can help you..."
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-white font-semibold"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="ml-2">Sending...</span>
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-center" style={{ color: 'var(--color-secondary)', opacity: 0.6 }}>
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </div>
      </form>
    </div>
  )
} 