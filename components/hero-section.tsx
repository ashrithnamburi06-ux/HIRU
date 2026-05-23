"use client"

import { m } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LOCAL_IMAGES } from "@/lib/images/local-assets"
import { heroImageSizes } from "@/lib/performance/images"
import { enableInfiniteMotion, heroTransition, isDev } from "@/lib/performance/motion-config"

const contentDelay = isDev ? 0.15 : 0.5

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[oklch(0.14_0.015_55)]">
      <div className="absolute inset-0">
        <OptimizedImage
          src={LOCAL_IMAGES.hero}
          fallbackSrc={LOCAL_IMAGES.hero}
          alt="Elegant woman in luxury champagne silk dress in premium boutique setting"
          fill
          priority
          sizes={heroImageSizes}
          className="object-cover object-[center_20%] animate-in fade-in zoom-in-95 duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.02_50)]/95 via-[oklch(0.10_0.02_50)]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.02_50)]/80 via-transparent to-[oklch(0.10_0.02_50)]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.02_50)]/60 via-transparent to-transparent h-[40%]" />
        <div className="absolute inset-0 bg-[oklch(0.55_0.08_65)]/[0.04] mix-blend-overlay" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, transparent 50%, oklch(0.08 0.02 50 / 0.4) 100%)',
          }}
        />
      </div>

      <div className="relative min-h-[100svh] container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 flex items-center pt-36 sm:pt-40 lg:pt-48 pb-28 lg:pb-36">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 xl:col-span-6">
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...heroTransition, delay: contentDelay }}
              className="flex items-center gap-4 mb-8 lg:mb-10"
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-[oklch(0.75_0.06_70)] to-transparent" />
              <p className="text-[oklch(0.75_0.06_70)] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-light">
                Summer Collection 2026
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...heroTransition, delay: contentDelay + 0.1 }}
              className="mb-8 lg:mb-10"
            >
              <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] text-[oklch(0.97_0.005_80)] font-extralight leading-[0.9] tracking-[-0.03em]">
                <span className="block">QUIET</span>
                <span className="block mt-1 lg:mt-2">
                  <span className="italic font-light text-[oklch(0.82_0.06_75)]">LUXURY</span>
                  <span className="text-[oklch(0.70_0.06_70)]">.</span>
                </span>
              </h1>
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...heroTransition, delay: contentDelay + 0.2 }}
              className="text-[oklch(0.72_0.02_75)] text-sm sm:text-base lg:text-lg font-light tracking-wide leading-[1.8] max-w-md lg:max-w-lg mb-10 lg:mb-14"
            >
              Designed for women who embrace effortless elegance.
              <span className="hidden sm:inline"> Where timeless sophistication meets modern simplicity.</span>
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...heroTransition, delay: contentDelay + 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              <button className="group relative px-10 sm:px-12 lg:px-14 py-4 sm:py-[18px] bg-[oklch(0.97_0.005_80)] text-[oklch(0.15_0.02_50)] overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_8px_40px_-8px_oklch(0.97_0.005_80_/_0.3)]">
                <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-500 group-hover:text-[oklch(0.97_0.005_80)] group-hover:tracking-[0.3em]">
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
                <div className="absolute inset-0 bg-[oklch(0.18_0.02_50)] transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>

              <button className="group relative px-10 sm:px-12 lg:px-14 py-4 sm:py-[18px] bg-transparent border border-[oklch(0.97_0.005_80)]/25 text-[oklch(0.92_0.005_80)] overflow-hidden transition-all duration-500 hover:border-[oklch(0.97_0.005_80)]/60">
                <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-light transition-all duration-500 group-hover:tracking-[0.3em]">
                  View Lookbook
                </span>
                <div className="absolute inset-0 bg-[oklch(0.97_0.005_80)]/[0.04] transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...heroTransition, delay: contentDelay + 0.4 }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col items-end justify-center gap-8 pr-4 xl:pr-8"
          >
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
            <div className="flex flex-col gap-4 text-right">
              <p className="text-[oklch(0.65_0.02_75)] text-[9px] tracking-[0.4em] uppercase">Premium Fabrics</p>
              <p className="text-[oklch(0.65_0.02_75)] text-[9px] tracking-[0.4em] uppercase">Artisan Crafted</p>
              <p className="text-[oklch(0.65_0.02_75)] text-[9px] tracking-[0.4em] uppercase">Effortless Style</p>
            </div>
          </m.div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: contentDelay + 0.5, duration: 0.5 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        {enableInfiniteMotion ? (
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[oklch(0.97_0.005_80)]/40 text-[8px] tracking-[0.45em] uppercase font-light">Discover</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[oklch(0.75_0.06_70)]/60 to-transparent" />
            <ChevronDown className="w-4 h-4 text-[oklch(0.97_0.005_80)]/40" strokeWidth={1} />
          </m.div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[oklch(0.97_0.005_80)]/40 text-[8px] tracking-[0.45em] uppercase font-light">Discover</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[oklch(0.75_0.06_70)]/60 to-transparent" />
            <ChevronDown className="w-4 h-4 text-[oklch(0.97_0.005_80)]/40" strokeWidth={1} />
          </div>
        )}
      </m.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.98_0.01_80)] to-transparent pointer-events-none" />
    </section>
  )
}
