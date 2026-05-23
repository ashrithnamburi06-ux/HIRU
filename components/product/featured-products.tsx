import { ProductGrid } from '@/components/product/product-grid'
import { getProducts } from '@/lib/api/products'

export async function FeaturedProducts({ limit = 8 }: { limit?: number }) {
  const { data: products } = await getProducts({ featured: true, limit })
  return <ProductGrid products={products} />
}
