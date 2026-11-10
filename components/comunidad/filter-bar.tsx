'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { btn } from '@/components/kit'

const selects = [
  { id: 'store', label: 'Tienda', options: ['Todas las tiendas', 'Mercado Libre', 'Amazon USA', 'Éxito', 'AliExpress'] },
  { id: 'ship', label: 'Tiempo de envío', options: ['Cualquier envío', '≤ 24 h', '2–5 días', '6–15 días', '> 15 días'] },
  { id: 'warranty', label: 'Garantía', options: ['Cualquier garantía', 'Garantía en Colombia', 'Garantía internacional', 'Sin garantía'] },
]

export function FilterBar() {
  const [q, setQ] = useState('')
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-line bg-panel p-2 lg:flex-row lg:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-elevated px-3">
        <Search className="size-4 text-dim" aria-hidden="true" />
        <label htmlFor="community-q" className="sr-only">
          Buscar producto o tienda
        </label>
        <input
          id="community-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar producto, tienda o CUFE"
          className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-dim focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex">
        {selects.map((s) => (
          <div key={s.id}>
            <label htmlFor={s.id} className="sr-only">
              {s.label}
            </label>
            <select
              id={s.id}
              className="h-10 w-full rounded-xl border border-line bg-elevated px-3 text-sm text-ink focus:border-orange focus:outline-none"
            >
              {s.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button type="button" className={btn.primary + ' h-10'}>
        <Plus className="size-4" aria-hidden="true" /> Publicar reporte
      </button>
    </div>
  )
}
