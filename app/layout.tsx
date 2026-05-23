import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MotionProvider } from '@/components/motion/motion-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'HIRU Elegance | Luxury Women\'s Fashion',
    template: '%s | HIRU Elegance',
  },
  description: 'Discover quiet luxury and timeless elegance. Premium women\'s fashion designed for those who love effortless style.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
