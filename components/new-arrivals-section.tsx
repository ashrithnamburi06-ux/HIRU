"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Silk Drape Dress", price: "₹18,999", image: "/images/product-silk-dress.jpg", tag: "New" },
  { id: 2, name: "Cashmere Blazer", price: "₹24,499", image: "/images/product-cashmere-blazer.jpg", tag: null },
  { id: 3, name: "Satin Evening Skirt", price: "₹12,999", image: "/images/product-satin-skirt.jpg", tag: "Bestseller" },
  { id: 4, name: "Linen Co-ord Set", price: "₹19,999", image: "/images/product-linen-coord.jpg", tag: null },
];

export function NewArrivalsSection() {
  return (
    <section className="py-32 md:py-40 lg:py-48 bg-[oklch(0.97_0.008_75)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-28 lg:mb-36"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.div
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
                NEW<br />
                <span className="italic font-light text-[oklch(0.40_0.04_55)]">Arrivals</span>
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xs text-[oklch(0.50_0.03_55)] text-sm font-light leading-relaxed tracking-wide"
            >
              Discover our latest collection of timeless pieces, designed for the modern woman who values quiet elegance.
            </motion.p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                priceString: p.price,
                image: p.image,
                tag: p.tag,
              }}
              priority={idx < 4}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-28 md:mt-36 lg:mt-44 flex justify-center"
        >
          <button className="group relative px-14 py-5 bg-transparent border border-[oklch(0.25_0.02_50)] text-[oklch(0.25_0.02_50)] text-[10px] tracking-[0.35em] uppercase font-medium overflow-hidden transition-all duration-700 hover:tracking-[0.4em]">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[oklch(0.98_0.005_80)]">
              View All New Arrivals
            </span>
            <div className="absolute inset-0 bg-[oklch(0.22_0.02_50)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
