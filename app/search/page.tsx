"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search as SearchIcon, ArrowRight, Heart } from "lucide-react"
import { products, Product } from "@/lib/products"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  
  const { toggleWishlist, isInWishlist } = useCartWishlist()
  const { toast } = useToast()

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query])

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
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[oklch(0.55_0.04_55)] text-[10px] tracking-[0.5em] uppercase mb-4">
            Curate Search
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[oklch(0.22_0.02_50)] mb-8">
            Search the <span className="italic">Collection</span>
          </h1>

          {/* Search Input Bar */}
          <div className="relative">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-5 bg-white border border-[oklch(0.85_0.01_75)] text-sm text-[oklch(0.22_0.02_50)] tracking-widest focus:outline-none focus:border-[oklch(0.22_0.02_50)] shadow-[0_4px_25px_rgba(0,0,0,0.02)] placeholder:text-zinc-300"
              placeholder="Search by silk, blazer, skirt, co-ord sets..."
            />
            <SearchIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[oklch(0.35_0.02_50)]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Results Showcase */}
        <AnimatePresence mode="wait">
          {query.trim() !== "" ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xs tracking-[0.25em] uppercase font-light text-[oklch(0.35_0.02_50)] mb-8 border-b border-zinc-200 pb-4">
                Search Results ({results.length})
              </h2>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((product) => {
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
              ) : (
                <div className="text-center py-16 text-zinc-400">
                  <p className="text-xs uppercase tracking-widest mb-2">No pieces found matching your criteria.</p>
                  <p className="text-[11px] font-light">Try searching for other words like &apos;silk&apos;, &apos;skirt&apos;, &apos;coord&apos;, or &apos;blazer&apos;.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="search-suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center py-12"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase font-light text-[oklch(0.35_0.02_50)] mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Silk", "Blazer", "Satin Skirt", "Linen Co-ord", "Dresses"].map((word) => (
                  <button
                    key={word}
                    onClick={() => setQuery(word)}
                    className="px-4 py-2 border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.35_0.02_50)] hover:border-[oklch(0.22_0.02_50)] hover:text-[oklch(0.22_0.02_50)] transition-colors rounded-full font-light"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
