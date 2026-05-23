"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Heart } from "lucide-react";
import { useCartWishlist } from "@/context/CartWishlistContext";
import { products } from "@/lib/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function QuickViewModal() {
  const {
    quickViewProductId,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cart,
  } = useCartWishlist();

  const product = products.find((p) => p.id === quickViewProductId) || null;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && quickViewProductId) closeQuickView();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [quickViewProductId, closeQuickView]);

  // Focus trap (simple)
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (quickViewProductId && modalRef.current) modalRef.current.focus();
  }, [quickViewProductId]);

  const [selectedSize, setSelectedSize] = React.useState<string>("M");
  const [quantity, setQuantity] = React.useState<number>(1);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      {quickViewProductId && (
        <Dialog open={true} onOpenChange={(open) => { if (!open) closeQuickView(); }}>
          <DialogHeader className="sr-only">
            <DialogTitle>Product Quick View</DialogTitle>
            <DialogDescription>Preview product details and add to cart.</DialogDescription>
          </DialogHeader>
          <DialogContent className="p-0"><DialogTitle className="sr-only">Product Quick View</DialogTitle><DialogDescription className="sr-only">Preview product details and add to cart.</DialogDescription>
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white w-full max-w-lg rounded-lg overflow-hidden shadow-xl relative"
              >
                <button
                  onClick={closeQuickView}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-[oklch(0.90_0.01_75)]/20 transition"
                  aria-label="Close quick view"
                >
                  <X className="w-5 h-5 text-[oklch(0.30_0.03_50)]" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image Gallery */}
                  <div className="relative h-80 md:h-auto">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Details */}
                  <div className="p-6 flex flex-col">
                    <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] mb-2">
                      {product.name}
                    </h2>
                    <p className="text-[oklch(0.40_0.04_55)] mb-2">{product.priceString}</p>
                    <p className="text-sm text-[oklch(0.55_0.03_55)] mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    {/* Size Selector */}
                    <div className="mb-4">
                      <label className="block text-[oklch(0.35_0.02_50)] mb-1">Size</label>
                      <div className="grid grid-cols-5 gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-1 border rounded ${size === selectedSize ? "bg-[oklch(0.22_0.02_50)] text-white" : "bg-white"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Quantity */}
                    <div className="mb-4">
                      <label className="block text-[oklch(0.35_0.02_50)] mb-1">Qty</label>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-16 border rounded text-center"
                      />
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-auto">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 py-2 bg-[oklch(0.22_0.02_50)] text-white rounded hover:bg-[oklch(0.22_0.02_55)] transition"
                      >
                        Add to Bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-2 rounded ${isSaved ? "bg-[oklch(0.55_0.15_25)]" : "bg-[oklch(0.93_0.015_75)]"}`}
                      >
                        <Heart
                          className={`w-5 h-5 ${isSaved ? "fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]" : ""}`}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
