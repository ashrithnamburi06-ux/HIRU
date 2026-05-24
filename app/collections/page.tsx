"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Search as SearchIcon, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link"
import Image from "next/image"
import { products, Product } from "@/lib/products"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

const categoriesList = [
  { id: "all", name: "All" },
  { id: "dresses", name: "Dresses" },
  { id: "blazers", name: "Blazers" },
  { id: "skirts", name: "Skirts" },
  { id: "coord-sets", name: "Co-ord Sets" },
]

function CollectionsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toggleWishlist, isInWishlist, addToCart } = useCartWishlist()
  const { toast } = useToast()

  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Sync category from URL query parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      // Handle "new" or "bestseller" by selecting correct tag filtering later,
      // but for categories tabs set appropriately
      if (["dresses", "blazers", "skirts", "coord-sets"].includes(categoryParam)) {
        setActiveCategory(categoryParam)
      } else {
        setActiveCategory("all")
      }
    } else {
      setActiveCategory("all")
    }
    setCurrentPage(1)
  }, [searchParams])

  // Filter products
  const filteredProducts = products.filter((product) => {
    // 1. Category tab check
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory

    // 2. URL searchParams tags check (New / Bestseller)
    const categoryParam = searchParams.get("category")
    const matchesUrlTag =
      !categoryParam ||
      ["dresses", "blazers", "skirts", "coord-sets"].includes(categoryParam) ||
      (categoryParam === "new" && product.tag === "New") ||
      (categoryParam === "bestseller" && product.tag === "Bestseller")

    // 3. Search query check
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesUrlTag && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0 // default "featured" order
  })

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleWishlistToggle = (e: React.MouseEvent, productId: number, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(productId)
    const inWishlist = isInWishlist(productId)
    toast({
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${name} has been ${inWishlist ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1, product.sizes[0] || "M")
    toast({
      title: "Added to Cart",
      description: `${product.name} (Size ${product.sizes[0] || "M"}) has been added to your cart.`,
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      {/* Header Banner */}
      <div className="py-12 md:py-20 text-center px-6">
        <p className="text-[oklch(0.55_0.04_55)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4">
          Hiru Elegance
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[oklch(0.22_0.02_50)] font-extralight tracking-tight mb-4">
          THE COLLECTIONS
        </h1>
        <p className="max-w-md mx-auto text-[oklch(0.50_0.03_55)] text-xs md:text-sm font-light leading-relaxed">
          Quiet luxury silhouettes designed to outlast seasons and trends. Crafted with exquisite attention to detail.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 border-b border-[oklch(0.90_0.01_75)] pb-8">
          {/* Categories Tab */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-none">
            {categoriesList.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setCurrentPage(1)
                  router.push("/collections") // clear URL query params when switching tabs manually
                }}
                className={`px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 font-light border-b whitespace-nowrap ${
                  activeCategory === category.id
                    ? "border-[oklch(0.22_0.02_50)] text-[oklch(0.22_0.02_50)] font-normal"
                    : "border-transparent text-[oklch(0.55_0.03_55)] hover:text-[oklch(0.22_0.02_50)]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-end items-center">
            {/* Search Box */}
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-[oklch(0.22_0.02_50)] text-xs tracking-wider focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-[oklch(0.55_0.03_55)]"
              />
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.55_0.03_55)]" strokeWidth={1.5} />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-[oklch(0.22_0.02_50)] text-xs tracking-wider focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[oklch(0.55_0.03_55)]">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {paginatedProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={500}
                      height={600}
                      className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-[oklch(0.22_0.02_50)]">
                    {product.name}
                  </h3>
                  <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-wider uppercase font-light">
                    {product.categoryName}
                  </p>
                  <p className="text-[oklch(0.22_0.02_50)] text-sm font-medium tracking-wider">
                    {product.priceString}
                  </p>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-[oklch(0.55_0.03_55)] text-sm tracking-wider uppercase font-light mb-6">
                No pieces found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                  router.push("/collections")
                }}
                className="px-10 py-4 bg-[oklch(0.22_0.02_50)] text-[oklch(0.98_0.005_80)] text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 border border-[oklch(0.85_0.01_75)] rounded-full transition-colors ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[oklch(0.22_0.02_50)] hover:text-white text-[oklch(0.22_0.02_50)]"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs text-[oklch(0.22_0.02_50)] tracking-widest font-light">
              PAGE {currentPage} OF {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 border border-[oklch(0.85_0.01_75)] rounded-full transition-colors ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[oklch(0.22_0.02_50)] hover:text-white text-[oklch(0.22_0.02_50)]"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[oklch(0.97_0.008_75)] flex items-center justify-center">
        <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-[0.4em] uppercase animate-pulse">Loading Collection...</p>
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  )
}
