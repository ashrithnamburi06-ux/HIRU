"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The quality is absolutely exceptional. Every piece I own from HIRU has become a staple in my wardrobe. The attention to detail is remarkable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Bangalore",
    text: "Finally, a brand that understands quiet luxury. The fabrics feel incredible, and the designs are timeless. Worth every rupee.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kavitha Menon",
    location: "Delhi",
    text: "I receive compliments every time I wear HIRU. The silk dress I purchased drapes beautifully and feels like a second skin.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 md:py-44 bg-[oklch(0.22_0.02_50)]">
      <div className="container mx-auto px-8 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="text-[oklch(0.70_0.05_75)] text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-6">
            Client Stories
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[oklch(0.95_0.01_85)] font-light leading-[1.1]">
            Loved by <span className="italic font-normal">Women</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-[oklch(0.28_0.02_50)] p-10 lg:p-12"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[oklch(0.75_0.08_80)] text-[oklch(0.75_0.08_80)]" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-[oklch(0.85_0.01_85)] text-base md:text-lg font-light leading-relaxed mb-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[oklch(0.95_0.01_85)] text-sm font-medium tracking-wide">
                    {testimonial.name}
                  </p>
                  <p className="text-[oklch(0.65_0.02_60)] text-xs tracking-wider uppercase">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
