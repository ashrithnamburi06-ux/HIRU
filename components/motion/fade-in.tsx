'use client'

import { m } from 'framer-motion'
import { fadeInUp } from '@/lib/performance/motion-config'
import { cn } from '@/lib/utils'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article'
}

export function FadeIn({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: FadeInProps) {
  const Component = m[Tag]

  return (
    <Component
      {...fadeInUp}
      transition={{ ...fadeInUp.transition, delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
