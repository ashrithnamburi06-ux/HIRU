import { ProductGrid } from '@/components/product/product-grid'
import { getProducts } from '@/lib/api/products'

type SearchResultsProps = {
  query: string
}

export async function SearchResults({ query }: SearchResultsProps) {
  const { data: products, total } = await getProducts({ search: query, limit: 24 })

  return (
    <>
      <p className="mb-10 mt-12 text-sm font-light text-[oklch(0.50_0.03_55)]">
        {total} result{total === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
      </p>
      <ProductGrid
        products={products}
        emptyMessage={`No results for "${query}". Try another search.`}
      />
    </>
  )
}
