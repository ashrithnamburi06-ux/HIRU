"use client"

import { m } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LOCAL_IMAGES } from "@/lib/images/local-assets"
import { collectionImageSizes } from "@/lib/performance/images"
import { fadeInUp, motionViewport } from "@/lib/performance/motion-config"

export function BrandStorySection() {
  return (
    <section className="perf-section relative py-32 md:py-44 overflow-hidden bg-[oklch(0.94_0.02_80)]">
      <div className="container mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <m.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={motionViewport}
            transition={fadeInUp.transition}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <OptimizedImage
                src={LOCAL_IMAGES.brandStory}
                fallbackSrc={LOCAL_IMAGES.brandStory}
                alt="The HIRU Woman - Elegant lifestyle"
                fill
                sizes={collectionImageSizes}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-full h-full border border-[oklch(0.75_0.06_75)] -z-10 hidden lg:block" />

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={motionViewport}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute -right-6 top-1/4 bg-[oklch(0.20_0.02_50)] text-[oklch(0.95_0.01_85)] px-6 py-8 hidden lg:block"
            >
              <p className="font-serif text-4xl font-light mb-1">10+</p>
              <p className="text-[9px] tracking-[0.3em] uppercase">Years of Excellence</p>
            </m.div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={motionViewport}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <p className="text-[oklch(0.55_0.04_60)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-6">
              Our Philosophy
            </p>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[oklch(0.25_0.02_50)] font-light leading-[1.05] mb-10">
              THE <span className="italic font-normal">HIRU</span>
              <br />
              WOMAN
            </h2>

            <p className="text-[oklch(0.45_0.02_50)] text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
              She is confident, graceful, and effortlessly stylish. She chooses quality over trends and elegance over noise.
            </p>

            <p className="text-[oklch(0.55_0.03_55)] text-base font-light leading-relaxed mb-14 max-w-lg">
              Every piece in our collection is thoughtfully designed for women who appreciate the art of understated luxury. We believe true elegance lies in simplicity, in the perfect cut, and in fabrics that speak for themselves.
            </p>

            <button type="button" className="group flex items-center gap-6 text-[oklch(0.30_0.03_50)]">
              <span className="text-[11px] tracking-[0.35em] uppercase font-medium">Discover Our Story</span>
              <div className="w-14 h-14 rounded-full border border-[oklch(0.30_0.03_50)]/30 flex items-center justify-center group-hover:bg-[oklch(0.25_0.02_50)] group-hover:border-[oklch(0.25_0.02_50)] transition-all duration-500">
                <ArrowRight className="w-5 h-5 group-hover:text-[oklch(0.98_0.005_85)] transition-colors duration-500" strokeWidth={1.5} />
              </div>
            </button>
          </m.div>
        </div>
      </div>
    </section>
  )
}
