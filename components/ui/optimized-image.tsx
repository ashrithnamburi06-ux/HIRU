'use client'

import { useEffect, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
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
  priority,
  placeholder,
  blurDataURL,
  loading,
  src,
  fallbackSrc = LOCAL_IMAGES.productDefault,
  alt,
  ...props
}: OptimizedImageProps) {
  const resolvedFallback = resolveImageSrc(
    typeof fallbackSrc === 'string' ? fallbackSrc : undefined,
    LOCAL_IMAGES.productDefault
  )
  const resolvedInitial = resolveImageSrc(
    typeof src === 'string' ? src : undefined,
    resolvedFallback
  )

  const [imgSrc, setImgSrc] = useState(resolvedInitial)
  const imageLoading = priority ? undefined : loading ?? 'lazy'
  const isLocal = imgSrc.startsWith('/images/')
  const imagePlaceholder = placeholder ?? (isLocal ? 'empty' : 'blur')

  useEffect(() => {
    setImgSrc(
      resolveImageSrc(typeof src === 'string' ? src : undefined, resolvedFallback)
    )
  }, [src, resolvedFallback])

  const handleError = () => {
    if (imgSrc !== resolvedFallback) {
      setImgSrc(resolvedFallback)
    }
  }

  // fill: parent must be position:relative with explicit size (aspect-* or inset-0)
  if (fill) {
    return (
      <Image
        fill
        src={imgSrc}
        alt={alt}
        sizes={sizes}
        priority={priority}
        placeholder={imagePlaceholder}
        blurDataURL={imagePlaceholder === 'blur' ? blurDataURL : undefined}
        loading={imageLoading}
        onError={handleError}
        className={cn('object-cover', className)}
        {...props}
      />
    )
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        src={imgSrc}
        alt={alt}
        sizes={sizes}
        priority={priority}
        placeholder={imagePlaceholder}
        blurDataURL={imagePlaceholder === 'blur' ? blurDataURL : undefined}
        loading={imageLoading}
        onError={handleError}
        width={props.width ?? 800}
        height={props.height ?? 1000}
        className={cn('h-full w-full object-cover', className)}
        {...props}
      />
    </div>
  )
}
