import type { Product } from '@/types/product'
import {
  CATEGORY_IMAGE_MAP,
  EDITORIAL_IMAGE_POOL,
  LOCAL_IMAGES,
  PRODUCT_IMAGE_POOL,
} from './local-assets'

/** Only paths under /images/ from this project's public folder */
export function isLocalProjectImage(src: unknown): src is string {
  if (typeof src !== 'string') return false
  const trimmed = src.trim()
  return trimmed.startsWith('/images/') && !trimmed.includes('://')
}

export function resolveImageSrc(
  src: string | undefined | null,
  fallback: string = LOCAL_IMAGES.productDefault
): string {
  if (isLocalProjectImage(src)) return src.trim()
  return fallback
}

/** Match product title to internal asset filenames */
export function getProductImageByName(name?: string): string | null {
  if (!name) return null
  const n = name.toLowerCase()

  if (n.includes('silk') && (n.includes('dress') || n.includes('drape'))) {
    return LOCAL_IMAGES.products.silkDress
  }
  if (n.includes('cashmere') || n.includes('blazer')) {
    return LOCAL_IMAGES.products.cashmereBlazer
  }
  if (n.includes('linen') || n.includes('coord') || n.includes('co-ord')) {
    return LOCAL_IMAGES.products.linenCoord
  }
  if (n.includes('satin') || n.includes('skirt')) {
    return LOCAL_IMAGES.products.satinSkirt
  }
  if (n.includes('ethnic') || n.includes('embroidered')) {
    return LOCAL_IMAGES.products.ethnic
  }
  if (n.includes('clutch') || n.includes('accessories') || n.includes('chain')) {
    return LOCAL_IMAGES.products.accessories
  }

  return null
}

function placeholderFromId(id?: string) {
  if (!id) return LOCAL_IMAGES.productDefault
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i)) % PRODUCT_IMAGE_POOL.length
  }
  return PRODUCT_IMAGE_POOL[hash] ?? LOCAL_IMAGES.productDefault
}

export function getProductPlaceholder(category?: string, id?: string): string {
  if (category && CATEGORY_IMAGE_MAP[category]) {
    return CATEGORY_IMAGE_MAP[category]
  }
  return placeholderFromId(id)
}

/**
 * Resolve product image: local API path → name match → category → id pool.
 * External URLs are replaced with internal fallbacks.
 */
export function getProductImage(
  product: Pick<Product, 'images' | 'category' | '_id' | 'name'> | null | undefined,
  index = 0
): string {
  if (!product) return LOCAL_IMAGES.productDefault

  const fromApi = product.images?.[index] ?? product.images?.[0]
  if (isLocalProjectImage(fromApi)) {
    return fromApi.trim()
  }

  const byName = getProductImageByName(product.name)
  if (byName) return byName

  return getProductPlaceholder(product.category, product._id)
}

export function ensureProductImages(
  images: string[] | null | undefined,
  category?: string,
  id?: string,
  name?: string
): string[] {
  const localFromApi = (images ?? []).filter(isLocalProjectImage).map((s) => s.trim())
  if (localFromApi.length > 0) return localFromApi

  const byName = getProductImageByName(name)
  if (byName) return [byName]

  return [getProductPlaceholder(category, id)]
}

export function normalizeProduct<T extends Product>(product: T | null | undefined): T | null {
  if (!product) return null

  return {
    ...product,
    images: ensureProductImages(
      product.images,
      product.category,
      product._id,
      product.name
    ),
  }
}

export function normalizeProducts(products: Product[] | null | undefined): Product[] {
  if (!products?.length) return []
  return products.map((p) => normalizeProduct(p)!)
}

export function getEditorialImage(index: number): string {
  return EDITORIAL_IMAGE_POOL[index % EDITORIAL_IMAGE_POOL.length]
}
