import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useCartWishlist } from "@/context/CartWishlistContext";

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    priceString: string;
    image: string;
    tag?: string | null;
    categoryName?: string;
  };
  /**
   * When true, the image will be loaded with priority.
   * Determine based on grid position / viewport.
   */
  priority?: boolean;
}

/**
 * Premium reusable product card.
 * - Uses next/image with lazy loading (priority for first‑row items).
 * - Simple hover scale animation (no entrance stagger).
 * - Wishlist button with elegant overlay.
 */
export const ProductCard = React.memo(function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useCartWishlist();
  const isSaved = isInWishlist(product.id);

  return (
    <Link href={`/product/${product.id}`} className="group cursor-pointer block">
      <motion.div
        whileHover={{ scale: 1.06 }}
        className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)]"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          className="w-full h-full object-cover"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        {/* Tag */}
        {product.tag && (
          <div className="absolute top-6 left-6">
            <span className="inline-block px-4 py-2 bg-[oklch(0.18_0.02_50)] text-[oklch(0.95_0.01_80)] text-[8px] tracking-[0.25em] uppercase font-light">
              {product.tag}
            </span>
          </div>
        )}
        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-6 right-6 w-10 h-10 bg-[oklch(0.99_0.005_80)]/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              isSaved
                ? "fill-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)]"
                : "text-[oklch(0.30_0.03_50)]"
            }`}
            strokeWidth={1.5}
          />
        </button>
        {/* Quick Add placeholder – parent can overlay if needed */}
      </motion.div>
      <div className="mt-6 px-1 flex justify-between items-start gap-4">
        <div>
          <h3 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light tracking-wide mb-1 group-hover:text-[oklch(0.40_0.04_55)] transition-colors duration-500">
            {product.name}
          </h3>
          {product.categoryName && (
            <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-wider uppercase font-light">
              {product.categoryName}
            </p>
          )}
        </div>
        <p className="text-[oklch(0.22_0.02_50)] text-sm font-medium tracking-wider">
          {product.priceString}
        </p>
      </div>
    </Link>
  );
});
