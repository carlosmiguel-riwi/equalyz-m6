'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Panel, PanelHeader, Pill } from '@/components/kit'
import { cn } from '@/lib/utils'

const initial = [
  { id: 1, title: 'AirPods Pro 2', store: 'Mercado Libre', price: '$1,029,000', off: '-18%', votes: 214 },
  { id: 2, title: 'Kindle Paperwhite', store: 'Amazon USA', price: '$612,000', off: '-22%', votes: 187 },
  { id: 3, title: 'Xiaomi Band 8', store: 'AliExpress', price: '$139,000', off: '-31%', votes: 96 },
]

export function DealRadar() {
  const [votes, setVotes] = useState<Record<number, -1 | 0 | 1>>({})

  const vote = (id: number, v: -1 | 1) => setVotes((p) => ({ ...p, [id]: p[id] === v ? 0 : v }))

  return (
    <Panel>
      <PanelHeader title="Radar de Ofertas" meta={<Pill tone="amber">Hoy</Pill>} />
      <ul className="divide-y divide-line">
        {initial.map((d) => {
          const mine = votes[d.id] ?? 0
          return (
            <li key={d.id} className="flex items-center gap-3 px-5 py-3">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => vote(d.id, 1)}
                  aria-pressed={mine === 1}
                  aria-label={`Votar a favor de ${d.title}`}
                  className={cn('rounded p-0.5 hover:bg-elevated', mine === 1 ? 'text-amber' : 'text-dim')}
                >
                  <ChevronUp className="size-4" aria-hidden="true" />
                </button>
                <span className="tabular text-xs font-bold text-ink">{d.votes + mine}</span>
                <button
                  type="button"
                  onClick={() => vote(d.id, -1)}
                  aria-pressed={mine === -1}
                  aria-label={`Votar en contra de ${d.title}`}
                  className={cn('rounded p-0.5 hover:bg-elevated', mine === -1 ? 'text-fire' : 'text-dim')}
                >
                  <ChevronDown className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{d.title}</p>
                <p className="text-xs text-dim">{d.store}</p>
              </div>
              <div className="text-right">
                <p className="tabular text-sm font-semibold text-ink">{d.price}</p>
                <p className="tabular text-xs font-semibold text-ok">{d.off}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
