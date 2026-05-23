import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { SearchForm } from '@/components/search/search-form'
import { SearchResults } from '@/components/search/search-results'
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Search',
  description: 'Search HIRU Elegance for dresses, co-ords, ethnic wear, and accessories.',
  path: '/search',
})

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  return (
    <>
      <PageHeader
        eyebrow="Discover"
        title="Search"
        description="Find your next signature piece."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Search' },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <SearchForm defaultQuery={query} />

        {query ? (
          <Suspense key={query} fallback={<ProductGridSkeleton count={8} />}>
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <p className="mt-12 text-sm font-light text-[oklch(0.50_0.03_55)]">
            Enter a keyword to search our collection.
          </p>
        )}
      </section>
    </>
  )
}
