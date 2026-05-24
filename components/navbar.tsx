"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
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
      {/* Main Navbar - Slim Boutique Style */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/30 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="w-full">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16">
            {/* Desktop Layout - Slim Height */}
            <div className="hidden lg:flex items-center justify-between h-16 xl:h-20">
              {/* Left Section - Logo & Tagline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <Link href="/" className="group">
                  <div className="flex items-baseline gap-3">
                    <h1 className="font-serif text-2xl xl:text-[1.65rem] font-light text-white tracking-[0.2em] group-hover:text-[#D9B88F] transition-colors duration-300">
                      HIRU
                    </h1>
                    <span className="font-serif text-[10px] xl:text-[11px] font-light italic text-[#D9B88F]/80 tracking-wide">
                      Elegance
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Center Section - Navigation Links */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-8 xl:gap-12"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + index * 0.05, duration: 0.5 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group font-serif text-[13px] xl:text-[14px] font-light tracking-[0.1em] text-white/90 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D9B88F] group-hover:w-full transition-all duration-300" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="relative group"
                      >
                        <span className={`font-serif text-[13px] xl:text-[14px] font-light tracking-[0.1em] transition-colors duration-300 ${
                          isActiveLink(link.href)
                            ? "text-[#D9B88F]"
                            : "text-white/90 hover:text-white"
                        }`}>
                          {link.name}
                        </span>
                        {isActiveLink(link.href) && (
                          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#D9B88F]" />
                        )}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D9B88F] group-hover:w-full transition-all duration-300" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Section - Icons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center gap-4 xl:gap-5"
              >
                <button className="group p-1.5 text-white/90 hover:text-white transition-colors duration-300">
                  <Search className="w-4.5 h-4.5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group p-1.5 text-white/90 hover:text-white transition-colors duration-300">
                  <User className="w-4.5 h-4.5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group p-1.5 text-white/90 hover:text-white transition-colors duration-300">
                  <Heart className="w-4.5 h-4.5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="group relative p-1.5 text-white/90 hover:text-white transition-colors duration-300">
                  <ShoppingBag className="w-4.5 h-4.5 xl:w-[18px] xl:h-[18px]" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D9B88F] text-[#1A1008] text-[8px] font-medium rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Mobile/Tablet Layout - Slim Height */}
            <div className="flex lg:hidden items-center justify-between h-14">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/90 hover:text-white hover:bg-white/10 -ml-2 transition-all duration-300"
                  >
                    <Menu className="h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full sm:w-[340px] bg-black/95 backdrop-blur-lg border-none p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-7 py-5 border-b border-[#D9B88F]/20">
                      <Link href="/" className="flex items-baseline gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="font-serif text-[1.5rem] font-light text-white tracking-[0.2em]">
                          HIRU
                        </span>
                        <span className="font-serif text-[10px] font-light italic text-[#D9B88F]/80 tracking-wide">
                          Elegance
                        </span>
                      </Link>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <X className="h-5 w-5" strokeWidth={1.5} />
                        </Button>
                      </SheetClose>
                    </div>

                    {/* Mobile Menu Links */}
                    <div className="flex-1 px-7 py-10">
                      <div className="space-y-6">
                        {navLinks.map((link, index) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                          >
                            {link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block font-serif text-xl font-light text-white/90 hover:text-[#D9B88F] transition-colors duration-300"
                              >
                                {link.name}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block font-serif text-xl font-light text-white/90 hover:text-[#D9B88F] transition-colors duration-300"
                              >
                                {link.name}
                              </Link>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="px-7 py-6 border-t border-[#D9B88F]/20">
                      <p className="font-serif text-[10px] font-light italic text-[#D9B88F]/70 tracking-wide mb-5">
                        Boutique of Quiet Luxury
                      </p>
                      <div className="flex items-center gap-5">
                        <button className="text-white/90 hover:text-[#D9B88F] transition-colors duration-300">
                          <User className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="text-white/90 hover:text-[#D9B88F] transition-colors duration-300">
                          <Heart className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Logo */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[1.4rem] font-light text-white tracking-[0.2em]">
                    HIRU
                  </span>
                  <span className="font-serif text-[9px] font-light italic text-[#D9B88F]/80 tracking-wide">
                    Elegance
                  </span>
                </div>
              </Link>

              {/* Mobile Icons */}
              <div className="flex items-center gap-3 -mr-2">
                <button className="p-1.5 text-white/90 hover:text-white transition-colors duration-300">
                  <Search className="w-4.5 h-4.5" strokeWidth={1.5} />
                </button>
                <button className="relative p-1.5 text-white/90 hover:text-white transition-colors duration-300">
                  <ShoppingBag className="w-4.5 h-4.5" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#D9B88F] text-[#1A1008] text-[7px] font-medium rounded-full flex items-center justify-center">
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
