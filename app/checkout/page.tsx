"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight, ShoppingBag, Landmark } from "lucide-react"
import { useCartWishlist, ShippingAddress } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

function CheckoutContent() {
  const { cart, placeOrder, orders } = useCartWishlist()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [successOrder, setSuccessOrder] = useState<any>(null)

  // Subtotal calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 250
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  // Check if we are viewing a success screen from URL query params
  const successParam = searchParams.get("success")

  useEffect(() => {
    if (successParam) {
      const order = orders.find((o) => o.id === successParam)
      if (order) {
        setSuccessOrder(order)
      }
    }
  }, [successParam, orders])

  // Redirect if cart is empty and not on success page
  useEffect(() => {
    if (cart.length === 0 && !successParam && !successOrder) {
      router.push("/cart")
    }
  }, [cart, successParam, successOrder, router])

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic Validation check
    const requiredFields = ["firstName", "lastName", "address", "city", "state", "pinCode", "phone", "email"]
    for (const key of requiredFields) {
      if (!formData[key as keyof ShippingAddress]) {
        toast({
          title: "Form Validation Error",
          description: "Please complete all shipping address fields.",
          variant: "destructive",
        })
        return
      }
    }

    // Place the order
    const completed = placeOrder(formData)
    toast({
      title: "Order Placed Successfully",
      description: `Your order ${completed.id} has been submitted.`,
    })
    
    // Redirect to success route
    router.replace(`/checkout?success=${completed.id}`)
  }

  // Render Order Success Screen
  if (successOrder) {
    return (
      <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 sm:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] text-center"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
          </div>

          <p className="text-[oklch(0.55_0.04_55)] text-[10px] tracking-[0.4em] uppercase mb-4">
            Reservation Confirmed
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[oklch(0.22_0.02_50)] mb-4">
            Thank You for Shopping with <span className="italic">HIRU</span>
          </h1>
          <p className="text-xs text-[oklch(0.50_0.03_55)] font-light max-w-md mx-auto mb-8 leading-relaxed">
            Your order has been recorded in our archives under reference ID <span className="font-semibold text-[oklch(0.22_0.02_50)]">{successOrder.id}</span>. 
            A dispatch summary has been sent to <span className="font-medium text-[oklch(0.22_0.02_50)]">{successOrder.shippingAddress.email}</span>.
          </p>

          <div className="border border-[oklch(0.90_0.01_75)]/40 p-6 text-left text-xs text-[oklch(0.50_0.03_55)] font-light space-y-4 mb-10 max-w-lg mx-auto bg-[oklch(0.97_0.008_75)]">
            <div className="flex justify-between border-b border-zinc-200/50 pb-2">
              <span className="font-medium">Estimated Delivery:</span>
              <span>3 - 5 Business Days</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200/50 pb-2">
              <span className="font-medium">Recipient Name:</span>
              <span>{successOrder.shippingAddress.firstName} {successOrder.shippingAddress.lastName}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200/50 pb-2">
              <span className="font-medium">Shipping Address:</span>
              <span>{successOrder.shippingAddress.address}, {successOrder.shippingAddress.city}, {successOrder.shippingAddress.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Price:</span>
              <span className="font-semibold text-[oklch(0.22_0.02_50)]">{formatPrice(successOrder.total)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/profile"
              className="px-8 py-4 border border-[oklch(0.85_0.01_75)] text-[oklch(0.22_0.02_50)] text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
            >
              Order History
            </Link>
            
            <Link
              href="/collections"
              className="px-8 py-4 bg-[oklch(0.22_0.02_50)] text-white text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // Render Checkout Input Form (Cart has items)
  if (cart.length === 0) return null

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <h1 className="font-serif text-3xl md:text-4xl text-[oklch(0.22_0.02_50)] font-extralight tracking-wide mb-12 text-center">
          SECURE <span className="italic">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Delivery Form */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-6">
            <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light pb-4 border-b border-zinc-100 mb-6">
              Shipping Address
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="Eleanor"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="Vance"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] mb-3"
                placeholder="Apartment, suite, block number"
              />
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                placeholder="Apartment, suite, unit (optional)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="Maharashtra"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  required
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="400006"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-6">
              <h3 className="font-serif text-lg text-[oklch(0.22_0.02_50)] font-light mb-4 pb-2 border-b border-zinc-100">
                Payment Option
              </h3>
              
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-[oklch(0.22_0.02_50)] bg-zinc-50/40" : "border-zinc-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-[oklch(0.22_0.02_50)] focus:ring-[oklch(0.22_0.02_50)]"
                    />
                    <span className="text-xs text-[oklch(0.22_0.02_50)] tracking-wide font-medium">Credit / Debit Card (Client Demo)</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </label>

                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                  paymentMethod === "cod" ? "border-[oklch(0.22_0.02_50)] bg-zinc-50/40" : "border-zinc-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-[oklch(0.22_0.02_50)] focus:ring-[oklch(0.22_0.02_50)]"
                    />
                    <span className="text-xs text-[oklch(0.22_0.02_50)] tracking-wide font-medium">Cash On Delivery</span>
                  </div>
                  <Landmark className="w-4 h-4 text-zinc-400" />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4.5 bg-[oklch(0.22_0.02_50)] text-white text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] flex items-center justify-center gap-3 transition-colors duration-300"
            >
              Complete Reservation
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-6">
            <h2 className="font-serif text-xl text-[oklch(0.22_0.02_50)] font-light pb-4 border-b border-zinc-100 mb-6">
              Review Summary
            </h2>

            {/* List of Cart Items */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 divide-y divide-zinc-100">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 pt-4 first:pt-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-14 object-cover bg-zinc-50 border border-zinc-100"
                  />
                  <div className="flex-1 flex justify-between items-start text-xs">
                    <div>
                      <h4 className="font-serif text-sm font-light text-[oklch(0.22_0.02_50)] mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[oklch(0.50_0.03_55)] font-light">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-[oklch(0.22_0.02_50)]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sum breakdown */}
            <div className="space-y-4 pt-6 border-t border-zinc-100 text-xs text-[oklch(0.50_0.03_55)] font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (GST 18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center text-sm font-medium text-[oklch(0.22_0.02_50)] pt-4 border-t border-zinc-100">
              <span>Grand Total</span>
              <span className="text-lg">{formatPrice(total)}</span>
            </div>

            {/* Back Button */}
            <Link
              href="/cart"
              className="w-full py-4 border border-[oklch(0.85_0.01_75)] text-[oklch(0.35_0.02_50)] text-[9px] tracking-[0.25em] uppercase font-light hover:border-[oklch(0.22_0.02_50)] hover:text-[oklch(0.22_0.02_50)] flex items-center justify-center gap-3 transition-colors duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Bag
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[oklch(0.97_0.008_75)] flex items-center justify-center">
        <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-[0.4em] uppercase animate-pulse">Loading Checkout...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
