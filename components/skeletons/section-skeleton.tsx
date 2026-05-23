import { Skeleton } from '@/components/ui/skeleton'

export function SectionSkeleton() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <Skeleton className="mb-6 h-3 w-24 rounded-none bg-[oklch(0.92_0.015_75)]" />
        <Skeleton className="mb-12 h-16 w-full max-w-md rounded-none bg-[oklch(0.92_0.015_75)]" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-[3/4] w-full rounded-none bg-[oklch(0.92_0.015_75)]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
