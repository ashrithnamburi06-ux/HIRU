"use client"

import React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useCartWishlist()
  const { toast } = useToast()

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 250
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleQtyChange = (productId: number, size: string, currentQty: number, change: number) => {
    const newQty = currentQty + change
    updateCartQuantity(productId, size, newQty)
    if (newQty <= 0) {
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
      })
    }
  }

  const handleRemoveItem = (productId: number, size: string, name: string) => {
    removeFromCart(productId, size)
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <h1 className="font-serif text-3xl md:text-4xl text-[oklch(0.22_0.02_50)] font-extralight tracking-wide mb-12 text-center">
          YOUR <span className="italic">Shopping Bag</span>
        </h1>

        <AnimatePresence mode="wait">
          {cart.length > 0 ? (
            <motion.div
              key="cart-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-6">
                {cart.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-[oklch(0.90_0.01_75)]/30 shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
                  >
                    {/* Item Image */}
                    <div className="relative aspect-[3/4] w-full sm:w-28 bg-[oklch(0.93_0.015_75)] overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light hover:text-[oklch(0.40_0.04_55)] transition-colors">
                            <Link href={`/product/${item.product.id}`}>{item.product.name}</Link>
                          </h3>
                          <p className="text-sm font-medium text-[oklch(0.22_0.02_50)]">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                        
                        <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-wider uppercase font-light mb-4">
                          Size: <span className="font-normal text-[oklch(0.22_0.02_50)]">{item.size}</span>
                        </p>
                      </div>

                      {/* Controls Row */}
                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Counter */}
                        <div className="inline-flex items-center border border-[oklch(0.85_0.01_75)] h-9 bg-transparent">
                          <button
                            onClick={() => handleQtyChange(item.product.id, item.size, item.quantity, -1)}
                            className="px-3 text-[oklch(0.35_0.02_50)] hover:text-[oklch(0.22_0.02_50)] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-xs font-medium text-[oklch(0.22_0.02_50)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item.product.id, item.size, item.quantity, 1)}
                            className="px-3 text-[oklch(0.35_0.02_50)] hover:text-[oklch(0.22_0.02_50)] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.size, item.product.name)}
                          className="text-[oklch(0.55_0.03_55)] hover:text-[oklch(0.55_0.15_25)] transition-colors p-2 -mr-2"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light mb-6 pb-4 border-b border-zinc-100">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs text-[oklch(0.50_0.03_55)] font-light">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[oklch(0.50_0.03_55)] font-light">
                    <span>Estimated Tax (GST 18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[oklch(0.50_0.03_55)] font-light">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-[oklch(0.55_0.15_25)] font-light mt-1">
                      Add {formatPrice(5000 - subtotal)} more for Complimentary Shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm font-medium text-[oklch(0.22_0.02_50)] mb-8 pt-4 border-t border-zinc-100">
                  <span>Grand Total</span>
                  <span className="text-lg">{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4.5 bg-[oklch(0.22_0.02_50)] text-white text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] flex items-center justify-center gap-3 transition-colors duration-300"
                >
                  Proceed To Checkout
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <p className="text-[10px] text-[oklch(0.55_0.03_55)] font-light text-center mt-4 leading-relaxed">
                  Complimentary Shipping and Duty-Free Imports on all items. Secure checkouts backed by advanced token encryption.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cart-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white border border-[oklch(0.90_0.01_75)]/30 max-w-xl mx-auto p-12"
            >
              <div className="w-16 h-16 bg-[oklch(0.97_0.008_75)] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-6 h-6 text-[oklch(0.35_0.02_50)]" strokeWidth={1.2} />
              </div>
              <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light mb-4">Your bag is empty</h2>
              <p className="text-[oklch(0.50_0.03_55)] text-xs font-light leading-relaxed mb-8">
                Explore the latest silhouettes and pieces to curate your timeless signature wardrobe.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 px-10 py-4.5 bg-[oklch(0.22_0.02_50)] text-[oklch(0.98_0.005_80)] text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300"
              >
                Curate Wardrobe
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
