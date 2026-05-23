/**
 * Internal project images — served from /public/images/
 * Do not use external URLs; all paths are local to this repo.
 */
export const LOCAL_IMAGES = {
  hero: '/images/hero-luxury-fashion.jpg',
  brandStory: '/images/brand-story-editorial.jpg',
  editorial: '/images/hero-luxury-fashion.jpg',
  fabric: '/images/product-silk-dress.jpg',
  productDefault: '/images/product-silk-dress.jpg',
  collectionEthereal: '/images/product-silk-dress.jpg',
  collectionPower: '/images/product-cashmere-blazer.jpg',
  products: {
    silkDress: '/images/product-silk-dress.jpg',
    cashmereBlazer: '/images/product-cashmere-blazer.jpg',
    satinSkirt: '/images/product-satin-skirt.jpg',
    linenCoord: '/images/product-linen-coord.jpg',
    ethnic: '/images/brand-story-editorial.jpg',
    accessories: '/images/product-cashmere-blazer.jpg',
  },
} as const

/** Category → local product/editorial image */
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  dresses: LOCAL_IMAGES.products.silkDress,
  'co-ord-sets': LOCAL_IMAGES.products.linenCoord,
  ethnic: LOCAL_IMAGES.products.ethnic,
  accessories: LOCAL_IMAGES.products.accessories,
  'best-sellers': LOCAL_IMAGES.products.cashmereBlazer,
  'new-in': LOCAL_IMAGES.products.satinSkirt,
}

/** Rotate local product shots when category is unknown */
export const PRODUCT_IMAGE_POOL = [
  LOCAL_IMAGES.products.silkDress,
  LOCAL_IMAGES.products.cashmereBlazer,
  LOCAL_IMAGES.products.satinSkirt,
  LOCAL_IMAGES.products.linenCoord,
  LOCAL_IMAGES.brandStory,
] as const

/** Editorial / social grid — cycle through available local assets */
export const EDITORIAL_IMAGE_POOL = [
  LOCAL_IMAGES.hero,
  LOCAL_IMAGES.brandStory,
  LOCAL_IMAGES.products.silkDress,
  LOCAL_IMAGES.products.cashmereBlazer,
  LOCAL_IMAGES.products.satinSkirt,
  LOCAL_IMAGES.products.linenCoord,
] as const
