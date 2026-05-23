import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from './constants'

type PageMetadataOptions = {
  title: string
  description?: string
  path?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`

  const fullTitle = `${title} | ${SITE_NAME}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
