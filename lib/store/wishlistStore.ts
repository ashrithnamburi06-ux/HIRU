"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  wishlist: WishlistItem[];

  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;

  isWishlisted: (id: string) => boolean;
  wishlistCount: () => number;
}

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        wishlist: [],

        addToWishlist: (item) => {
          const exists = get().wishlist.find(
            (wishlistItem) =>
              wishlistItem.id === item.id
          );

          if (!exists) {
            set({
              wishlist: [
                ...get().wishlist,
                item,
              ],
            });
          }
        },

        removeFromWishlist: (id) => {
          set({
            wishlist: get().wishlist.filter(
              (item) => item.id !== id
            ),
          });
        },

        toggleWishlist: (item) => {
          const exists = get().wishlist.find(
            (wishlistItem) =>
              wishlistItem.id === item.id
          );

          if (exists) {
            get().removeFromWishlist(item.id);
          } else {
            get().addToWishlist(item);
          }
        },

        isWishlisted: (id) => {
          return get().wishlist.some(
            (item) => item.id === id
          );
        },

        wishlistCount: () =>
          get().wishlist.length,
      }),
      {
        name: "hiru-wishlist-storage",
      }
    )
  );