export interface Review {
  id: number
  author: string
  rating: number
  date: string
  comment: string
}

export interface Product {
  id: number
  name: string
  price: number
  priceString: string
  image: string
  images: string[]
  category: string
  categoryName: string
  tag: string | null
  description: string
  details: string[]
  sizes: string[]
  rating: number
  isNewArrival: boolean
  isFeatured: boolean
  reviews: Review[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Silk Drape Dress",
    price: 18999,
    priceString: "₹18,999",
    image: "/images/product-silk-dress.jpg",
    images: [
      "/images/product-silk-dress.jpg",
      "/images/hero-luxury-fashion.jpg",
      "/images/brand-story-editorial.jpg"
    ],
    category: "dresses",
    categoryName: "Dresses",
    tag: "New",
    description: "Crafted from heavy-weight mulberry silk, this drape dress features a fluid silhouette that contours the body beautifully. Perfect for evening galas or intimate soirées.",
    details: [
      "100% Mulberry Silk",
      "Concealed side zipper",
      "Asymmetric drape collar",
      "Dry clean only",
      "Made in India by master artisans"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    isNewArrival: true,
    isFeatured: true,
    reviews: [
      { id: 1, author: "Aishwarya R.", rating: 5, date: "May 12, 2026", comment: "The quality of silk is outstanding. Fits like a glove!" },
      { id: 2, author: "Meera K.", rating: 4, date: "May 08, 2026", comment: "Beautiful drape. Very elegant color." }
    ]
  },
  {
    id: 2,
    name: "Cashmere Blazer",
    price: 24499,
    priceString: "₹24,499",
    image: "/images/product-cashmere-blazer.jpg",
    images: [
      "/images/product-cashmere-blazer.jpg",
      "/images/brand-story-editorial.jpg"
    ],
    category: "blazers",
    categoryName: "Blazers",
    tag: null,
    description: "An essential layering piece for transition seasons. This blazer is tailored from an ultra-soft cashmere-wool blend, featuring unstructured shoulders for a relaxed yet polished feel.",
    details: [
      "70% Cashmere, 30% Merino Wool",
      "Double-breasted front with horn buttons",
      "Relaxed tailored fit",
      "Dry clean only"
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    isNewArrival: true,
    isFeatured: false,
    reviews: [
      { id: 1, author: "Priya S.", rating: 5, date: "April 28, 2026", comment: "Unbelievably soft and fits beautifully. Worth every rupee." }
    ]
  },
  {
    id: 3,
    name: "Satin Evening Skirt",
    price: 12999,
    priceString: "₹12,999",
    image: "/images/product-satin-skirt.jpg",
    images: [
      "/images/product-satin-skirt.jpg",
      "/images/hero-luxury-fashion.jpg"
    ],
    category: "skirts",
    categoryName: "Skirts",
    tag: "Bestseller",
    description: "Cut on the bias for a fluid, flattering silhouette. This satin skirt boasts a soft sheen and an elasticated waistband for comfort without compromising on elegance.",
    details: [
      "Premium polyester-satin blend",
      "Bias cut for fluid drape",
      "Midi length",
      "Hand wash cold or dry clean"
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    isNewArrival: true,
    isFeatured: true,
    reviews: [
      { id: 1, author: "Anjali M.", rating: 5, date: "May 15, 2026", comment: "Gorgeous movement! Pairs perfectly with a knit sweater." }
    ]
  },
  {
    id: 4,
    name: "Linen Co-ord Set",
    price: 19999,
    priceString: "₹19,999",
    image: "/images/product-linen-coord.jpg",
    images: [
      "/images/product-linen-coord.jpg",
      "/images/brand-story-editorial.jpg"
    ],
    category: "coord-sets",
    categoryName: "Co-ord Sets",
    tag: null,
    description: "Embodying summer ease, this co-ord set features a relaxed-fit linen shirt and matching wide-leg trousers. Breathable and effortlessly chic.",
    details: [
      "100% Belgian Linen",
      "Includes button-down shirt and elastic-back trousers",
      "Breathable, lightweight texture",
      "Gentle machine wash"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    isNewArrival: true,
    isFeatured: false,
    reviews: []
  },
  {
    id: 5,
    name: "Ethereal Silk Slip Dress",
    price: 15499,
    priceString: "₹15,499",
    image: "/images/product-silk-dress.jpg",
    images: [
      "/images/product-silk-dress.jpg",
      "/images/hero-luxury-fashion.jpg"
    ],
    category: "dresses",
    categoryName: "Dresses",
    tag: "Featured",
    description: "A minimalist classic. This bias-cut silk slip dress features adjustable spaghetti straps and a cowl neck, offering a timeless editorial look.",
    details: [
      "100% Mulberry Silk",
      "Adjustable shoulder straps",
      "Cowl neckline, bias cut",
      "Dry clean only"
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    isNewArrival: false,
    isFeatured: true,
    reviews: [
      { id: 1, author: "Kriti S.", rating: 5, date: "May 01, 2026", comment: "Pure perfection. Feels like water against the skin." }
    ]
  },
  {
    id: 6,
    name: "Artisan Wool Coat",
    price: 34999,
    priceString: "₹34,999",
    image: "/images/product-cashmere-blazer.jpg",
    images: [
      "/images/product-cashmere-blazer.jpg",
      "/images/brand-story-editorial.jpg"
    ],
    category: "blazers",
    categoryName: "Blazers",
    tag: "Bestseller",
    description: "Our signature coat. Hand-stitched from double-faced wool, this wrap coat features a relaxed shoulder, a self-tie belt, and generous patch pockets.",
    details: [
      "100% Double-faced Virgin Wool",
      "Hand-sewn edges",
      "Removable self-tie waist belt",
      "Dry clean only"
    ],
    sizes: ["S", "M", "L"],
    rating: 5.0,
    isNewArrival: false,
    isFeatured: true,
    reviews: [
      { id: 1, author: "Rohini D.", rating: 5, date: "March 18, 2026", comment: "Outstanding craftsmanship. Absolute luxury." }
    ]
  },
  {
    id: 7,
    name: "Pleated Satin Skirt",
    price: 13999,
    priceString: "₹13,999",
    image: "/images/product-satin-skirt.jpg",
    images: [
      "/images/product-satin-skirt.jpg",
      "/images/hero-luxury-fashion.jpg"
    ],
    category: "skirts",
    categoryName: "Skirts",
    tag: "New",
    description: "Featuring sharp accordion pleats that catch the light with every step, this skirt elevates day-to-night styling effortlessly.",
    details: [
      "High-grade satin-polyester",
      "Elasticated flat waistband",
      "Midi length with raw hem finish",
      "Hand wash cold"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    isNewArrival: true,
    isFeatured: false,
    reviews: []
  },
  {
    id: 8,
    name: "Premium Linen Summer Set",
    price: 21999,
    priceString: "₹21,999",
    image: "/images/product-linen-coord.jpg",
    images: [
      "/images/product-linen-coord.jpg"
    ],
    category: "coord-sets",
    categoryName: "Co-ord Sets",
    tag: "Featured",
    description: "A luxury holiday essential. Tailored from premium, long-staple organic linen, this set pairs a structured waistcoat with tailored shorts.",
    details: [
      "100% Organic Linen",
      "Waistcoat with horn button closure",
      "Shorts with front pleats and side pockets",
      "Dry clean recommended"
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    isNewArrival: false,
    isFeatured: true,
    reviews: [
      { id: 1, author: "Shruti G.", rating: 4, date: "May 10, 2026", comment: "Perfect for hot summer days, looks very sophisticated." }
    ]
  },
  {
    id: 9,
    name: "Chiffon Evening Gown",
    price: 28999,
    priceString: "₹28,999",
    image: "/images/hero-luxury-fashion.jpg",
    images: [
      "/images/hero-luxury-fashion.jpg",
      "/images/product-silk-dress.jpg"
    ],
    category: "dresses",
    categoryName: "Dresses",
    tag: "Featured",
    description: "Make an unforgettable statement. Crafted from sheer, flowing silk chiffon over a silk lining, featuring a hand-pleated bodice and floor-sweeping skirt.",
    details: [
      "100% Silk Chiffon exterior, 100% Silk lining",
      "Intricate hand-pleated bodice details",
      "Concealed back zip closure",
      "Dry clean only"
    ],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    isNewArrival: false,
    isFeatured: true,
    reviews: [
      { id: 1, author: "Aditi B.", rating: 5, date: "April 14, 2026", comment: "The dress of my dreams. Flawless texture and design." }
    ]
  },
  {
    id: 10,
    name: "Classic Tailored Trousers",
    price: 11999,
    priceString: "₹11,999",
    image: "/images/brand-story-editorial.jpg",
    images: [
      "/images/brand-story-editorial.jpg",
      "/images/product-cashmere-blazer.jpg"
    ],
    category: "coord-sets",
    categoryName: "Co-ord Sets",
    tag: null,
    description: "The cornerstone of a curated wardrobe. High-waisted with a wide leg, these trousers are tailored from lightweight wool crepe that drapes impeccably.",
    details: [
      "100% Virgin Wool Crepe",
      "High-rise with belt loops",
      "Front crease line, side pockets",
      "Dry clean only"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    isNewArrival: false,
    isFeatured: false,
    reviews: []
  }
]
