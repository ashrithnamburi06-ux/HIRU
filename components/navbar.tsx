"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useCartWishlist } from "@/context/CartWishlistContext"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Instagram", href: "https://instagram.com", external: true },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cart } = useCartWishlist()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Announcement Bar - Soft Boutique Style */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[oklch(0.96_0.015_80)] via-[oklch(0.97_0.012_82)] to-[oklch(0.96_0.015_80)] text-center border-b border-[oklch(0.90_0.02_75)]/40"
      >
        <div className="py-3 px-6">
          <p className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-light text-[oklch(0.45_0.03_55)]">
            Complimentary Shipping on Orders Above ₹4,999
          </p>
        </div>
      </motion.div>

      {/* Main Navbar - Light Boutique Luxury */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className={`fixed top-[48px] left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isScrolled
            ? "bg-gradient-to-b from-[oklch(0.99_0.005_90)]/98 via-[oklch(0.98_0.008_88)]/98 to-[oklch(0.97_0.01_86)]/98 backdrop-blur-xl shadow-[0_4px_30px_-10px_oklch(0.30_0.03_50/0.08)] border-b border-[oklch(0.92_0.02_75)]/30"
            : "bg-gradient-to-b from-[oklch(0.99_0.005_90)] to-[oklch(0.98_0.01_88)]"
        }`}
      >
        <nav className="w-full">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-24">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between h-28 xl:h-32">
              {/* Left Section - Logo & Boutique Tagline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center gap-6"
              >
                <Link href="/" className="group">
                  <div className="flex flex-col items-start">
                    <h1 className="font-serif text-[2.2rem] xl:text-[2.5rem] font-extralight text-[oklch(0.25_0.02_50)] tracking-[0.15em] group-hover:text-[oklch(0.35_0.04_55)] transition-colors duration-500">
                      HIRU
                    </h1>
                    <p className="font-serif text-[11px] xl:text-[12px] font-light text-[oklch(0.55_0.04_60)] tracking-[0.35em] -mt-1 group-hover:text-[oklch(0.65_0.05_65)] transition-colors duration-500">
                      Elegance
                    </p>
                  </div>
                </Link>
                <div className="hidden xl:block h-8 w-[1px] bg-gradient-to-b from-transparent via-[oklch(0.80_0.05_75)] to-transparent" />
                <p className="hidden xl:block font-serif text-[11px] font-light italic text-[oklch(0.60_0.04_60)] tracking-wide">
                  Boutique of Quiet Luxury
                </p>
              </motion.div>

              {/* Center Section - Navigation Links */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center gap-10 xl:gap-14"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.08, duration: 0.6 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group font-serif text-[13px] xl:text-[14px] font-light tracking-wider text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500"
                      >
                        {link.name}
                        <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[oklch(0.75_0.08_75)] to-[oklch(0.80_0.07_80)] group-hover:w-full transition-all duration-500 ease-out" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="relative group"
                      >
                        <span className={`font-serif text-[13px] xl:text-[14px] font-light tracking-wider transition-colors duration-500 ${
                          isActiveLink(link.href)
                            ? "text-[oklch(0.25_0.02_50)]"
                            : "text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)]"
                        }`}>
                          {link.name}
                        </span>
                        {isActiveLink(link.href) ? (
                          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-[oklch(0.92_0.04_80)] rounded-full">
                            <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[oklch(0.75_0.06_75)]" />
                          </span>
                        ) : (
                          <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[oklch(0.75_0.08_75)] to-[oklch(0.80_0.07_80)] group-hover:w-full transition-all duration-500 ease-out" />
                        )}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Section - Icons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-5 xl:gap-6"
              >
                <button className="group relative p-2 text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500">
                  <Search className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-2 text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500">
                  <User className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-2 text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500">
                  <Heart className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-2 text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500">
                  <ShoppingBag className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-[oklch(0.75_0.08_75)] to-[oklch(0.70_0.07_73)] text-white text-[9px] font-medium rounded-full flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="flex lg:hidden items-center justify-between h-20">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[oklch(0.35_0.03_50)] hover:bg-[oklch(0.96_0.015_80)] hover:text-[oklch(0.25_0.02_50)] -ml-2 transition-colors duration-500"
                  >
                    <Menu className="h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full sm:w-[380px] bg-gradient-to-b from-[oklch(0.98_0.01_88)] to-[oklch(0.96_0.015_85)] border-none p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-[oklch(0.90_0.02_75)]/40">
                      <Link href="/" className="flex flex-col" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="font-serif text-[1.8rem] font-extralight text-[oklch(0.25_0.02_50)] tracking-[0.15em]">
                          HIRU
                        </span>
                        <span className="font-serif text-[11px] font-light text-[oklch(0.55_0.04_60)] tracking-[0.35em] -mt-0.5">
                          Elegance
                        </span>
                      </Link>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[oklch(0.45_0.03_55)] hover:bg-[oklch(0.95_0.01_80)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500"
                        >
                          <X className="h-5 w-5" strokeWidth={1.5} />
                        </Button>
                      </SheetClose>
                    </div>

                    {/* Mobile Menu Links */}
                    <div className="flex-1 px-8 py-12">
                      <div className="space-y-8">
                        {navLinks.map((link, index) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                          >
                            {link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block font-serif text-2xl font-light text-[oklch(0.35_0.03_50)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-300"
                              >
                                {link.name}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block font-serif text-2xl font-light text-[oklch(0.35_0.03_50)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-300"
                              >
                                {link.name}
                              </Link>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="px-8 py-8 border-t border-[oklch(0.90_0.02_75)]/40">
                      <p className="font-serif text-[11px] font-light italic text-[oklch(0.55_0.04_60)] tracking-wide mb-6">
                        Boutique of Quiet Luxury
                      </p>
                      <div className="flex items-center gap-6">
                        <button className="text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-300">
                          <User className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="text-[oklch(0.45_0.03_55)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-300">
                          <Heart className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Logo */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center">
                  <span className="font-serif text-[1.6rem] font-extralight text-[oklch(0.25_0.02_50)] tracking-[0.18em]">
                    HIRU
                  </span>
                  <span className="font-serif text-[10px] font-light text-[oklch(0.55_0.04_60)] tracking-[0.35em] -mt-0.5">
                    Elegance
                  </span>
                </div>
              </Link>

              {/* Mobile Icons */}
              <div className="flex items-center gap-3 -mr-2">
                <button className="p-2 text-[oklch(0.35_0.03_50)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500">
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button className="relative p-2 text-[oklch(0.35_0.03_50)] hover:text-[oklch(0.25_0.02_50)] transition-colors duration-500">
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-br from-[oklch(0.75_0.08_75)] to-[oklch(0.70_0.07_73)] text-white text-[8px] font-medium rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  )
}
