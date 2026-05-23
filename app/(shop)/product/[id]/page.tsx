import type { Metadata } from 'next'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { getProductImage, getProductPlaceholder } from '@/lib/images/resolve'
import { productImageSizes } from '@/lib/performance/images'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { getProduct } from '@/lib/api/products'
import { createPageMetadata } from '@/lib/seo'
import { formatPrice } from '@/lib/format'
import { ROUTES } from '@/lib/constants'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return createPageMetadata({
      title: 'Product Not Found',
      path: `/product/${id}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/product/${id}`,
  })
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const image = getProductImage(product)
  const displayPrice =
    product.discount > 0 && product.discountedPrice
      ? product.discountedPrice
      : product.price

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Collections', href: ROUTES.collections },
          {
            label: product.category,
            href: ROUTES.category(product.category),
          },
          { label: product.name },
        ]}
      />

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
            <OptimizedImage
              src={image}
              fallbackSrc={getProductPlaceholder(product.category, product._id)}
              alt={product.name}
              fill
              className="object-cover"
              sizes={productImageSizes}
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.55_0.04_55)]">
              {product.category}
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl font-extralight text-[oklch(0.22_0.02_50)]">
              {product.name}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <p className="text-xl font-light text-[oklch(0.30_0.03_50)]">
                {formatPrice(displayPrice)}
              </p>
              {product.discount > 0 && (
                <>
                  <p className="text-base font-light text-[oklch(0.65_0.02_55)] line-through">
                    {formatPrice(product.price)}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[oklch(0.55_0.15_25)]">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>

            {product.rating > 0 && (
              <p className="mt-3 text-sm font-light text-[oklch(0.50_0.03_55)]">
                Rated {product.rating.toFixed(1)} / 5
              </p>
            )}

            <p className="mt-8 text-sm font-light leading-relaxed text-[oklch(0.45_0.03_55)]">
              {product.description}
            </p>

            {product.sizes.length > 0 && (
              <div className="mt-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.45_0.03_55)] mb-4">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="min-w-[3rem] border border-[oklch(0.80_0.02_80)] px-4 py-2 text-xs tracking-wider text-[oklch(0.30_0.03_50)] hover:border-[oklch(0.40_0.04_55)] transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-6 text-xs font-light text-[oklch(0.50_0.03_55)]">
              {product.stock > 0
                ? `${product.stock} in stock — ships in 3–5 business days`
                : 'Currently out of stock'}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                className="flex-1 rounded-none bg-[oklch(0.22_0.02_50)] py-6 text-[10px] uppercase tracking-[0.3em] hover:bg-[oklch(0.30_0.03_50)]"
                disabled={product.stock < 1}
              >
                Add to Bag
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-none py-6 text-[10px] uppercase tracking-[0.3em]"
              >
                <Link href={ROUTES.wishlist}>Save to Wishlist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
