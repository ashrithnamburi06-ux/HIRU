import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { AuthForm } from '@/components/auth/auth-form'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to your HIRU Elegance account.',
  path: '/login',
  noIndex: true,
})

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Sign In"
        description="Access your orders, wishlist, and profile."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Sign In' },
        ]}
      />
      <section className="container mx-auto px-6 py-12 md:py-16">
        <AuthForm mode="login" />
      </section>
    </>
  )
}
