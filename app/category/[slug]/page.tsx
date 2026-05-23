"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const resolvedParams = React.use(params)

  useEffect(() => {
    router.replace(`/collections?category=${resolvedParams.slug}`)
  }, [resolvedParams.slug, router])

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.008_75)] flex items-center justify-center">
      <p className="text-[oklch(0.55_0.03_55)] text-xs tracking-[0.4em] uppercase animate-pulse">
        Navigating Category...
      </p>
    </div>
  )
}
