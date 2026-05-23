import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { BrandStorySection } from '@/components/brand-story-section'
import { FabricStorySection } from '@/components/fabric-story-section'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Our Story',
  description: 'Learn about HIRU Elegance — quiet luxury, craftsmanship, and timeless womenswear.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The House of HIRU"
        title="Our Story"
        description="Quiet luxury for the modern woman — timeless elegance, effortless style, exceptional quality."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'About' },
        ]}
      />
      <BrandStorySection />
      <FabricStorySection />
    </>
  )
}
