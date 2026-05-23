'use client'

import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

type SearchFormProps = {
  defaultQuery?: string
  compact?: boolean
}

export function SearchForm({ defaultQuery = '', compact = false }: SearchFormProps) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const q = String(formData.get('q') ?? '').trim()
    router.push(q ? `${ROUTES.search}?q=${encodeURIComponent(q)}` : ROUTES.search)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'flex items-center gap-2' : 'mx-auto flex max-w-xl gap-3'}
      role="search"
    >
      <div className="relative flex-1">
        <Search
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[oklch(0.55_0.04_55)]"
          strokeWidth={1.5}
        />
        <Input
          name="q"
          type="search"
          defaultValue={defaultQuery}
          placeholder="Search dresses, co-ords, ethnic..."
          className="rounded-none border-[oklch(0.85_0.02_80)] bg-white pl-11 tracking-wide"
          aria-label="Search products"
        />
      </div>
      {!compact && (
        <Button
          type="submit"
          className="rounded-none bg-[oklch(0.22_0.02_50)] px-8 text-[10px] uppercase tracking-[0.3em]"
        >
          Search
        </Button>
      )}
    </form>
  )
}
