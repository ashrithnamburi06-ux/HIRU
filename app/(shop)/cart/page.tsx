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
import { ShoppingBag } from 'lucide-react'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Shopping Bag',
  description: 'Review items in your HIRU Elegance shopping bag.',
  path: '/cart',
  noIndex: true,
})

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Bag"
        title="Shopping Bag"
        description="Review your selections before checkout."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Bag' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
        <Empty className="border border-dashed border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)] py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
            </EmptyMedia>
            <EmptyTitle className="font-serif text-2xl font-light">
              Your bag is empty
            </EmptyTitle>
            <EmptyDescription>
              Cart state will sync with the backend once authentication and cart APIs are connected.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-none tracking-[0.2em] uppercase text-[10px]">
              <Link href={ROUTES.collections}>Continue Shopping</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </section>
    </>
  )
}
