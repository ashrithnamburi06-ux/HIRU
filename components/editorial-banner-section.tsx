"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function EditorialBannerSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
          alt="Summer Campaign Editorial"
          className="w-full h-full object-cover"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.02_50)]/80 via-[oklch(0.15_0.02_50)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-8 lg:px-20 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-[oklch(0.80_0.06_75)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-6">
            Summer 2026 Campaign
          </p>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl text-[oklch(0.98_0.005_85)] font-light leading-[0.95] mb-8">
            GOLDEN
            <br />
            <span className="italic font-normal text-[oklch(0.85_0.05_80)]">HOUR</span>
          </h2>
          
          <p className="text-[oklch(0.82_0.02_80)] text-base md:text-lg font-light tracking-wide mb-12 max-w-md leading-relaxed">
            Embrace the warmth of summer with our latest collection. Effortless pieces designed for golden moments.
          </p>
          
          <button className="group flex items-center gap-4 text-[oklch(0.98_0.005_85)]">
            <span className="text-[11px] tracking-[0.35em] uppercase font-medium">Shop the Campaign</span>
            <div className="w-12 h-12 rounded-full border border-[oklch(0.98_0.005_85)]/40 flex items-center justify-center group-hover:bg-[oklch(0.98_0.005_85)] group-hover:border-[oklch(0.98_0.005_85)] transition-all duration-500">
              <ArrowRight className="w-5 h-5 group-hover:text-[oklch(0.20_0.02_50)] transition-colors duration-500" strokeWidth={1.5} />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Campaign Number */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12 right-8 lg:right-20 hidden md:block"
      >
        <p className="font-serif text-8xl lg:text-9xl text-[oklch(0.98_0.005_85)]/10 font-light">
          02
        </p>
      </motion.div>
    </section>
  )
}
