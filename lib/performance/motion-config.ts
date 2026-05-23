/** Shared motion settings — shorter in dev, premium in production */
export const isDev = process.env.NODE_ENV === 'development'

export const motionViewport = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -60px 0px',
} as const

export const fadeInUp = {
  initial: isDev ? { opacity: 0, y: 12 } : { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: motionViewport,
  transition: { duration: isDev ? 0.35 : 0.75, ease: [0.25, 0.1, 0.25, 1] as const },
}

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: motionViewport,
  transition: { duration: isDev ? 0.3 : 0.6 },
}

export const heroTransition = {
  duration: isDev ? 0.6 : 1.2,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
}

/** Skip infinite loops in dev to reduce main-thread work */
export const enableInfiniteMotion = !isDev
