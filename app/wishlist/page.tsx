"use client"

import React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { products, Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist()
  const { toast } = useToast()

  // Get matching products in the wishlist
  const wishlistItems = products.filter((p) => wishlist.includes(p.id))

  const handleRemove = (e: React.MouseEvent, productId: number, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(productId)
    toast({
      title: "Removed from Wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    // Add default size (usually first available size, like 'M')
    const size = product.sizes[0] || "M"
    addToCart(product, 1, size)
    toast({
      title: "Added to Cart",
      description: `${product.name} (Size ${size}) has been added to your shopping bag.`,
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <h1 className="font-serif text-3xl md:text-4xl text-[oklch(0.22_0.02_50)] font-extralight tracking-wide mb-12 text-center">
          YOUR <span className="italic">Wishlist</span>
        </h1>

        <AnimatePresence mode="wait">
          {wishlistItems.length > 0 ? (
            <motion.div
              key="wishlist-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-[oklch(0.90_0.01_75)]/30 shadow-[0_2px_15px_rgba(0,0,0,0.01)] flex flex-col justify-between"
                >
                  <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
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

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={(e) => handleRemove(e, product.id, product.name)}
                      className="absolute top-4 right-4 w-9 h-9 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[oklch(0.55_0.15_25)] hover:scale-110 transition-transform shadow-sm"
                    >
                      <Heart className="w-4 h-4 fill-current text-[oklch(0.55_0.15_25)]" />
                    </button>
                  </Link>

                  {/* Product Details & Actions */}
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-serif text-base text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-1 hover:text-[oklch(0.40_0.04_55)]">
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="text-[oklch(0.55_0.03_55)] text-[10px] tracking-wider uppercase font-light">
                          {product.categoryName}
                        </p>
                      </div>
                      <p className="text-[oklch(0.22_0.02_50)] text-sm font-medium tracking-wider">
                        {product.priceString}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="flex-1 py-3.5 bg-[oklch(0.22_0.02_50)] text-white text-[9px] tracking-[0.25em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Add To Bag
                      </button>
                      
                      <button
                        onClick={(e) => handleRemove(e, product.id, product.name)}
                        className="w-11 h-11 border border-[oklch(0.85_0.01_75)] flex items-center justify-center text-[oklch(0.55_0.03_55)] hover:border-[oklch(0.55_0.15_25)] hover:text-[oklch(0.55_0.15_25)] transition-colors duration-300"
                        title="Remove piece"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="wishlist-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white border border-[oklch(0.90_0.01_75)]/30 max-w-xl mx-auto p-12"
            >
              <div className="w-16 h-16 bg-[oklch(0.97_0.008_75)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6 text-[oklch(0.35_0.02_50)]" strokeWidth={1.2} />
              </div>
              <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light mb-4">Your wishlist is empty</h2>
              <p className="text-[oklch(0.50_0.03_55)] text-xs font-light leading-relaxed mb-8">
                Bookmark and curate items you love, saving them for seasonal shopping lists or private collections.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 px-10 py-4.5 bg-[oklch(0.22_0.02_50)] text-[oklch(0.98_0.005_80)] text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300"
              >
                Curate Collections
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
