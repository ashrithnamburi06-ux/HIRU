"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "#" },
    { name: "Best Sellers", href: "#" },
    { name: "Dresses", href: "#" },
    { name: "Co-ord Sets", href: "#" },
    { name: "Ethnic Wear", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  help: [
    { name: "Shipping Info", href: "#" },
    { name: "Returns & Exchanges", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "Track Order", href: "#" },
    { name: "FAQs", href: "#" },
  ],
  about: [
    { name: "Our Story", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Craftsmanship", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

export function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.02_50)] text-[oklch(0.85_0.01_80)]">
      {/* Newsletter Section */}
      <div className="border-b border-[oklch(0.28_0.02_50)]">
        <div className="container mx-auto px-8 lg:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-[oklch(0.70_0.05_75)] text-[10px] tracking-[0.5em] uppercase mb-6">
              Exclusive Access
            </p>
            <h3 className="font-serif text-4xl md:text-5xl font-light mb-6 text-[oklch(0.95_0.01_85)]">
              Join the <span className="italic">HIRU</span> Circle
            </h3>
            <p className="text-base text-[oklch(0.70_0.01_80)] font-light mb-12 max-w-md mx-auto">
              Subscribe for exclusive access to new collections, private sales, and styling inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-8 py-5 bg-[oklch(0.25_0.02_50)] border border-[oklch(0.35_0.02_50)] text-[oklch(0.90_0.01_80)] placeholder:text-[oklch(0.55_0.02_50)] text-sm tracking-wider focus:outline-none focus:border-[oklch(0.70_0.05_75)] transition-colors duration-300"
              />
              <button className="px-10 py-5 bg-[oklch(0.72_0.08_75)] text-[oklch(0.18_0.02_50)] text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.78_0.07_75)] transition-colors duration-500">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-8 lg:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-8">
              <h2 className="font-serif text-3xl font-light text-[oklch(0.98_0.005_85)]">
                HIRU <span className="italic font-normal">Elegance</span>
              </h2>
            </Link>
            <p className="text-base text-[oklch(0.65_0.01_80)] font-light leading-relaxed mb-10 max-w-xs">
              Quiet luxury for the modern woman. Timeless elegance, effortless style, exceptional quality.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 text-[oklch(0.60_0.01_80)]">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-light">Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-4 text-[oklch(0.60_0.01_80)]">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-light">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-4 text-[oklch(0.60_0.01_80)]">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-light">hello@hiruelegance.com</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-[oklch(0.35_0.02_50)] flex items-center justify-center hover:border-[oklch(0.70_0.05_75)] hover:text-[oklch(0.70_0.05_75)] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.2} />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase font-medium text-[oklch(0.70_0.05_75)] mb-8">
              Shop
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[oklch(0.65_0.01_80)] font-light hover:text-[oklch(0.95_0.01_85)] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase font-medium text-[oklch(0.70_0.05_75)] mb-8">
              Help
            </h4>
            <ul className="space-y-4">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[oklch(0.65_0.01_80)] font-light hover:text-[oklch(0.95_0.01_85)] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase font-medium text-[oklch(0.70_0.05_75)] mb-8">
              About
            </h4>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[oklch(0.65_0.01_80)] font-light hover:text-[oklch(0.95_0.01_85)] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[oklch(0.28_0.02_50)]">
        <div className="container mx-auto px-8 lg:px-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-[oklch(0.50_0.02_50)] font-light tracking-wider">
              2026 HIRU Elegance. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-xs text-[oklch(0.50_0.02_50)] font-light hover:text-[oklch(0.80_0.01_80)] transition-colors tracking-wider">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-[oklch(0.50_0.02_50)] font-light hover:text-[oklch(0.80_0.01_80)] transition-colors tracking-wider">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-[oklch(0.50_0.02_50)] font-light hover:text-[oklch(0.80_0.01_80)] transition-colors tracking-wider">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
