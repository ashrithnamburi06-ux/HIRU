import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { NewArrivalsSection } from "@/components/new-arrivals-section"
import { FeaturedCollectionSection } from "@/components/featured-collection-section"
import { BrandStorySection } from "@/components/brand-story-section"
import { EditorialBannerSection } from "@/components/editorial-banner-section"
import { FabricStorySection } from "@/components/fabric-story-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { InstagramSection } from "@/components/instagram-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <NewArrivalsSection />
      <FeaturedCollectionSection />
      <BrandStorySection />
      <EditorialBannerSection />
      <FabricStorySection />
      <TestimonialsSection />
      <InstagramSection />
      <Footer />
    </main>
  )
}
