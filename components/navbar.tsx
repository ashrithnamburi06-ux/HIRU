"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const leftNavLinks = [
  { name: "New In", href: "#" },
  { name: "Best Sellers", href: "#" },
  { name: "Dresses", href: "#" },
]

const rightNavLinks = [
  { name: "Co-ord Sets", href: "#" },
  { name: "Ethnic", href: "#" },
  { name: "Accessories", href: "#" },
]

const allNavLinks = [...leftNavLinks, ...rightNavLinks]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.22_0.02_50)] text-[oklch(0.92_0.02_80)] py-2.5 text-center"
      >
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light">
          Complimentary Shipping on All Orders Above ₹4,999
        </p>
      </motion.div>

      {/* Main Navbar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`fixed top-[38px] left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[oklch(0.12_0.02_50)]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)] border-b border-[oklch(0.98_0.005_85)]/5"
            : "bg-transparent"
        }`}
      >
        <nav className="w-full">
          <div className="container mx-auto px-6 lg:px-12 xl:px-20">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-center h-20 xl:h-24 gap-8">
              {/* Left Navigation */}
              <div className="flex items-center justify-start gap-8 xl:gap-10">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative text-[11px] xl:text-xs tracking-[0.2em] uppercase font-light text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300 group whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[oklch(0.80_0.06_75)] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* Center Logo */}
              <Link href="/" className="flex-shrink-0 px-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="font-serif text-[26px] xl:text-[30px] tracking-[0.25em] font-light text-[oklch(0.98_0.005_85)] uppercase">
                    HIRU
                  </span>
                  <span className="font-serif text-[13px] xl:text-[14px] tracking-[0.35em] font-light text-[oklch(0.85_0.05_80)] uppercase -mt-1">
                    Elegance
                  </span>
                </motion.div>
              </Link>

              {/* Right Navigation + Icons */}
              <div className="flex items-center justify-end gap-8 xl:gap-10">
                {rightNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative text-[11px] xl:text-xs tracking-[0.2em] uppercase font-light text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300 group whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[oklch(0.80_0.06_75)] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}

                {/* Divider */}
                <div className="w-[1px] h-5 bg-[oklch(0.98_0.005_85)]/20" />

                {/* Icons */}
                <div className="flex items-center gap-5">
                  <button className="text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300">
                    <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </button>
                  <button className="text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300">
                    <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </button>
                  <button className="text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300">
                    <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </button>
                  <button className="relative text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300">
                    <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[oklch(0.80_0.06_75)] text-[oklch(0.15_0.02_50)] text-[9px] font-medium rounded-full flex items-center justify-center">
                      0
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="flex lg:hidden items-center justify-between h-16">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[oklch(0.98_0.005_85)] hover:bg-transparent hover:text-[oklch(0.80_0.06_75)] -ml-2"
                  >
                    <Menu className="h-6 w-6" strokeWidth={1.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="left" 
                  className="w-full sm:w-[400px] bg-[oklch(0.12_0.02_50)] border-none p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-[oklch(0.98_0.005_85)]/10">
                      <div className="flex flex-col">
                        <span className="font-serif text-xl tracking-[0.2em] font-light text-[oklch(0.98_0.005_85)] uppercase">
                          HIRU
                        </span>
                        <span className="font-serif text-[10px] tracking-[0.3em] font-light text-[oklch(0.85_0.05_80)] uppercase -mt-0.5">
                          Elegance
                        </span>
                      </div>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="text-[oklch(0.98_0.005_85)] hover:bg-transparent">
                          <X className="h-5 w-5" strokeWidth={1.5} />
                        </Button>
                      </SheetClose>
                    </div>

                    {/* Mobile Menu Links */}
                    <div className="flex-1 px-8 py-10">
                      <div className="space-y-6">
                        {allNavLinks.map((link, index) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-2xl font-serif font-light text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors duration-300"
                            >
                              {link.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="px-8 py-8 border-t border-[oklch(0.98_0.005_85)]/10">
                      <div className="flex items-center gap-6">
                        <button className="text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors">
                          <User className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                        <button className="text-[oklch(0.95_0.01_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors">
                          <Heart className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Logo */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center">
                  <span className="font-serif text-lg tracking-[0.2em] font-light text-[oklch(0.98_0.005_85)] uppercase">
                    HIRU
                  </span>
                  <span className="font-serif text-[9px] tracking-[0.3em] font-light text-[oklch(0.85_0.05_80)] uppercase -mt-0.5">
                    Elegance
                  </span>
                </div>
              </Link>

              {/* Mobile Icons */}
              <div className="flex items-center gap-4 -mr-2">
                <button className="text-[oklch(0.98_0.005_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors">
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button className="relative text-[oklch(0.98_0.005_85)] hover:text-[oklch(0.80_0.06_75)] transition-colors">
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[oklch(0.80_0.06_75)] text-[oklch(0.15_0.02_50)] text-[9px] font-medium rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  )
}
