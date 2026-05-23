import { Skeleton } from '@/components/ui/skeleton'
import { ProductGridSkeleton } from './product-grid-skeleton'

export function PageSkeleton() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="border-b border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <Skeleton className="mb-8 h-3 w-48 rounded-none bg-[oklch(0.92_0.015_75)]" />
          <Skeleton className="h-12 w-full max-w-lg rounded-none bg-[oklch(0.92_0.015_75)]" />
          <Skeleton className="mt-6 h-4 w-full max-w-xl rounded-none bg-[oklch(0.92_0.015_75)]" />
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}
