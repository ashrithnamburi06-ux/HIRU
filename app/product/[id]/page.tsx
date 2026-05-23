"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Plus, Minus, Star, ChevronDown, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { products, Product, Review } from "@/lib/products"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params)
  const productId = Number(resolvedParams.id)
  const product = products.find((p) => p.id === productId)

  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist()
  const { toast } = useToast()

  const [activeImage, setActiveImage] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" })
  const [reviewsList, setReviewsList] = useState<Review[]>([])
  
  // Review form states
  const [reviewerName, setReviewerName] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0] || product.image)
      setReviewsList(product.reviews)
      setSelectedSize("")
      setQuantity(1)
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen bg-[oklch(0.97_0.008_75)] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[oklch(0.22_0.02_50)] font-light mb-4">Piece Not Found</h2>
        <p className="text-[oklch(0.55_0.03_55)] text-sm mb-8">The luxury piece you are looking for might have been archived.</p>
        <Link
          href="/collections"
          className="px-8 py-4 bg-[oklch(0.22_0.02_50)] text-[oklch(0.98_0.005_80)] text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors"
        >
          Return to Collections
        </Link>
      </div>
    )
  }

  const isSaved = isInWishlist(product.id)

  // Handle image zoom on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.7)",
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    })
  }

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please Select Size",
        description: "Choose a size before adding the item to your cart.",
        variant: "destructive",
      })
      return
    }

    addToCart(product, quantity, selectedSize)
    toast({
      title: "Added to Cart",
      description: `${product.name} (Size ${selectedSize}, Qty ${quantity}) has been added.`,
    })
  }

  // Handle Wishlist Toggle
  const handleWishlistToggle = () => {
    toggleWishlist(product.id)
    toast({
      title: isSaved ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isSaved ? "removed from" : "added to"} your wishlist.`,
    })
  }

  // Handle Add Review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewerName.trim() || !reviewComment.trim()) {
      toast({
        title: "Invalid Review Form",
        description: "Please fill out all fields before submitting.",
        variant: "destructive",
      })
      return
    }

    const newReview: Review = {
      id: Date.now(),
      author: reviewerName,
      rating: reviewRating,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      comment: reviewComment,
    }

    setReviewsList((prev) => [newReview, ...prev])
    setReviewerName("")
    setReviewRating(5)
    setReviewComment("")

    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your experience.",
    })
  }

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Breadcrumbs */}
        <div className="py-6 text-[10px] tracking-[0.2em] uppercase font-light text-[oklch(0.55_0.03_55)] mb-8 border-b border-[oklch(0.90_0.01_75)]/40 flex items-center gap-2">
          <Link href="/" className="hover:text-[oklch(0.22_0.02_50)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[oklch(0.22_0.02_50)] transition-colors">Collections</Link>
          <span>/</span>
          <Link href={`/collections?category=${product.category}`} className="hover:text-[oklch(0.22_0.02_50)] transition-colors">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-[oklch(0.22_0.02_50)] font-normal">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Image Gallery & Thumbnails */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            {/* Thumbnails (Side column on desktop/tablet, row on mobile) */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible w-full md:w-20 scrollbar-none py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[3/4] w-16 md:w-20 overflow-hidden flex-shrink-0 bg-zinc-100 border transition-all duration-300 ${
                    activeImage === img ? "border-[oklch(0.22_0.02_50)] shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} gallery ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Interactive Zoom Image */}
            <div className="flex-1 order-1 md:order-2">
              <div
                className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)] cursor-zoom-in border border-[oklch(0.90_0.01_75)]/30"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  style={zoomStyle}
                  className="w-full h-full object-cover transition-transform duration-100 ease-out"
                />
                
                {product.tag && (
                  <span className="absolute top-6 left-6 px-4 py-2 bg-[oklch(0.18_0.02_50)] text-[oklch(0.95_0.01_80)] text-[8px] tracking-[0.25em] uppercase font-light">
                    {product.tag}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Checkout Actions */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[oklch(0.55_0.03_55)] text-[10px] tracking-[0.4em] uppercase mb-4">
              {product.categoryName}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[oklch(0.22_0.02_50)] font-extralight tracking-wide leading-tight mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-current" : "text-zinc-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-[oklch(0.35_0.02_50)] font-light">
                {product.rating} ({reviewsList.length} reviews)
              </span>
            </div>

            <p className="text-[oklch(0.22_0.02_50)] text-xl font-medium tracking-wider mb-8">
              {product.priceString}
            </p>

            <p className="text-[oklch(0.50_0.03_55)] text-sm font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs tracking-[0.2em] uppercase font-medium text-[oklch(0.22_0.02_50)]">
                  Select Size
                </span>
                <button className="text-[oklch(0.55_0.03_55)] text-[10px] tracking-[0.15em] uppercase hover:text-[oklch(0.22_0.02_50)] transition-colors underline font-light">
                  Size Guide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  // Mocking "XS" as out of stock for Silk Drape Dress for realistic luxury feel
                  const isOutOfStock = product.id === 1 && size === "XS"
                  const isSelected = selectedSize === size

                  return (
                    <button
                      key={size}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 min-w-12 px-4 flex items-center justify-center text-xs tracking-widest border transition-all duration-300 ${
                        isOutOfStock
                          ? "border-zinc-200 text-zinc-300 cursor-not-allowed line-through bg-zinc-50/50"
                          : isSelected
                          ? "border-[oklch(0.22_0.02_50)] bg-[oklch(0.22_0.02_50)] text-white"
                          : "border-[oklch(0.85_0.01_75)] text-[oklch(0.22_0.02_50)] hover:border-[oklch(0.22_0.02_50)] hover:bg-zinc-50"
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-10">
              <span className="block text-xs tracking-[0.2em] uppercase font-medium text-[oklch(0.22_0.02_50)] mb-4">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[oklch(0.85_0.01_75)] h-12 bg-transparent">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-4 text-[oklch(0.35_0.02_50)] hover:text-[oklch(0.22_0.02_50)] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-xs font-medium text-[oklch(0.22_0.02_50)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 text-[oklch(0.35_0.02_50)] hover:text-[oklch(0.22_0.02_50)] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="flex gap-4 mb-10">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4.5 bg-[oklch(0.22_0.02_50)] text-white text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors shadow-sm duration-300"
              >
                Add To Cart
              </button>

              {/* Add to Wishlist */}
              <button
                onClick={handleWishlistToggle}
                className="w-14 h-14 border border-[oklch(0.85_0.01_75)] flex items-center justify-center text-[oklch(0.30_0.03_50)] hover:border-[oklch(0.22_0.02_50)] hover:text-[oklch(0.22_0.02_50)] transition-colors duration-300"
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]" : ""}`} strokeWidth={1.5} />
              </button>
            </div>

            {/* Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-t border-b border-zinc-200">
                <AccordionTrigger className="text-xs tracking-[0.2em] uppercase font-light text-[oklch(0.22_0.02_50)] py-4 hover:no-underline">
                  Fabric & Details
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2 text-xs text-[oklch(0.50_0.03_55)] font-light leading-relaxed">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-zinc-200">
                <AccordionTrigger className="text-xs tracking-[0.2em] uppercase font-light text-[oklch(0.22_0.02_50)] py-4 hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[oklch(0.50_0.03_55)] font-light leading-relaxed space-y-2">
                  <p>Complimentary express shipping on all orders over ₹4,999.</p>
                  <p>Easy returns and exchanges within 14 days of delivery. Terms apply.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-[oklch(0.90_0.01_75)] pt-16 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Reviews List */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light mb-8">
                Customer Reviews ({reviewsList.length})
              </h2>

              {reviewsList.length > 0 ? (
                <div className="space-y-8 divide-y divide-zinc-200/60">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="pt-6 first:pt-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-medium text-[oklch(0.22_0.02_50)]">{rev.author}</p>
                          <div className="flex items-center text-amber-500 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-current" : "text-zinc-200"}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-[oklch(0.55_0.03_55)] font-light">{rev.date}</span>
                      </div>
                      <p className="text-xs text-[oklch(0.50_0.03_55)] font-light leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[oklch(0.55_0.03_55)] font-light italic">
                  Be the first to review this piece.
                </p>
              )}
            </div>

            {/* Add Review Form */}
            <div className="lg:col-span-5 bg-[oklch(0.95_0.01_80)] p-8 border border-[oklch(0.90_0.01_75)]/30">
              <h3 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light mb-6">
                Write a Review
              </h3>
              
              <form onSubmit={handleAddReview} className="space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setReviewRating(val)}
                        className="text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${val <= reviewRating ? "fill-current" : "text-zinc-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                    Comments
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300 resize-none"
                    placeholder="Share your thoughts about the fabric, fit, and elegance..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4.5 bg-[oklch(0.22_0.02_50)] text-white text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[oklch(0.90_0.01_75)] pt-16">
            <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light text-center mb-12">
              YOU MAY ALSO <span className="italic">Adore</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => {
                return (
                  <Link key={rel.id} href={`/product/${rel.id}`} className="group cursor-pointer block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    <div className="mt-6 px-1 flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-serif text-base text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-1 group-hover:text-[oklch(0.40_0.04_55)] transition-colors duration-500">
                          {rel.name}
                        </h3>
                        <p className="text-[oklch(0.55_0.03_55)] text-[10px] tracking-wider uppercase font-light">
                          {rel.categoryName}
                        </p>
                      </div>
                      <p className="text-[oklch(0.22_0.02_50)] text-sm font-medium tracking-wider">
                        {rel.priceString}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
