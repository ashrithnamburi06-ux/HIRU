"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { User as UserIcon, Heart, Package, Settings, LogOut, ExternalLink, ShieldCheck } from "lucide-react"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { products } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, orders, wishlist, logout } = useCartWishlist()
  const { toast } = useToast()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("orders")
  const [profileName, setProfileName] = useState("")
  const [profileEmail, setProfileEmail] = useState("")
  const [profilePhone, setProfilePhone] = useState("+91 98765 43210")
  const [profileAddress, setProfileAddress] = useState("Malabar Hill, Mumbai, Maharashtra, 400006")

  // Check login state
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      setProfileName(user.name)
      setProfileEmail(user.email)
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-[oklch(0.97_0.008_75)] flex items-center justify-center">
        <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-[0.4em] uppercase animate-pulse">
          Authenticating...
        </p>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Signed Out",
      description: "You have successfully closed your session.",
    })
    router.push("/")
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your changes have been safely archived to your profile.",
    })
  }

  // Get matching wishlist products
  const wishlistPreview = products.filter((p) => wishlist.includes(p.id)).slice(0, 3)

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Profile Header Banner */}
        <div className="bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 md:p-12 mb-12 shadow-[0_2px_15px_rgba(0,0,0,0.01)] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[oklch(0.22_0.02_50)] text-[oklch(0.98_0.005_80)] flex items-center justify-center text-xl font-serif">
              {profileName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h1 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light">
                Hello, <span className="italic">{profileName}</span>
              </h1>
              <p className="text-xs text-[oklch(0.55_0.03_55)] font-light mt-1">
                HIRU Elite Member since May 2026
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-6 py-3 border border-[oklch(0.85_0.01_75)] text-[oklch(0.55_0.03_55)] text-[10px] tracking-[0.2em] uppercase font-light hover:border-[oklch(0.55_0.15_25)] hover:text-[oklch(0.55_0.15_25)] transition-colors flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

        {/* Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Tabs Selector */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "orders", name: "Orders", icon: Package },
              { id: "details", name: "Profile Details", icon: UserIcon },
              { id: "wishlist", name: "Saved Pieces", icon: Heart },
              { id: "settings", name: "Preferences", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-5 py-4 border text-xs tracking-wider transition-all duration-300 flex items-center gap-3.5 ${
                    isActive
                      ? "bg-[oklch(0.22_0.02_50)] text-white border-[oklch(0.22_0.02_50)] font-medium"
                      : "bg-white text-[oklch(0.35_0.02_50)] border-[oklch(0.90_0.01_75)]/30 hover:border-[oklch(0.22_0.02_50)] hover:text-[oklch(0.22_0.02_50)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              )
            })}
          </div>

          {/* Right Column Content Box */}
          <div className="lg:col-span-9 bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.01)] min-h-[400px]">
            
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light mb-8 pb-4 border-b border-zinc-100">
                  Your Order History
                </h2>

                {orders.length > 0 ? (
                  <div className="space-y-8">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-[oklch(0.90_0.01_75)]/50 p-6 shadow-sm"
                      >
                        {/* Order Meta info header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-100 mb-6 text-xs text-[oklch(0.35_0.02_50)] font-light">
                          <div>
                            <p className="font-medium text-[oklch(0.22_0.02_50)] text-sm mb-1">{order.id}</p>
                            <p>Placed on {order.date}</p>
                          </div>
                          <div className="text-right sm:text-right">
                            <span className="inline-block px-3 py-1 bg-[oklch(0.95_0.01_80)] text-[oklch(0.22_0.02_50)] border border-[oklch(0.85_0.01_75)] rounded-full text-[9px] tracking-wider uppercase font-medium">
                              {order.status}
                            </span>
                            <p className="mt-1">Total: {formatPrice(order.total)}</p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-4 mb-6">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-4">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-16 object-cover bg-zinc-50 border border-zinc-100 flex-shrink-0"
                              />
                              <div className="text-xs">
                                <h4 className="font-serif text-sm font-light text-[oklch(0.22_0.02_50)] mb-1">
                                  {item.product.name}
                                </h4>
                                <p className="text-[oklch(0.50_0.03_55)] font-light">
                                  Size: {item.size} | Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Address details */}
                        <div className="text-[11px] text-[oklch(0.50_0.03_55)] font-light bg-[oklch(0.97_0.008_75)] p-4 border border-zinc-100 flex justify-between items-center">
                          <div>
                            <p className="font-medium mb-1">Shipping Address:</p>
                            <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}</p>
                          </div>
                          <Link href={`/checkout?success=${order.id}`} className="text-[oklch(0.22_0.02_50)] hover:underline flex items-center gap-1.5 whitespace-nowrap pl-4">
                            Details
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-zinc-400">
                    <p className="text-xs uppercase tracking-widest mb-4">No orders placed yet.</p>
                    <Link href="/collections" className="text-xs text-[oklch(0.22_0.02_50)] font-medium underline">
                      Start Curating Your Wardrobe
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Profile Details Tab */}
            {activeTab === "details" && (
              <div>
                <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light mb-8 pb-4 border-b border-zinc-100">
                  Profile Details
                </h2>

                <form onSubmit={handleProfileSave} className="space-y-6 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                      Default Delivery Address
                    </label>
                    <textarea
                      rows={3}
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-4 bg-[oklch(0.22_0.02_50)] text-white text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Saved Pieces Tab */}
            {activeTab === "wishlist" && (
              <div>
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-100">
                  <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light">
                    Wishlist Preview
                  </h2>
                  <Link
                    href="/wishlist"
                    className="text-[oklch(0.22_0.02_50)] text-[10px] tracking-[0.25em] uppercase hover:underline font-light"
                  >
                    View All ({wishlist.length})
                  </Link>
                </div>

                {wishlistPreview.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {wishlistPreview.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        className="group border border-zinc-100 p-4 shadow-sm flex flex-col justify-between"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-[oklch(0.93_0.015_75)] mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-light text-[oklch(0.22_0.02_50)] mb-1 group-hover:text-[oklch(0.40_0.04_55)] transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[oklch(0.35_0.02_50)]">{item.priceString}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-zinc-400">
                    <p className="text-xs uppercase tracking-widest mb-4">No saved pieces.</p>
                    <Link href="/collections" className="text-xs text-[oklch(0.22_0.02_50)] font-medium underline">
                      Browse The Collection
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light mb-8 pb-4 border-b border-zinc-100">
                  Preferences
                </h2>

                <div className="space-y-6 text-xs text-[oklch(0.35_0.02_50)] font-light max-w-lg">
                  <div className="flex justify-between items-center p-4 border border-zinc-100">
                    <div>
                      <p className="font-medium text-[oklch(0.22_0.02_50)] text-sm mb-1">Email Newsletter</p>
                      <p>Receive alerts on private sales and seasonal collection releases.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 border-zinc-300 text-[oklch(0.22_0.02_50)]" />
                  </div>

                  <div className="flex justify-between items-center p-4 border border-zinc-100">
                    <div>
                      <p className="font-medium text-[oklch(0.22_0.02_50)] text-sm mb-1">SMS Notifications</p>
                      <p>Receive order dispatch updates and courier transit details.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 border-zinc-300 text-[oklch(0.22_0.02_50)]" />
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-100 flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[oklch(0.22_0.02_50)] text-sm mb-1">Authentication Security</h4>
                      <p className="leading-relaxed">Your data is secured using standard token storage. In compliance with data privacy policies, your credit card details are never stored on client nodes.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
