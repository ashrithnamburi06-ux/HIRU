import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/hero-section'
import { SectionSkeleton } from '@/components/skeletons/section-skeleton'

const NewArrivalsSection = dynamic(
  () =>
    import('@/components/new-arrivals-section').then((m) => ({
      default: m.NewArrivalsSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

const FeaturedCollectionSection = dynamic(
  () =>
    import('@/components/featured-collection-section').then((m) => ({
      default: m.FeaturedCollectionSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

const BrandStorySection = dynamic(
  () =>
    import('@/components/brand-story-section').then((m) => ({
      default: m.BrandStorySection,
    })),
  { loading: () => <SectionSkeleton /> }
)

const EditorialBannerSection = dynamic(
  () =>
    import('@/components/editorial-banner-section').then((m) => ({
      default: m.EditorialBannerSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

const FabricStorySection = dynamic(
  () =>
    import('@/components/fabric-story-section').then((m) => ({
      default: m.FabricStorySection,
    })),
  { loading: () => <SectionSkeleton /> }
)

const TestimonialsSection = dynamic(
  () =>
    import('@/components/testimonials-section').then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

const InstagramSection = dynamic(
  () =>
    import('@/components/instagram-section').then((m) => ({
      default: m.InstagramSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewArrivalsSection />
      <FeaturedCollectionSection />
      <BrandStorySection />
      <EditorialBannerSection />
      <FabricStorySection />
      <TestimonialsSection />
      <InstagramSection />
    </>
  )
}
