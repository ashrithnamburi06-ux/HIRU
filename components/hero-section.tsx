"use client"

import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[oklch(0.14_0.015_55)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/hero-luxury-fashion.jpg"
          alt="Elegant woman in luxury champagne silk dress in premium boutique setting"
          className="w-full h-full object-cover object-[center_20%]"
        />
        
        {/* Luxury Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.02_50)]/95 via-[oklch(0.10_0.02_50)]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.02_50)]/80 via-transparent to-[oklch(0.10_0.02_50)]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.02_50)]/60 via-transparent to-transparent h-[40%]" />
        
        {/* Warm luxury color wash */}
        <div className="absolute inset-0 bg-[oklch(0.55_0.08_65)]/[0.04] mix-blend-overlay" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, oklch(0.08 0.02 50 / 0.4) 100%)'
        }} />
        
        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-[100svh] container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 flex items-center pt-36 sm:pt-40 lg:pt-48 pb-28 lg:pb-36">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 xl:col-span-6">
            {/* Collection Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex items-center gap-4 mb-8 lg:mb-10"
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-[oklch(0.75_0.06_70)] to-transparent" />
              <p className="text-[oklch(0.75_0.06_70)] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-light">
                Summer Collection 2026
              </p>
            </motion.div>
            
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8 lg:mb-10"
            >
              <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] text-[oklch(0.97_0.005_80)] font-extralight leading-[0.9] tracking-[-0.03em]">
                <span className="block">QUIET</span>
                <span className="block mt-1 lg:mt-2">
                  <span className="italic font-light text-[oklch(0.82_0.06_75)]">LUXURY</span>
                  <span className="text-[oklch(0.70_0.06_70)]">.</span>
                </span>
              </h1>
            </motion.div>
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="text-[oklch(0.72_0.02_75)] text-sm sm:text-base lg:text-lg font-light tracking-wide leading-[1.8] max-w-md lg:max-w-lg mb-10 lg:mb-14"
            >
              Designed for women who embrace effortless elegance. 
              <span className="hidden sm:inline"> Where timeless sophistication meets modern simplicity.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              {/* Primary CTA - Luxury Filled */}
              <button className="group relative px-10 sm:px-12 lg:px-14 py-4 sm:py-[18px] bg-[oklch(0.97_0.005_80)] text-[oklch(0.15_0.02_50)] overflow-hidden transition-all duration-700 ease-out hover:shadow-[0_8px_40px_-8px_oklch(0.97_0.005_80_/_0.3)]">
                <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-500 group-hover:text-[oklch(0.97_0.005_80)] group-hover:tracking-[0.3em]">
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
                <div className="absolute inset-0 bg-[oklch(0.18_0.02_50)] transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>
              
              {/* Secondary CTA - Elegant Outlined */}
              <button className="group relative px-10 sm:px-12 lg:px-14 py-4 sm:py-[18px] bg-transparent border border-[oklch(0.97_0.005_80)]/25 text-[oklch(0.92_0.005_80)] overflow-hidden transition-all duration-700 hover:border-[oklch(0.97_0.005_80)]/60">
                <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-light transition-all duration-500 group-hover:tracking-[0.3em]">
                  View Lookbook
                </span>
                <div className="absolute inset-0 bg-[oklch(0.97_0.005_80)]/[0.04] transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>
            </motion.div>
          </div>
          
          {/* Right Side - Editorial Accent (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col items-end justify-center gap-8 pr-4 xl:pr-8"
          >
            {/* Decorative vertical line with text */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[oklch(0.97_0.005_80)]/60 text-[10px] tracking-[0.35em] uppercase font-light mb-1">
                  Timeless
                </p>
                <p className="text-[oklch(0.82_0.06_75)] text-[10px] tracking-[0.35em] uppercase font-light">
                  Sophistication
                </p>
              </div>
              <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[oklch(0.75_0.06_70)]/40 to-transparent" />
            </div>
            
            {/* Feature highlights */}
            <div className="flex flex-col gap-4 text-right">
              <p className="text-[oklch(0.65_0.02_75)] text-[9px] tracking-[0.4em] uppercase">Premium Fabrics</p>
              <p className="text-[oklch(0.65_0.02_75)] text-[9px] tracking-[0.4em] uppercase">Artisan Crafted</p>
              <p className="text-[oklch(0.65_0.02_75)] text-[9px] tracking-[0.4em] uppercase">Effortless Style</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-32 right-16 xl:right-24 hidden lg:flex flex-col items-end gap-5"
      >
        <div className="flex items-center gap-5">
          <span className="text-[oklch(0.97_0.005_80)] text-xl font-serif font-extralight tracking-wide">01</span>
          <div className="w-20 h-[1px] bg-[oklch(0.97_0.005_80)]/20 overflow-hidden rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[oklch(0.75_0.06_70)] to-[oklch(0.97_0.005_80)]" 
            />
          </div>
          <span className="text-[oklch(0.97_0.005_80)]/30 text-sm font-serif font-extralight">05</span>
        </div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[oklch(0.97_0.005_80)]/40 text-[8px] tracking-[0.45em] uppercase font-light">Discover</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[oklch(0.75_0.06_70)]/60 to-transparent" />
          <ChevronDown className="w-4 h-4 text-[oklch(0.97_0.005_80)]/40" strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Side Text - Desktop Only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <p className="text-[oklch(0.97_0.005_80)]/20 text-[8px] tracking-[0.45em] uppercase -rotate-90 origin-left whitespace-nowrap font-light">
          Est. 2024 — Premium Women&apos;s Fashion
        </p>
      </motion.div>
      
      {/* Bottom gradient fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.98_0.01_80)] to-transparent pointer-events-none" />
    </section>
  )
}
