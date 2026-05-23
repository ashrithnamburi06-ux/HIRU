/** Tiny neutral blur placeholder for Next/Image */
export const IMAGE_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJ2n6gtLLULe4uY0eSNVDKwPBB9jWzp2p2uoWqXNjIssbcEZHY+1f/Z'

export const productImageSizes =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'

export const heroImageSizes = '100vw'

export const collectionImageSizes = '(max-width: 768px) 100vw, 50vw'

/** Reduce Unsplash payload — keep visual quality, smaller width */
export function optimizeRemoteImageUrl(url: string, width = 900) {
  if (!url.includes('unsplash.com')) return url
  try {
    const parsed = new URL(url)
    parsed.searchParams.set('w', String(width))
    parsed.searchParams.set('q', '75')
    parsed.searchParams.set('auto', 'format')
    parsed.searchParams.set('fit', 'crop')
    return parsed.toString()
  } catch {
    return url
  }
}
