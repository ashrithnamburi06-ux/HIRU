"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Product } from "@/lib/products"

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  pinCode: string
  phone: string
  email: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  total: number
  shippingAddress: ShippingAddress
  status: "Processing" | "Shipped" | "Delivered"
}

export interface User {
  name: string
  email: string
}

interface CartWishlistContextType {
  cart: CartItem[]
  wishlist: number[]
  user: User | null
  orders: Order[]
  isLoaded: boolean
  // Cart Drawer
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  // Quick View Modal
  quickViewProductId: number | null
  openQuickView: (id: number) => void
  closeQuickView: () => void
  // Recently Viewed
  recentlyViewed: number[]
  addToRecentlyViewed: (productId: number) => void
  // Cart actions
  addToCart: (product: Product, quantity: number, size: string) => void
  removeFromCart: (productId: number, size: string) => void
  updateCartQuantity: (productId: number, size: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  login: (email: string, name?: string) => void
  register: (name: string, email: string) => void
  logout: () => void
  placeOrder: (address: ShippingAddress) => Order
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined)

export function CartWishlistProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProductId, setQuickViewProductId] = useState<number | null>(null)
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([])

  // Load from localStorage only after mount to prevent SSR mismatch
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("hiru_cart")
      const storedWishlist = localStorage.getItem("hiru_wishlist")
      const storedUser = localStorage.getItem("hiru_user")
      const storedOrders = localStorage.getItem("hiru_orders")

      if (storedCart) setCart(JSON.parse(storedCart))
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist))
      if (storedUser) setUser(JSON.parse(storedUser))
      if (storedOrders) setOrders(JSON.parse(storedOrders))
      const storedRecent = localStorage.getItem("hiru_recently_viewed")
      if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent))
    } catch (e) {
      console.error("Error reading localStorage", e)
    }
    setIsLoaded(true)
  }, [])

  // Sync state to localStorage when values change
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("hiru_cart", JSON.stringify(cart))
  }, [cart, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("hiru_wishlist", JSON.stringify(wishlist))
  }, [wishlist, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    if (user) {
      localStorage.setItem("hiru_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("hiru_user")
    }
  }, [user, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("hiru_orders", JSON.stringify(orders))
  }, [orders, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("hiru_recently_viewed", JSON.stringify(recentlyViewed))
  }, [recentlyViewed, isLoaded])

  // Cart Drawer controls
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  // Quick View controls
  const openQuickView = (id: number) => setQuickViewProductId(id)
  const closeQuickView = () => setQuickViewProductId(null)

  // Recently viewed
  const addToRecentlyViewed = (productId: number) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      return [productId, ...filtered].slice(0, 8)
    })
  }

  const addToCart = (product: Product, quantity: number, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      )
      if (existingIndex > -1) {
        const nextCart = [...prev]
        nextCart[existingIndex].quantity += quantity
        return nextCart
      }
      return [...prev, { product, quantity, size }]
    })
  }

  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)))
  }

  const updateCartQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId)
  }

  const login = (email: string, name?: string) => {
    setUser({
      name: name || "Eleanor Vance",
      email: email,
    })
  }

  const register = (name: string, email: string) => {
    setUser({
      name,
      email,
    })
  }

  const logout = () => {
    setUser(null)
    setOrders([]) // Reset order history for current demo session when logging out
  }

  const placeOrder = (address: ShippingAddress): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const shipping = subtotal > 4999 ? 0 : 250
    const tax = Math.round(subtotal * 0.18) // 18% GST
    const total = subtotal + shipping + tax

    const newOrder: Order = {
      id: "HIRU-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      items: [...cart],
      subtotal,
      total,
      shippingAddress: address,
      status: "Processing",
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        user,
        orders,
        isLoaded,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        quickViewProductId,
        openQuickView,
        closeQuickView,
        recentlyViewed,
        addToRecentlyViewed,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        login,
        register,
        logout,
        placeOrder,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  )
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext)
  if (context === undefined) {
    throw new Error("useCartWishlist must be used within a CartWishlistProvider")
  }
  return context
}
