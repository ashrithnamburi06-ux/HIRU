"use client"

import Link from "next/link"
import { m } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ROUTES } from "@/lib/constants"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LOCAL_IMAGES } from "@/lib/images/local-assets"
import { collectionImageSizes } from "@/lib/performance/images"
import { fadeInUp, motionViewport } from "@/lib/performance/motion-config"

const collections = [
  {
    id: 1,
    name: "The Ethereal Edit",
    description: "Flowing silhouettes in whisper-soft fabrics",
    image: LOCAL_IMAGES.collectionEthereal,
    itemCount: 24,
    href: ROUTES.category("dresses"),
  },
  {
    id: 2,
    name: "Power Dressing",
    description: "Tailored elegance for the modern woman",
    image: LOCAL_IMAGES.collectionPower,
    itemCount: 18,
    href: ROUTES.category("best-sellers"),
  },
]

export function FeaturedCollectionSection() {
  return (
    <section className="perf-section py-32 md:py-44 bg-[oklch(0.94_0.02_80)]">
      <div className="container mx-auto px-8 lg:px-20">
        <m.div {...fadeInUp} className="text-center mb-20 md:mb-28">
          <p className="text-[oklch(0.55_0.04_60)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-6">
            Discover
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[oklch(0.25_0.02_50)] font-light leading-[1.1]">
            Featured <span className="italic font-normal">Collections</span>
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group block cursor-pointer"
            >
              <m.div
                initial={fadeInUp.initial}
                whileInView={fadeInUp.whileInView}
                viewport={motionViewport}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8">
                  <OptimizedImage
                    src={collection.image}
                    fallbackSrc={collection.image}
                    alt={collection.name}
                    fill
                    sizes={collectionImageSizes}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/70 via-[oklch(0.15_0.02_50)]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14">
                    <p className="text-[oklch(0.85_0.05_80)] text-[10px] tracking-[0.4em] uppercase mb-4">
                      {collection.itemCount} Pieces
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[oklch(0.98_0.005_85)] font-light mb-4 leading-[1.1]">
                      {collection.name}
                    </h3>
                    <p className="text-[oklch(0.85_0.02_80)] text-sm md:text-base font-light tracking-wide mb-8 max-w-sm">
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-3 text-[oklch(0.98_0.005_85)] group-hover:gap-5 transition-all duration-500">
                      <span className="text-[10px] tracking-[0.35em] uppercase">Explore Collection</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </m.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
