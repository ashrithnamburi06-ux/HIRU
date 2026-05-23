'use client'

import { memo, useCallback, useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/format'
import { ROUTES } from '@/lib/constants'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { getProductImage, getProductPlaceholder } from '@/lib/images/resolve'
import { productImageSizes } from '@/lib/performance/images'

type ProductCardProps = {
  product: Product
  tag?: string | null
  priority?: boolean
}

function ProductCardComponent({ product, tag, priority = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)

  const image = getProductImage(product)
  const displayPrice =
    product.discount > 0 && product.discountedPrice
      ? product.discountedPrice
      : product.price
  const showDiscount = product.discount > 0

  const toggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setWishlisted((v) => !v)
  }, [])

  return (
    <article className="group animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
      <Link href={ROUTES.product(product._id)} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
          <OptimizedImage
            src={image}
            fallbackSrc={getProductPlaceholder(product.category, product._id)}
            alt={product.name}
            fill
            sizes={productImageSizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {tag && (
            <div className="absolute top-6 left-6">
              <span className="inline-block bg-[oklch(0.18_0.02_50)] px-4 py-2 text-[8px] font-light uppercase tracking-[0.25em] text-[oklch(0.95_0.01_80)]">
                {tag}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={toggleWishlist}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[oklch(0.99_0.005_80)]/90 opacity-0 backdrop-blur-sm transition-all duration-300 hover:scale-105 group-hover:opacity-100"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${
                wishlisted
                  ? 'fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]'
                  : 'text-[oklch(0.30_0.03_50)]'
              }`}
              strokeWidth={1.5}
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
            <span className="block w-full py-3.5 bg-[oklch(0.99_0.005_80)] text-center text-[9px] font-medium uppercase tracking-[0.3em] text-[oklch(0.20_0.02_50)]">
              View Details
            </span>
          </div>
        </div>

        <div className="mt-6 px-1">
          <h3 className="font-serif text-lg font-light tracking-wide text-[oklch(0.22_0.02_50)] transition-colors duration-300 group-hover:text-[oklch(0.40_0.04_55)]">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-sm font-light tracking-wider text-[oklch(0.50_0.04_55)]">
              {formatPrice(displayPrice)}
            </p>
            {showDiscount && (
              <>
                <p className="text-sm font-light text-[oklch(0.65_0.02_55)] line-through">
                  {formatPrice(product.price)}
                </p>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[oklch(0.55_0.15_25)]">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

export const ProductCard = memo(ProductCardComponent)
