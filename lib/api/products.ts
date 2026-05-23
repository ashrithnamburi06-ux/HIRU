import { cache } from 'react'
import type {
  Product,
  ProductQueryParams,
  ProductResponse,
  ProductsListResponse,
} from '@/types/product'
import { apiFetch } from './client'
import { MOCK_PRODUCTS } from '@/lib/mock-products'
import { normalizeProduct, normalizeProducts } from '@/lib/images/resolve'

function toQueryParams(params?: ProductQueryParams) {
  if (!params) return undefined

  return {
    page: params.page,
    limit: params.limit,
    sort: params.sort,
    category: params.category,
    featured: params.featured,
    search: params.search,
  }
}

function filterMockProducts(params?: ProductQueryParams) {
  let data = normalizeProducts([...MOCK_PRODUCTS])

  if (params?.category) {
    data = data.filter((p) => p.category === params.category)
  }
  if (params?.featured) {
    data = data.filter((p) => p.featured)
  }
  if (params?.search) {
    const q = params.search.toLowerCase()
    data = data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  const page = params?.page ?? 1
  const limit = params?.limit ?? 12
  const start = (page - 1) * limit
  const paginated = data.slice(start, start + limit)

  return {
    success: true,
    count: paginated.length,
    total: data.length,
    page,
    pages: Math.ceil(data.length / limit) || 1,
    data: paginated,
  } satisfies ProductsListResponse
}

export const getProducts = cache(
  async (params?: ProductQueryParams): Promise<ProductsListResponse> => {
    try {
      const response = await apiFetch<ProductsListResponse>('/products', {
        params: toQueryParams(params),
        next: { revalidate: 120, tags: ['products'] },
      })

      return {
        ...response,
        data: normalizeProducts(response?.data ?? []),
      }
    } catch {
      return filterMockProducts(params)
    }
  }
)

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  try {
    const response = await apiFetch<ProductResponse>(`/products/${id}`, {
      next: { revalidate: 60, tags: [`product-${id}`] },
    })
    return normalizeProduct(response?.data)
  } catch {
    const mock = MOCK_PRODUCTS.find((p) => p._id === id)
    return normalizeProduct(mock ?? null)
  }
})
