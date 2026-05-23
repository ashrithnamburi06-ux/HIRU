"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !message) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required details.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Inquiry Dispatched",
      description: "Our concierge team will respond within 24 business hours.",
    })

    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="pt-24 min-h-screen bg-[oklch(0.97_0.008_75)] pb-24">
      {/* Header */}
      <div className="py-20 text-center px-6">
        <p className="text-[oklch(0.55_0.04_55)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4">
          Concierge Services
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[oklch(0.22_0.02_50)] font-extralight tracking-tight mb-4">
          CONTACT <span className="italic">Us</span>
        </h1>
        <div className="w-16 h-[1px] bg-[oklch(0.65_0.06_55)] mx-auto mt-6" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 space-y-8 bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
            <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light mb-6">
              Get In Touch
            </h2>
            
            <p className="text-xs text-[oklch(0.50_0.03_55)] font-light leading-relaxed">
              For assistance regarding sizing, order reservations, or bespoke inquiries, please select a contact channel below.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-[oklch(0.35_0.02_50)] mt-0.5" strokeWidth={1.5} />
                <div className="text-xs">
                  <h4 className="font-serif text-sm text-[oklch(0.22_0.02_50)] font-medium mb-1">HQ Address</h4>
                  <p className="text-[oklch(0.50_0.03_55)] font-light leading-relaxed">Malabar Hill, Mumbai,<br />Maharashtra, India - 400006</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-[oklch(0.35_0.02_50)] mt-0.5" strokeWidth={1.5} />
                <div className="text-xs">
                  <h4 className="font-serif text-sm text-[oklch(0.22_0.02_50)] font-medium mb-1">Telephone Inquiry</h4>
                  <p className="text-[oklch(0.50_0.03_55)] font-light">+91 98765 43210</p>
                  <p className="text-[10px] text-[oklch(0.55_0.03_55)] font-light mt-0.5">Mon - Sat, 10:00 AM - 07:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-[oklch(0.35_0.02_50)] mt-0.5" strokeWidth={1.5} />
                <div className="text-xs">
                  <h4 className="font-serif text-sm text-[oklch(0.22_0.02_50)] font-medium mb-1">Electronic Mail</h4>
                  <p className="text-[oklch(0.50_0.03_55)] font-light">concierge@hiruelegance.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-white border border-[oklch(0.90_0.01_75)]/30 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
            <h2 className="font-serif text-2xl text-[oklch(0.22_0.02_50)] font-light mb-6">
              Concierge Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)]"
                  placeholder="e.g. Bespoke tailoring inquiry"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-medium text-[oklch(0.35_0.02_50)] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[oklch(0.85_0.01_75)] text-xs text-[oklch(0.22_0.02_50)] focus:outline-none focus:border-[oklch(0.22_0.02_50)] resize-none"
                  placeholder="Draft your message to our concierge..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[oklch(0.22_0.02_50)] text-white text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[oklch(0.30_0.03_50)] flex items-center justify-center gap-3 transition-colors duration-300"
              >
                Send Message
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
