import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { CategoryProducts } from '@/components/product/category-products'
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton'
import { CATEGORIES, ROUTES } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'
import { slugToTitle } from '@/lib/format'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  const title = category?.label ?? slugToTitle(slug)

  return createPageMetadata({
    title,
    description: `Shop ${title} at HIRU Elegance — timeless luxury womenswear.`,
    path: `/category/${slug}`,
  })
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={category.label}
        description={`Explore our ${category.label.toLowerCase()} — refined silhouettes and premium fabrics.`}
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Collections', href: ROUTES.collections },
          { label: category.label },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <Suspense
          key={`${slug}-${page}`}
          fallback={<ProductGridSkeleton count={12} />}
        >
          <CategoryProducts
            slug={slug}
            page={page}
            emptyMessage={`No products in ${category.label} yet. Check back soon.`}
          />
        </Suspense>
      </section>
    </>
  )
}
