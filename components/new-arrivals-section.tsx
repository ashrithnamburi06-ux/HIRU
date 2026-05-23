"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { m } from "framer-motion"
import { Heart } from "lucide-react"
import { ROUTES } from "@/lib/constants"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LOCAL_IMAGES } from "@/lib/images/local-assets"
import { productImageSizes } from "@/lib/performance/images"
import { fadeInUp, motionViewport } from "@/lib/performance/motion-config"

const products = [
  {
    id: 1,
    name: "Silk Drape Dress",
    price: "₹18,999",
    image: LOCAL_IMAGES.products.silkDress,
    tag: "New",
  },
  {
    id: 2,
    name: "Cashmere Blazer",
    price: "₹24,499",
    image: LOCAL_IMAGES.products.cashmereBlazer,
    tag: null,
  },
  {
    id: 3,
    name: "Satin Evening Skirt",
    price: "₹12,999",
    image: LOCAL_IMAGES.products.satinSkirt,
    tag: "Bestseller",
  },
  {
    id: 4,
    name: "Linen Co-ord Set",
    price: "₹19,999",
    image: LOCAL_IMAGES.products.linenCoord,
    tag: null,
  },
]

export function NewArrivalsSection() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }, [])

  return (
    <section className="perf-section py-32 md:py-40 lg:py-48 bg-[oklch(0.97_0.008_75)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
        
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-28 lg:mb-36"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <m.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[1px] bg-[oklch(0.65_0.06_55)] mb-8"
              />
              <p className="text-[oklch(0.55_0.04_55)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-5 font-light">
                Curated Selection
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[oklch(0.22_0.02_50)] font-extralight tracking-[-0.02em] leading-[0.95]">
                NEW
                <br />
                <span className="italic font-light text-[oklch(0.40_0.04_55)]">Arrivals</span>
              </h2>
            </div>
            
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xs text-[oklch(0.50_0.03_55)] text-sm font-light leading-relaxed tracking-wide"
            >
              Discover our latest collection of timeless pieces, designed for the modern woman who values quiet elegance.
            </m.p>
          </div>
        </m.div>

        {/* Products Grid - Editorial Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 md:gap-y-20 lg:gap-y-0 lg:gap-x-8">
          
          {/* Product 1 - Large Feature */}
          <m.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 lg:row-span-2"
          >
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
                <OptimizedImage
                  src={products[0].image}
                  fallbackSrc={products[0].image}
                  alt={products[0].name}
                  fill
                  sizes={productImageSizes}
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                {/* Luxury Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Tag */}
                <div className="absolute top-8 left-8">
                  <span className="inline-block px-5 py-2.5 bg-[oklch(0.18_0.02_50)] text-[oklch(0.95_0.01_80)] text-[9px] tracking-[0.3em] uppercase font-light">
                    {products[0].tag}
                  </span>
                </div>
                
                {/* Wishlist */}
                <button 
                  onClick={() => toggleWishlist(1)}
                  className="absolute top-8 right-8 w-12 h-12 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors duration-300 ${wishlist.includes(1) ? 'fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]' : 'text-[oklch(0.30_0.03_50)]'}`} 
                    strokeWidth={1.5} 
                  />
                </button>
                
                {/* Quick Shop */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <button className="w-full py-4 bg-[oklch(0.99_0.005_80)] text-[oklch(0.20_0.02_50)] text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.95_0.01_75)] transition-colors duration-300">
                    Quick Shop
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="mt-8 px-1">
                <h3 className="font-serif text-xl md:text-2xl text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-3 group-hover:text-[oklch(0.40_0.04_55)] transition-colors duration-500">
                  {products[0].name}
                </h3>
                <p className="text-[oklch(0.50_0.04_55)] text-base font-light tracking-wider">
                  {products[0].price}
                </p>
              </div>
            </div>
          </m.div>

          {/* Spacer for asymmetry */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Product 2 */}
          <m.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3 lg:mt-24"
          >
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
                <OptimizedImage
                  src={products[1].image}
                  fallbackSrc={products[1].image}
                  alt={products[1].name}
                  fill
                  sizes={productImageSizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <button 
                  onClick={() => toggleWishlist(2)}
                  className="absolute top-6 right-6 w-11 h-11 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors duration-300 ${wishlist.includes(2) ? 'fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]' : 'text-[oklch(0.30_0.03_50)]'}`} 
                    strokeWidth={1.5} 
                  />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <button className="w-full py-3.5 bg-[oklch(0.99_0.005_80)] text-[oklch(0.20_0.02_50)] text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.95_0.01_75)] transition-colors duration-300">
                    Quick Shop
                  </button>
                </div>
              </div>
              
              <div className="mt-6 px-1">
                <h3 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-2 group-hover:text-[oklch(0.40_0.04_55)] transition-colors duration-500">
                  {products[1].name}
                </h3>
                <p className="text-[oklch(0.50_0.04_55)] text-sm font-light tracking-wider">
                  {products[1].price}
                </p>
              </div>
            </div>
          </m.div>

          {/* Product 3 */}
          <m.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3 lg:mt-8"
          >
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
                <OptimizedImage
                  src={products[2].image}
                  fallbackSrc={products[2].image}
                  alt={products[2].name}
                  fill
                  sizes={productImageSizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-2 bg-[oklch(0.18_0.02_50)] text-[oklch(0.95_0.01_80)] text-[8px] tracking-[0.25em] uppercase font-light">
                    {products[2].tag}
                  </span>
                </div>
                
                <button 
                  onClick={() => toggleWishlist(3)}
                  className="absolute top-6 right-6 w-11 h-11 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors duration-300 ${wishlist.includes(3) ? 'fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]' : 'text-[oklch(0.30_0.03_50)]'}`} 
                    strokeWidth={1.5} 
                  />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <button className="w-full py-3.5 bg-[oklch(0.99_0.005_80)] text-[oklch(0.20_0.02_50)] text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.95_0.01_75)] transition-colors duration-300">
                    Quick Shop
                  </button>
                </div>
              </div>
              
              <div className="mt-6 px-1">
                <h3 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-2 group-hover:text-[oklch(0.40_0.04_55)] transition-colors duration-500">
                  {products[2].name}
                </h3>
                <p className="text-[oklch(0.50_0.04_55)] text-sm font-light tracking-wider">
                  {products[2].price}
                </p>
              </div>
            </div>
          </m.div>

          {/* Product 4 - Offset position */}
          <m.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3 lg:col-start-7 lg:-mt-32"
          >
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
                <OptimizedImage
                  src={products[3].image}
                  fallbackSrc={products[3].image}
                  alt={products[3].name}
                  fill
                  sizes={productImageSizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <button 
                  onClick={() => toggleWishlist(4)}
                  className="absolute top-6 right-6 w-11 h-11 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors duration-300 ${wishlist.includes(4) ? 'fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]' : 'text-[oklch(0.30_0.03_50)]'}`} 
                    strokeWidth={1.5} 
                  />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <button className="w-full py-3.5 bg-[oklch(0.99_0.005_80)] text-[oklch(0.20_0.02_50)] text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.95_0.01_75)] transition-colors duration-300">
                    Quick Shop
                  </button>
                </div>
              </div>
              
              <div className="mt-6 px-1">
                <h3 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-2 group-hover:text-[oklch(0.40_0.04_55)] transition-colors duration-500">
                  {products[3].name}
                </h3>
                <p className="text-[oklch(0.50_0.04_55)] text-sm font-light tracking-wider">
                  {products[3].price}
                </p>
              </div>
            </div>
          </m.div>
        </div>

        {/* View All CTA */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-28 md:mt-36 lg:mt-44 flex justify-center"
        >
          <Link
            href={ROUTES.category("new-in")}
            className="group relative inline-block px-14 py-5 bg-transparent border border-[oklch(0.25_0.02_50)] text-[oklch(0.25_0.02_50)] text-[10px] tracking-[0.35em] uppercase font-medium overflow-hidden transition-all duration-700 hover:tracking-[0.4em]"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[oklch(0.98_0.005_80)]">
              View All New Arrivals
            </span>
            <div className="absolute inset-0 bg-[oklch(0.22_0.02_50)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          </Link>
        </m.div>
      </div>
    </section>
  )
}
