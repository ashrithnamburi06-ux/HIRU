"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      {/* Hero Header */}
      <div className="py-20 text-center px-6">
        <p className="text-[oklch(0.55_0.04_55)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4">
          Our Philosophy
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[oklch(0.22_0.02_50)] font-extralight tracking-tight mb-4">
          CRAFTED TO <span className="italic">Endure</span>
        </h1>
        <div className="w-16 h-[1px] bg-[oklch(0.65_0.06_55)] mx-auto mt-6" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
        
        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Brand Story Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="aspect-[4/5] bg-[oklch(0.93_0.015_75)] overflow-hidden border border-zinc-200/40"
          >
            <img
              src="/images/brand-story-editorial.jpg"
              alt="Hiru Elegance brand story photoshoot"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="space-y-6 text-[oklch(0.22_0.02_50)]"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-light leading-snug">
              Quiet luxury designed for those who appreciate the <span className="italic">subtle details</span>.
            </h2>
            
            <p className="text-xs md:text-sm text-[oklch(0.50_0.03_55)] font-light leading-relaxed">
              Founded in 2024, HIRU Elegance represents a return to mindful curation. We reject fast trends in favor of timeless designs that transition gracefully from daytime settings to evening gatherings.
            </p>

            <p className="text-xs md:text-sm text-[oklch(0.50_0.03_55)] font-light leading-relaxed">
              Each piece in our collection is produced in limited runs using biodegradable organic linens, long-staple cashmeres, and high-weight mulberry silk. By partnering directly with master artisans, we sustain heritage craftsmanship while ensuring optimal fair-trade practices.
            </p>

            <div className="pt-6">
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[oklch(0.22_0.02_50)] text-[oklch(0.98_0.005_80)] text-[9px] tracking-[0.25em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300"
              >
                Explore The Edit
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Pillars section */}
        <div className="border-t border-zinc-200/60 pt-20">
          <h3 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light text-center mb-16">
            OUR BRAND <span className="italic">Pillars</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Artisanal Craft",
                desc: "Every garment is cut and stitched by hands that carry generations of tailoring tradition. Our finishes speak to unmatched detail.",
              },
              {
                title: "Mindful Sourcing",
                desc: "We prioritize ecological stewardship. Our materials are fully traceable, sourced from farmers committed to natural bio-diversity.",
              },
              {
                title: "Timeless Silhouettes",
                desc: "Our design process begins with structural longevity. We draft cuts that balance fluid movement with strong architectural shapes.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="bg-white p-8 border border-[oklch(0.90_0.01_75)]/30 text-center"
              >
                <h4 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light mb-4">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[oklch(0.50_0.03_55)] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
