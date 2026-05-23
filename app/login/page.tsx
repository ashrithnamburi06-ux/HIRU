"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, X, ArrowRight } from "lucide-react"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { login } = useCartWishlist()
  const { toast } = useToast()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isForgotOpen, setIsForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill out all credentials.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    login(email)
    toast({
      title: "Welcome Back",
      description: "You have successfully authenticated to your HIRU circle account.",
    })
    router.push("/profile")
  }

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return

    toast({
      title: "Reset Link Sent",
      description: `A security code has been dispatched to ${forgotEmail}.`,
    })
    setIsForgotOpen(false)
    setForgotEmail("")
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
      >
        <div className="text-center mb-8">
          <p className="text-[oklch(0.55_0.04_55)] text-[10px] tracking-[0.5em] uppercase mb-4">
            Private Access
          </p>
          <h1 className="font-serif text-3xl font-light text-[oklch(0.22_0.02_50)]">
            Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Address */}
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300"
              placeholder="name@domain.com"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-[oklch(0.55_0.03_55)] hover:text-[oklch(0.22_0.02_50)] text-[10px] tracking-[0.1em] uppercase font-light transition-colors"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300"
                placeholder="******"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.03_55)] hover:text-[oklch(0.22_0.02_50)] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4.5 bg-[oklch(0.22_0.02_50)] text-white text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] flex items-center justify-center gap-3 transition-colors duration-300"
          >
            Access Account
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Register Redirect */}
        <div className="mt-8 text-center border-t border-zinc-100 pt-6">
          <p className="text-xs text-[oklch(0.50_0.03_55)] font-light">
            New to HIRU?{" "}
            <Link
              href="/register"
              className="text-[oklch(0.22_0.02_50)] hover:underline font-medium uppercase text-[10px] tracking-widest pl-2"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Forgot Password Modal Overlay */}
      <AnimatePresence>
        {isForgotOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/45 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsForgotOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-2xl font-light text-[oklch(0.22_0.02_50)] mb-4">
                Forgot Password
              </h3>
              <p className="text-[oklch(0.50_0.03_55)] text-xs font-light leading-relaxed mb-6">
                Enter your email address to receive a secure credentials reset link.
              </p>

              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300"
                    placeholder="name@domain.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[oklch(0.22_0.02_50)] text-white text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] transition-colors duration-300"
                >
                  Send Reset Instructions
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
