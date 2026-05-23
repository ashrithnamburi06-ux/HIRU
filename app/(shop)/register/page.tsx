import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { AuthForm } from '@/components/auth/auth-form'
import { createPageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'Create Account',
  description: 'Join HIRU Elegance for exclusive access and a personalized experience.',
  path: '/register',
  noIndex: true,
})

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join"
        title="Create Account"
        description="Become part of the HIRU circle."
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Register' },
        ]}
      />
      <section className="container mx-auto px-6 py-12 md:py-16">
        <AuthForm mode="register" />
      </section>
    </>
  )
}
