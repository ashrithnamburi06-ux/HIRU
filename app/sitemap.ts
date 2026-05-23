import type { MetadataRoute } from 'next'
import { SITE_URL, CATEGORIES, ROUTES } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    ROUTES.home,
    ROUTES.collections,
    ROUTES.search,
    ROUTES.about,
    ROUTES.contact,
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === ROUTES.home ? 1 : 0.8,
  }))

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${SITE_URL}${ROUTES.category(category.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes]
}
