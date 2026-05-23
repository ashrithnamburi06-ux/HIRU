import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { FeaturedCollectionSection } from '@/components/featured-collection-section'
import { FeaturedProducts } from '@/components/product/featured-products'
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES, CATEGORIES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Collections',
  description: 'Explore curated edits and seasonal collections from HIRU Elegance.',
  path: '/collections',
})

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Curated Edits"
        title="Collections"
        description="Discover seasonal edits and signature collections crafted for quiet luxury."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Collections' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={ROUTES.category(category.slug)}
              className="group border border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)] p-8 transition-colors hover:border-[oklch(0.65_0.06_55)]"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.55_0.04_55)]">
                Shop
              </p>
              <h2 className="mt-4 font-serif text-2xl font-light text-[oklch(0.22_0.02_50)]">
                {category.label}
              </h2>
              <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[oklch(0.40_0.04_55)] group-hover:gap-3 transition-all">
                Explore
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedCollectionSection />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 pb-24">
        <h2 className="mb-12 font-serif text-3xl font-light text-[oklch(0.22_0.02_50)]">
          Featured Pieces
        </h2>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <FeaturedProducts limit={8} />
        </Suspense>
      </section>
    </>
  )
}
