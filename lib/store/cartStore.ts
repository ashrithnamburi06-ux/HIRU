"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    size?: string
  ) => void;
  clearCart: () => void;

  cartCount: () => number;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existingItem = get().cart.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size
        );

        if (existingItem) {
          set({
            cart: get().cart.map((cartItem) =>
              cartItem.id === item.id &&
              cartItem.size === item.size
                ? {
                    ...cartItem,
                    quantity:
                      cartItem.quantity + item.quantity,
                  }
                : cartItem
            ),
          });
        } else {
          set({
            cart: [...get().cart, item],
          });
        }
      },

      removeFromCart: (id, size) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(item.id === id && item.size === size)
          ),
        });
      },

      updateQuantity: (id, quantity, size) => {
        if (quantity <= 0) return;

        set({
          cart: get().cart.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      cartCount: () =>
        get().cart.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      cartTotal: () =>
        get().cart.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "hiru-cart-storage",
    }
  )
);