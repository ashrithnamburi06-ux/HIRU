import { ProductGrid } from '@/components/product/product-grid'
import { getProducts } from '@/lib/api/products'

type CategoryProductsProps = {
  slug: string
  page: number
  emptyMessage: string
}

export async function CategoryProducts({
  slug,
  page,
  emptyMessage,
}: CategoryProductsProps) {
  const query =
    slug === 'new-in'
      ? { featured: true, page, limit: 12 }
      : { category: slug, page, limit: 12 }

  const { data: products, total, pages } = await getProducts(query)

  return (
    <>
      <p className="mb-10 text-sm font-light text-[oklch(0.50_0.03_55)]">
        {total} {total === 1 ? 'piece' : 'pieces'}
      </p>
      <ProductGrid products={products} emptyMessage={emptyMessage} />
      {pages > 1 && (
        <p className="mt-12 text-center text-xs tracking-[0.2em] uppercase text-[oklch(0.50_0.03_55)]">
          Page {page} of {pages}
        </p>
      )}
    </>
  )
}
