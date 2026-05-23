"use client"

import { motion } from "framer-motion"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LOCAL_IMAGES } from "@/lib/images/local-assets"
import { collectionImageSizes } from "@/lib/performance/images"

const fabrics = [
  {
    name: "Mulberry Silk",
    description: "Sourced from the finest silk farms, our mulberry silk drapes beautifully and feels luxurious against the skin.",
    origin: "China",
  },
  {
    name: "Organic Linen",
    description: "Breathable, sustainable, and effortlessly elegant. Perfect for warm summer days and conscious living.",
    origin: "Belgium",
  },
  {
    name: "Cashmere Wool",
    description: "Ultra-soft and lightweight, our cashmere is ethically sourced from the highlands of Mongolia.",
    origin: "Mongolia",
  },
]

export function FabricStorySection() {
  return (
    <section className="py-32 md:py-44 bg-[oklch(0.98_0.008_85)]">
      <div className="container mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-[oklch(0.55_0.04_60)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-6">
              Craftsmanship
            </p>
            
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[oklch(0.25_0.02_50)] font-light leading-[1.05] mb-10">
              The Art of
              <br />
              <span className="italic font-normal">Premium Fabrics</span>
            </h2>
            
            <p className="text-[oklch(0.50_0.02_50)] text-base md:text-lg font-light leading-relaxed mb-14 max-w-lg">
              Every piece in our collection begins with the finest materials. We travel the world to source fabrics that not only look beautiful but feel extraordinary.
            </p>

            {/* Fabric List */}
            <div className="space-y-10">
              {fabrics.map((fabric, index) => (
                <motion.div
                  key={fabric.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="border-b border-[oklch(0.88_0.02_80)] pb-8"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-2xl md:text-3xl text-[oklch(0.30_0.03_50)] font-light">
                      {fabric.name}
                    </h3>
                    <span className="text-[oklch(0.60_0.04_60)] text-[10px] tracking-[0.3em] uppercase">
                      {fabric.origin}
                    </span>
                  </div>
                  <p className="text-[oklch(0.55_0.03_55)] text-sm md:text-base font-light leading-relaxed max-w-md">
                    {fabric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <OptimizedImage
                src={LOCAL_IMAGES.fabric}
                fallbackSrc={LOCAL_IMAGES.fabric}
                alt="Premium fabric close-up"
                fill
                sizes={collectionImageSizes}
                className="object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-8 -left-8 w-full h-full border border-[oklch(0.75_0.06_75)] -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
