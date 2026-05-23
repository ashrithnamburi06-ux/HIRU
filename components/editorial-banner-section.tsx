"use client"

import { m } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LOCAL_IMAGES } from "@/lib/images/local-assets"
import { heroImageSizes } from "@/lib/performance/images"
import { motionViewport } from "@/lib/performance/motion-config"

export function EditorialBannerSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={LOCAL_IMAGES.editorial}
          fallbackSrc={LOCAL_IMAGES.editorial}
          alt="Summer Campaign Editorial"
          fill
          sizes={heroImageSizes}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.02_50)]/80 via-[oklch(0.15_0.02_50)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/50 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-8 lg:px-20 flex items-center">
        <m.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={motionViewport}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl"
        >
          <p className="text-[oklch(0.80_0.06_75)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-6">
            Summer 2026 Campaign
          </p>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl text-[oklch(0.98_0.005_85)] font-light leading-[0.95] mb-8">
            GOLDEN
            <br />
            <span className="italic">HOUR</span>
          </h2>

          <p className="text-[oklch(0.85_0.02_80)] text-base md:text-lg font-light leading-relaxed mb-12 max-w-md">
            An ode to sun-drenched elegance. Discover pieces that capture the warmth of summer in every thread.
          </p>

          <button type="button" className="group flex items-center gap-4 text-[oklch(0.98_0.005_85)]">
            <span className="text-[10px] tracking-[0.35em] uppercase">View Campaign</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
          </button>
        </m.div>
      </div>
    </section>
  )
}
