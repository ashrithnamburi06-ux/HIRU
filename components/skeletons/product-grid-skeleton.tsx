import { Skeleton } from '@/components/ui/skeleton'

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[3/4] w-full rounded-none bg-[oklch(0.92_0.015_75)]" />
          <Skeleton className="h-5 w-3/4 rounded-none bg-[oklch(0.92_0.015_75)]" />
          <Skeleton className="h-4 w-1/3 rounded-none bg-[oklch(0.92_0.015_75)]" />
        </div>
      ))}
    </div>
  )
}
