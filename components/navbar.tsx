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
      {/* Announcement Bar - Warm Luxury */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[rgba(30,18,10,0.75)] backdrop-blur-md text-center border-b border-[rgba(217,184,143,0.2)]"
      >
        <div className="py-3 px-6">
          <p className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-light text-[#F1E4D1]">
            Complimentary Shipping on Orders Above ₹4,999
          </p>
        </div>
      </motion.div>

      {/* Main Navbar - Warm Dark Glass Luxury */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className={`fixed top-[48px] left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isScrolled
            ? "bg-[rgba(30,18,10,0.55)] backdrop-blur-[18px] shadow-[0_4px_30px_-8px_rgba(0,0,0,0.15)] border-b border-[rgba(217,184,143,0.2)]"
            : "bg-[rgba(30,18,10,0.45)] backdrop-blur-[14px] border-b border-[rgba(217,184,143,0.15)]"
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
                    <h1 className="font-serif text-[2.2rem] xl:text-[2.5rem] font-extralight text-[#F1E4D1] tracking-[0.15em] group-hover:text-[#F8EBD8] transition-colors duration-500">
                      HIRU
                    </h1>
                    <p className="font-serif text-[11px] xl:text-[12px] font-light text-[#D9B88F] tracking-[0.35em] -mt-1 group-hover:text-[#F1E4D1] transition-colors duration-500">
                      Elegance
                    </p>
                  </div>
                </Link>
                <div className="hidden xl:block h-8 w-[1px] bg-gradient-to-b from-transparent via-[#D9B88F]/40 to-transparent" />
                <p className="hidden xl:block font-serif text-[11px] font-light italic text-[#D9B88F]/80 tracking-wide">
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
                        className="relative group font-serif text-[13px] xl:text-[14px] font-light tracking-wider text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500"
                      >
                        {link.name}
                        <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#D9B88F] group-hover:w-full transition-all duration-500 ease-out" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="relative group"
                      >
                        <span className={`font-serif text-[13px] xl:text-[14px] font-light tracking-wider transition-colors duration-500 ${
                          isActiveLink(link.href)
                            ? "text-[#F8EBD8]"
                            : "text-[#F1E4D1] hover:text-[#F8EBD8]"
                        }`}>
                          {link.name}
                        </span>
                        {isActiveLink(link.href) && (
                          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#D9B88F]" />
                        )}
                        <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#D9B88F] group-hover:w-full transition-all duration-500 ease-out" />
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
                <button className="group relative p-2 text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500">
                  <Search className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-2 text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500">
                  <User className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-2 text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500">
                  <Heart className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-2 text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500">
                  <ShoppingBag className="w-5 h-5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#D9B88F] text-[#1A1008] text-[9px] font-medium rounded-full flex items-center justify-center shadow-md">
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
                    className="text-[#F1E4D1] hover:bg-[rgba(217,184,143,0.15)] hover:text-[#F8EBD8] -ml-2 transition-colors duration-500"
                  >
                    <Menu className="h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full sm:w-[380px] bg-[rgba(30,18,10,0.95)] backdrop-blur-lg border-none p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-[rgba(217,184,143,0.2)]">
                      <Link href="/" className="flex flex-col" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="font-serif text-[1.8rem] font-extralight text-[#F1E4D1] tracking-[0.15em]">
                          HIRU
                        </span>
                        <span className="font-serif text-[11px] font-light text-[#D9B88F] tracking-[0.35em] -mt-0.5">
                          Elegance
                        </span>
                      </Link>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F1E4D1] hover:bg-[rgba(217,184,143,0.15)] hover:text-[#F8EBD8] transition-colors duration-500"
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
                                className="block font-serif text-2xl font-light text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-300"
                              >
                                {link.name}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block font-serif text-2xl font-light text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-300"
                              >
                                {link.name}
                              </Link>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="px-8 py-8 border-t border-[rgba(217,184,143,0.2)]">
                      <p className="font-serif text-[11px] font-light italic text-[#D9B88F]/80 tracking-wide mb-6">
                        Boutique of Quiet Luxury
                      </p>
                      <div className="flex items-center gap-6">
                        <button className="text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-300">
                          <User className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-300">
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
                  <span className="font-serif text-[1.6rem] font-extralight text-[#F1E4D1] tracking-[0.18em]">
                    HIRU
                  </span>
                  <span className="font-serif text-[10px] font-light text-[#D9B88F] tracking-[0.35em] -mt-0.5">
                    Elegance
                  </span>
                </div>
              </Link>

              {/* Mobile Icons */}
              <div className="flex items-center gap-3 -mr-2">
                <button className="p-2 text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500">
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button className="relative p-2 text-[#F1E4D1] hover:text-[#F8EBD8] transition-colors duration-500">
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#D9B88F] text-[#1A1008] text-[8px] font-medium rounded-full flex items-center justify-center">
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
