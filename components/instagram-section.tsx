"use client"

import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { EDITORIAL_IMAGE_POOL, LOCAL_IMAGES } from "@/lib/images/local-assets"

const instagramImages = EDITORIAL_IMAGE_POOL.map((image, index) => ({
  id: index + 1,
  image,
  likes: ['2.4k', '3.1k', '1.8k', '2.9k', '4.2k', '2.7k'][index] ?? '2.0k',
}))

export function InstagramSection() {
  return (
    <section className="py-32 md:py-44 bg-[oklch(0.98_0.008_85)]">
      <div className="container mx-auto px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Instagram className="w-5 h-5 text-[oklch(0.55_0.04_60)]" strokeWidth={1.5} />
            <p className="text-[oklch(0.55_0.04_60)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase">
              @hiruelegance
            </p>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[oklch(0.25_0.02_50)] font-light leading-[1.1]">
            Follow Our <span className="italic font-normal">Journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {instagramImages.map((item, index) => (
            <motion.a
              key={item.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <OptimizedImage
                src={item.image}
                fallbackSrc={LOCAL_IMAGES.productDefault}
                alt={`Instagram post ${item.id}`}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[oklch(0.15_0.02_50)]/0 group-hover:bg-[oklch(0.15_0.02_50)]/60 transition-colors duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                  <Instagram className="w-8 h-8 text-[oklch(0.98_0.005_85)] mx-auto mb-2" strokeWidth={1.2} />
                  <p className="text-[oklch(0.98_0.005_85)] text-sm font-light">{item.likes} likes</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-[oklch(0.35_0.03_50)] hover:text-[oklch(0.50_0.04_55)] transition-colors duration-300"
          >
            <span className="text-[11px] tracking-[0.35em] uppercase font-medium">Follow Us on Instagram</span>
            <Instagram className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
