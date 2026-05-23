import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Phone } from 'lucide-react'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description: 'Get in touch with HIRU Elegance — styling advice, orders, and partnerships.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        description="We would love to hear from you. Our team typically responds within 24 hours."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Contact' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-[oklch(0.55_0.04_55)]" strokeWidth={1.5} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.55_0.04_55)]">Visit</p>
                <p className="mt-2 font-light text-[oklch(0.35_0.03_50)]">Mumbai, Maharashtra, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-[oklch(0.55_0.04_55)]" strokeWidth={1.5} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.55_0.04_55)]">Call</p>
                <p className="mt-2 font-light text-[oklch(0.35_0.03_50)]">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-[oklch(0.55_0.04_55)]" strokeWidth={1.5} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.55_0.04_55)]">Email</p>
                <p className="mt-2 font-light text-[oklch(0.35_0.03_50)]">hello@hiruelegance.com</p>
              </div>
            </div>
          </div>

          <form
            className="space-y-6 border border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)] p-8 md:p-10"
            action="#"
            method="post"
          >
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" name="name" required className="mt-2 rounded-none" />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" name="email" type="email" required className="mt-2 rounded-none" />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" name="message" rows={5} required className="mt-2 rounded-none" />
            </div>
            <Button
              type="submit"
              className="w-full rounded-none py-6 text-[10px] uppercase tracking-[0.3em]"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
