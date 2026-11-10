'use client'

import { useState } from 'react'
import { Bell, Send, Webhook } from 'lucide-react'
import { Panel, PanelHeader, Toggle } from '@/components/kit'
import { cn } from '@/lib/utils'

const tagOptions = ['Tech & Wearables', 'Audio ANC', 'Drones 4K', 'Laptops', 'Gaming', 'Smart Home']

const channelDefs = [
  { id: 'push', label: 'Push', hint: 'Navegador y móvil', icon: Bell },
  { id: 'telegram', label: 'Telegram Bot', hint: '@equalyz_radar_bot', icon: Send },
  { id: 'whatsapp', label: 'WhatsApp Webhook', hint: 'POST · JSON firmado', icon: Webhook },
] as const

export function AlertConfig() {
  const [tags, setTags] = useState<string[]>(['Tech & Wearables', 'Audio ANC', 'Drones 4K'])
  const [discount, setDiscount] = useState(15)
  const [minSpread, setMinSpread] = useState(20)
  const [channels, setChannels] = useState<Record<string, boolean>>({ push: true, telegram: true, whatsapp: false })

  const toggleTag = (t: string) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))

  return (
    <Panel elevated className="h-fit">
      <PanelHeader title="Configuración de reglas" />
      <div className="flex flex-col gap-6 p-5">
        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-dim">Categorías</legend>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((t) => {
              const on = tags.includes(t)
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleTag(t)}
                  className={cn(
                    'rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors',
                    on
                      ? 'border-amber-500/30 bg-wine/50 text-amber-400'
                      : 'border-line bg-panel text-dim hover:text-ink',
                  )}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </fieldset>

        <Slider id="disc" label="Descuento mínimo" value={discount} min={5} max={50} onChange={setDiscount} />
        <Slider id="spread" label="Spread neto mínimo" value={minSpread} min={5} max={60} onChange={setMinSpread} />

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-dim">Canales</legend>
          <ul className="flex flex-col gap-2">
            {channelDefs.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-xl border border-line bg-panel px-3 py-2.5"
              >
                <c.icon className="size-4 text-dim" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{c.label}</p>
                  <p className="truncate text-xs text-dim">{c.hint}</p>
                </div>
                <Toggle
                  checked={!!channels[c.id]}
                  onChange={(v) => setChannels((p) => ({ ...p, [c.id]: v }))}
                  label={c.label}
                />
              </li>
            ))}
          </ul>
        </fieldset>

        <p className="rounded-xl border border-line bg-panel px-3 py-2.5 text-xs text-dim">
          Dispara cuando descuento <span className="tabular font-semibold text-ink">≥ {discount}%</span> y spread neto{' '}
          <span className="tabular font-semibold text-ink">≥ {minSpread}%</span> en{' '}
          <span className="tabular font-semibold text-ink">{tags.length}</span> categorías.
        </p>
      </div>
    </Panel>
  )
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-dim">
          {label}
        </label>
        <output htmlFor={id} className="tabular text-sm font-bold text-amber-400">
          {value}%
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range w-full"
        style={{ ['--p' as string]: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  )
}
