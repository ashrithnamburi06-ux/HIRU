"use client"

import React from 'react'
import { CartWishlistProvider } from '@/context/CartWishlistContext'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import { CartDrawer } from '@/components/CartDrawer'
import { QuickViewModal } from '@/components/QuickViewModal'

interface LayoutClientProps {
  children: React.ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
  return (
    <CartWishlistProvider>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <Toaster />
      {/* Global UI overlays */}
      <CartDrawer />
      <QuickViewModal />
    </CartWishlistProvider>
  )
}
