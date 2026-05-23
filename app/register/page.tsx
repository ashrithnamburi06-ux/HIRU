"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { useCartWishlist } from "@/context/CartWishlistContext"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const { register } = useCartWishlist()
  const { toast } = useToast()
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill out all registration fields.",
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

    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    register(name, email)
    toast({
      title: "Welcome to HIRU Circle",
      description: `Account created successfully for ${name}.`,
    })
    router.push("/profile")
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
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300"
              placeholder="e.g. Eleanor Vance"
            />
          </div>

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
            <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
              Password
            </label>
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

          {/* Confirm Password */}
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] transition-colors placeholder:text-zinc-300"
                placeholder="******"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.03_55)] hover:text-[oklch(0.22_0.02_50)] transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4.5 bg-[oklch(0.22_0.02_50)] text-white text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] flex items-center justify-center gap-3 transition-colors duration-300"
          >
            Register Account
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-8 text-center border-t border-zinc-100 pt-6">
          <p className="text-xs text-[oklch(0.50_0.03_55)] font-light">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[oklch(0.22_0.02_50)] hover:underline font-medium uppercase text-[10px] tracking-widest pl-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
