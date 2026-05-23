export const SITE_NAME = 'HIRU Elegance'
export const SITE_DESCRIPTION =
  'Discover quiet luxury and timeless elegance. Premium women\'s fashion designed for those who love effortless style.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const ROUTES = {
  home: '/',
  collections: '/collections',
  category: (slug: string) => `/category/${slug}`,
  product: (id: string) => `/product/${id}`,
  search: '/search',
  wishlist: '/wishlist',
  cart: '/cart',
  checkout: '/checkout',
  login: '/login',
  register: '/register',
  profile: '/profile',
  about: '/about',
  contact: '/contact',
} as const

export const CATEGORIES = [
  { slug: 'new-in', name: 'New In', label: 'New Arrivals' },
  { slug: 'best-sellers', name: 'Best Sellers', label: 'Best Sellers' },
  { slug: 'dresses', name: 'Dresses', label: 'Dresses' },
  { slug: 'co-ord-sets', name: 'Co-ord Sets', label: 'Co-ord Sets' },
  { slug: 'ethnic', name: 'Ethnic', label: 'Ethnic Wear' },
  { slug: 'accessories', name: 'Accessories', label: 'Accessories' },
] as const
