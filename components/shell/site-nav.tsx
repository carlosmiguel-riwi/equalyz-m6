'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LiveDot } from '@/components/kit'

const routes = [
  { href: '/', label: 'Inicio' },
  { href: '/comparador', label: 'Comparador' },
  { href: '/emprendedor', label: 'Emprendedor B2B' },
  { href: '/comunidad', label: 'Comunidad' },
  { href: '/alertas', label: 'Alertas' },
]

export function SiteNav() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="text-lg font-extrabold tracking-tight text-ink">Equalyz</span>
          <span className="hidden rounded-md border border-line bg-elevated px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-dim sm:inline">
            Market Intelligence
          </span>
        </Link>

        <nav aria-label="Principal" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  aria-current={isActive(r.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive(r.href)
                      ? 'border-amber-500/20 bg-wine/50 text-amber-400'
                      : 'border-transparent text-dim hover:text-ink',
                  )}
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <span className="hidden items-center gap-1.5 rounded-lg border border-line bg-panel px-2.5 py-1 text-xs font-semibold text-ink md:inline-flex">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-3.5 overflow-hidden rounded-[2px]"
              style={{ background: 'linear-gradient(#fcd116 0 50%, #003893 50% 75%, #ce1126 75%)' }}
            />{' '}
            COP
          </span>
          <span className="hidden items-center gap-2 rounded-lg border border-ok/25 bg-ok/10 px-2.5 py-1 text-xs font-semibold text-ok sm:inline-flex">
            <LiveDot />
            <span className="tabular">TRM LIVE $4,120 COP</span>
          </span>
          <button
            type="button"
            aria-label="Notificaciones (3 nuevas)"
            className="relative grid size-9 place-items-center rounded-lg border border-line bg-panel text-dim transition-colors hover:text-ink"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-orange" />
          </button>
          <Link
            href="/login"
            aria-label="Cuenta"
            className="grid size-9 place-items-center rounded-lg bg-brand text-xs font-bold text-canvas"
          >
            CM
          </Link>
        </div>
      </div>

      <nav aria-label="Principal móvil" className="border-t border-line lg:hidden">
        <ul className="flex gap-1 overflow-x-auto px-4 py-2">
          {routes.map((r) => (
            <li key={r.href} className="shrink-0">
              <Link
                href={r.href}
                aria-current={isActive(r.href) ? 'page' : undefined}
                className={cn(
                  'block rounded-lg border px-3 py-1 text-xs font-medium',
                  isActive(r.href)
                    ? 'border-amber-500/20 bg-wine/50 text-amber-400'
                    : 'border-transparent text-dim',
                )}
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
