'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function ShopShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <Navbar variant={isHome ? 'overlay' : 'solid'} />
      <main
        className={
          isHome
            ? 'min-h-screen'
            : 'min-h-screen bg-[oklch(0.97_0.008_75)] pt-[calc(38px+4rem)] lg:pt-[calc(38px+5rem)]'
        }
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
