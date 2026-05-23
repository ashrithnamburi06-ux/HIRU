import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Checkout',
  description: 'Complete your HIRU Elegance order.',
  path: '/checkout',
  noIndex: true,
})

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Secure Checkout"
        title="Checkout"
        description="Enter your details to complete your order. Payment integration ready for backend connection."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Bag', href: ROUTES.cart },
          { label: 'Checkout' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <form className="space-y-8" action="#" method="post">
            <div>
              <h2 className="font-serif text-2xl font-light text-[oklch(0.22_0.02_50)] mb-6">
                Contact
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required className="mt-2 rounded-none" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" className="mt-2 rounded-none" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-light text-[oklch(0.22_0.02_50)] mb-6">
                Shipping Address
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required className="mt-2 rounded-none" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required className="mt-2 rounded-none" />
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" name="pincode" required className="mt-2 rounded-none" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-none py-6 text-[10px] uppercase tracking-[0.3em]"
              disabled
            >
              Place Order (Connect Payment API)
            </Button>
          </form>

          <aside className="border border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)] p-8 h-fit">
            <h2 className="font-serif text-2xl font-light mb-6">Order Summary</h2>
            <p className="text-sm font-light text-[oklch(0.50_0.03_55)]">
              Order totals will populate from your cart once the checkout API is connected.
            </p>
            <Button asChild variant="link" className="mt-6 px-0 text-[oklch(0.40_0.04_55)]">
              <Link href={ROUTES.cart}>Return to bag</Link>
            </Button>
          </aside>
        </div>
      </section>
    </>
  )
}
