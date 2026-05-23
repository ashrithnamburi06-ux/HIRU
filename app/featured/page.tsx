"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { products, Product } from "@/lib/products"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

export default function FeaturedPage() {
  const { toggleWishlist, isInWishlist } = useCartWishlist()
  const { toast } = useToast()

  const featuredItems = products.filter((p) => p.isFeatured)

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    const isSaved = isInWishlist(product.id)
    toast({
      title: isSaved ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isSaved ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      {/* Editorial Header Banner */}
      <div className="relative h-[40svh] w-full overflow-hidden bg-[oklch(0.14_0.015_55)] mb-16">
        <img
          src="/images/brand-story-editorial.jpg"
          alt="Luxury brand story editorial banner background"
          className="w-full h-full object-cover object-[center_35%] opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.02_50)] via-[oklch(0.10_0.02_50)]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <p className="text-[oklch(0.85_0.02_80)] text-[10px] tracking-[0.5em] uppercase mb-4">
            Curated Showcase
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[oklch(0.98_0.005_80)] font-extralight tracking-tight mb-2">
            THE ETHEREAL EDIT
          </h1>
          <p className="max-w-md mx-auto text-[oklch(0.82_0.01_80)] text-xs font-light tracking-wide leading-relaxed">
            Quiet luxury silhouettes in whisper-soft fabrics designed for timeless elegance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((product) => {
            const isSaved = isInWishlist(product.id)
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white border border-[oklch(0.90_0.01_75)]/30 p-4 shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  />
                  
                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1.5 bg-[oklch(0.18_0.02_50)] text-[oklch(0.95_0.01_80)] text-[8px] tracking-[0.2em] uppercase font-light">
                      {product.tag}
                    </span>
                  )}

                  {/* Heart Button */}
                  <button
                    onClick={(e) => handleWishlistToggle(e, product)}
                    className="absolute top-4 right-4 w-9 h-9 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[oklch(0.30_0.03_50)] hover:scale-110 transition-transform shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]" : ""}`} strokeWidth={1.5} />
                  </button>
                </div>
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-base font-light text-[oklch(0.22_0.02_50)] mb-1 group-hover:text-[oklch(0.40_0.04_55)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-[oklch(0.55_0.03_55)] uppercase tracking-wider font-light">
                      {product.categoryName}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-[oklch(0.22_0.02_50)]">{product.priceString}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
