import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'My Profile',
  description: 'Manage your HIRU Elegance account.',
  path: '/profile',
  noIndex: true,
})

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="My Profile"
        description="Profile and order history will load from the auth API once connected."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Profile' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-lg border border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)] p-10">
          <p className="text-sm font-light text-[oklch(0.50_0.03_55)] mb-8">
            Sign in to view orders, saved addresses, and wishlist sync.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-none tracking-[0.2em] uppercase text-[10px]">
              <Link href={ROUTES.login}>Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none tracking-[0.2em] uppercase text-[10px]">
              <Link href={ROUTES.register}>Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
