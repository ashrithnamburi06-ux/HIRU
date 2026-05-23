import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Crumb = {
  label: string
  href?: string
}

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <header className="border-b border-[oklch(0.88_0.02_80)] bg-[oklch(0.99_0.005_80)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="contents">
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          href={crumb.href}
                          className="text-[10px] tracking-[0.2em] uppercase font-light text-[oklch(0.50_0.03_55)] hover:text-[oklch(0.30_0.03_50)]"
                        >
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-[10px] tracking-[0.2em] uppercase font-light text-[oklch(0.30_0.03_50)]">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {eyebrow && (
          <p className="text-[oklch(0.55_0.04_55)] text-[10px] tracking-[0.5em] uppercase mb-4 font-light">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[oklch(0.22_0.02_50)] font-extralight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-[oklch(0.50_0.03_55)] text-sm md:text-base font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
