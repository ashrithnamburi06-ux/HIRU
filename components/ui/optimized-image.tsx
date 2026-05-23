'use client'

import { useEffect, useState } from 'react'
import NextImage, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { LOCAL_IMAGES } from '@/lib/images/local-assets'
import { resolveImageSrc } from '@/lib/images/resolve'

type OptimizedImageProps = ImageProps & {
  containerClassName?: string
  fallbackSrc?: string
}

export function OptimizedImage({
  className,
  containerClassName,
  fill,
  sizes,
  priority = false,
  placeholder,
  blurDataURL,
  loading,
  src,
  fallbackSrc = LOCAL_IMAGES.productDefault,
  alt,
  ...props
}: OptimizedImageProps) {
  const resolvedFallback = resolveImageSrc(
    typeof fallbackSrc === 'string'
      ? fallbackSrc
      : LOCAL_IMAGES.productDefault,
    LOCAL_IMAGES.productDefault
  )

  const [imgSrc, setImgSrc] = useState<string>(
    resolveImageSrc(
      typeof src === 'string' ? src : undefined,
      resolvedFallback
    )
  )

  useEffect(() => {
    setImgSrc(
      resolveImageSrc(
        typeof src === 'string' ? src : undefined,
        resolvedFallback
      )
    )
  }, [src, resolvedFallback])

  const handleError = () => {
    if (imgSrc !== resolvedFallback) {
      setImgSrc(resolvedFallback)
    }
  }

  const imageLoading = priority ? undefined : loading ?? 'lazy'

  const isLocalImage =
    typeof imgSrc === 'string' &&
    (imgSrc.startsWith('/images/') ||
      imgSrc.startsWith('/'))

  const imagePlaceholder =
    placeholder ?? (isLocalImage ? 'empty' : 'blur')

  // FILL IMAGE MODE
  if (fill) {
    return (
      <NextImage
        fill
        src={imgSrc}
        alt={alt || 'HIRU Elegance'}
        sizes={sizes || '100vw'}
        priority={priority}
        loading={imageLoading}
        placeholder={imagePlaceholder}
        blurDataURL={
          imagePlaceholder === 'blur'
            ? blurDataURL
            : undefined
        }
        onError={handleError}
        className={cn('object-cover', className)}
        {...props}
      />
    )
  }

  // NORMAL IMAGE MODE
  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <NextImage
        src={imgSrc}
        alt={alt || 'HIRU Elegance'}
        width={
          typeof props.width === 'number'
            ? props.width
            : 800
        }
        height={
          typeof props.height === 'number'
            ? props.height
            : 1000
        }
        sizes={sizes}
        priority={priority}
        loading={imageLoading}
        placeholder={imagePlaceholder}
        blurDataURL={
          imagePlaceholder === 'blur'
            ? blurDataURL
            : undefined
        }
        onError={handleError}
        className={cn(
          'h-full w-full object-cover',
          className
        )}
        {...props}
      />
    </div>
  )
}