import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Page Not Found"
        description="The page you are looking for may have been moved or no longer exists."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Not Found' },
        ]}
      />
      <div className="container mx-auto px-6 py-20 text-center">
        <Button asChild variant="outline" className="tracking-[0.2em] uppercase text-[10px]">
          <Link href={ROUTES.home}>Return Home</Link>
        </Button>
      </div>
    </>
  )
}
