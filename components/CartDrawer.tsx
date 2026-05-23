"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useCartWishlist } from "@/context/CartWishlistContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateCartQuantity,
    toggleCart,
  } = useCartWishlist();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  // Focus trap (basic)
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isCartOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isCartOpen]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 4999 ? 0 : 250;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <Dialog open={isCartOpen} onOpenChange={(open) => { if (!open) closeCart(); }}>
          <DialogContent className="p-0">
            {/* Accessible hidden title/description */}
            <DialogTitle className="sr-only">Shopping Cart</DialogTitle>
            <DialogDescription className="sr-only">Review items in your shopping cart.</DialogDescription>
            <motion.aside
              ref={drawerRef}
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium text-[oklch(0.22_0.02_50)]">Your Cart</h2>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-[oklch(0.90_0.01_75)]/20 transition"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5 text-[oklch(0.30_0.03_50)]" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-[oklch(0.40_0.04_55)]">Your luxury selections await.</p>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded overflow-hidden bg-[oklch(0.93_0.015_75)]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[oklch(0.22_0.02_50)]">{item.product.name}</h3>
                        <p className="text-sm text-[oklch(0.45_0.02_55)]">Size: {item.size}</p>
                        <p className="text-sm font-medium text-[oklch(0.22_0.02_50)]">{item.product.priceString}</p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQuantity(item.product.id, item.size, Number(e.target.value))
                          }
                          className="w-12 text-center border rounded focus:outline-none"
                        />
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-[oklch(0.35_0.02_50)] hover:text-[oklch(0.20_0.02_50)] transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{`₹${subtotal.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>{`₹${tax.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{`₹${total.toLocaleString()}`}</span>
                  </div>
                  <button
                    onClick={() => {
                      window.location.href = "/checkout";
                    }}
                    className="w-full py-2 mt-2 bg-[oklch(0.22_0.02_50)] text-white rounded hover:bg-[oklch(0.22_0.02_55)] transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.aside>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
