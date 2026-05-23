import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function ProductNotFound() {
  return (
    <>
      <PageHeader
        title="Product Not Found"
        description="This piece may no longer be available."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Collections', href: ROUTES.collections },
          { label: 'Not Found' },
        ]}
      />
      <div className="container mx-auto px-6 py-20 text-center">
        <Button asChild variant="outline" className="tracking-[0.2em] uppercase text-[10px]">
          <Link href={ROUTES.collections}>Browse Collections</Link>
        </Button>
      </div>
    </>
  )
}
