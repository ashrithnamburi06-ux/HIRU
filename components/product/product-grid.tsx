import type { Product } from '@/types/product'
import { ProductCard } from './product-card'

type ProductGridProps = {
  products: Product[]
  emptyMessage?: string
}

export function ProductGrid({
  products,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-24 text-center text-sm font-light text-[oklch(0.50_0.03_55)]">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          tag={product.featured ? 'Featured' : null}
          priority={index < 4}
        />
      ))}
    </div>
  )
}
