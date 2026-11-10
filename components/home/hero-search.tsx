'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { btn, LiveDot, Pill } from '@/components/kit'
import { stores } from '@/lib/data'

export function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string[]>(['Amazon USA', 'Mercado Libre'])

  const toggle = (s: string) =>
    setActive((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (active.length) params.set('stores', active.join(','))
    router.push(`/comparador${params.size ? `?${params}` : ''}`)
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-line bg-panel px-5 py-12 md:px-12 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-orange/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Pill tone="ok" className="mx-auto">
          <LiveDot /> 48 tiendas sincronizadas · TRM 4,120
        </Pill>
        <h1 className="mt-5 text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
          Compara el costo real.{' '}
          <span className="text-brand">Fletes, aranceles e impuestos sin sorpresas.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-dim md:text-base">
          Costo puesto en Colombia: FOB, courier, arancel DIAN e IVA en una sola cifra.
        </p>

        <form onSubmit={submit} className="mt-8" role="search">
          <div className="flex flex-col gap-2 rounded-2xl border border-line bg-elevated p-2 sm:flex-row">
            <label htmlFor="hero-q" className="sr-only">
              URL o nombre del producto
            </label>
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="size-4 shrink-0 text-dim" aria-hidden="true" />
              <input
                id="hero-q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pega una URL o escribe: Sony WH-1000XM5"
                className="h-11 w-full bg-transparent text-sm text-ink placeholder:text-dim focus:outline-none"
              />
            </div>
            <button type="submit" className={cn(btn.primary, 'h-11 px-5')}>
              Comparar ofertas →
            </button>
          </div>

          <fieldset className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <legend className="sr-only">Tiendas a comparar</legend>
            {stores.map((s) => {
              const on = active.includes(s)
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s)}
                  className={cn(
                    'rounded-lg border px-3 py-1 text-xs font-medium transition-colors',
                    on
                      ? 'border-amber-500/30 bg-wine/50 text-amber-400'
                      : 'border-line bg-panel text-dim hover:text-ink',
                  )}
                >
                  {s}
                </button>
              )
            })}
          </fieldset>
        </form>
      </div>
    </section>
  )
}
