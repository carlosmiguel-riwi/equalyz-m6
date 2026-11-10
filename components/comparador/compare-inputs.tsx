'use client'

import { useState, useTransition } from 'react'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { btn } from '@/components/kit'

export function CompareInputs({ defaultA, defaultB }: { defaultA: string; defaultB: string }) {
  const [a, setA] = useState(defaultA)
  const [b, setB] = useState(defaultB)
  const [pending, startTransition] = useTransition()
  const [stamp, setStamp] = useState('hace 2 min')

  const recalc = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 700))
      setStamp('justo ahora')
    })
  }

  return (
    <form
      onSubmit={recalc}
      className="grid gap-2 rounded-2xl border border-line bg-panel p-2 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-center"
    >
      <UrlField id="url-a" label="Producto A" value={a} onChange={setA} />
      <span className="hidden px-1 text-xs font-bold text-dim lg:block" aria-hidden="true">
        VS
      </span>
      <UrlField id="url-b" label="Producto B" value={b} onChange={setB} />
      <div className="flex items-center gap-3 px-2 lg:px-0">
        <span className="text-xs text-dim lg:hidden" aria-live="polite">
          Actualizado {stamp}
        </span>
        <button type="submit" disabled={pending} className={cn(btn.primary, 'ml-auto h-10')}>
          <RefreshCw className={cn('size-4', pending && 'animate-spin')} aria-hidden="true" />
          {pending ? 'Calculando' : 'Recalcular'}
        </button>
      </div>
    </form>
  )
}

function UrlField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-elevated px-3">
      <label htmlFor={id} className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-orange">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-dim focus:outline-none"
        placeholder="https://"
      />
    </div>
  )
}
