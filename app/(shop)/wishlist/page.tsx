import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Heart } from 'lucide-react'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Wishlist',
  description: 'Your saved HIRU Elegance pieces.',
  path: '/wishlist',
  noIndex: true,
})

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Saved"
        title="Wishlist"
        description="Pieces you love, saved for later."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Wishlist' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
        <Empty className="border border-dashed border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)] py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Heart className="h-6 w-6" strokeWidth={1.5} />
            </EmptyMedia>
            <EmptyTitle className="font-serif text-2xl font-light">
              Your wishlist is empty
            </EmptyTitle>
            <EmptyDescription>
              Save items while browsing — they will appear here once connected to your account.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild className="rounded-none tracking-[0.2em] uppercase text-[10px]">
              <Link href={ROUTES.collections}>Explore Collections</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </section>
    </>
  )
}
