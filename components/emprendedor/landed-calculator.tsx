'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Panel, PanelHeader, Pill, Toggle, cop } from '@/components/kit'
import { TRM } from '@/lib/data'

const couriers = [
  { id: '472', name: '4-72 Express', perLb: 4.5 },
  { id: 'dhl', name: 'DHL', perLb: 7.9 },
  { id: 'box', name: 'Casillero', perLb: 3.2 },
]

export function LandedCalculator() {
  const [fob, setFob] = useState(248)
  const [lbs, setLbs] = useState(2.1)
  const [courierId, setCourierId] = useState('472')
  const [exemption, setExemption] = useState(true)
  const [salePrice, setSalePrice] = useState(2_159_000)

  const r = useMemo(() => {
    const courier = couriers.find((c) => c.id === courierId)!
    const freightUsd = courier.perLb * Math.max(1, lbs) + 5
    const exempt = exemption && fob <= 200
    const cifUsd = fob + freightUsd
    const dutyUsd = exempt ? 0 : cifUsd * 0.1
    const vatUsd = exempt ? 0 : (cifUsd + dutyUsd) * 0.19
    const totalUsd = cifUsd + dutyUsd + vatUsd
    const total = totalUsd * TRM
    const margin = salePrice > 0 ? ((salePrice - total) / total) * 100 : 0
    return {
      exempt,
      lines: [
        { k: 'FOB', v: fob * TRM },
        { k: `Flete ${courier.name}`, v: freightUsd * TRM },
        { k: 'Arancel 10%', v: dutyUsd * TRM },
        { k: 'IVA 19%', v: vatUsd * TRM },
      ],
      total,
      margin,
    }
  }, [fob, lbs, courierId, exemption, salePrice])

  return (
    <Panel>
      <PanelHeader
        title="Calculadora Landed Cost & DIAN"
        meta={r.exempt ? <Pill tone="ok">Exento</Pill> : <Pill tone="wine">Tributa</Pill>}
      />
      <div className="grid gap-5 p-5 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <NumField id="fob" label="Valor FOB (USD)" value={fob} step={1} onChange={setFob} />
          <NumField id="lbs" label="Peso (lb)" value={lbs} step={0.1} onChange={setLbs} />
          <NumField id="sale" label="Precio de venta (COP)" value={salePrice} step={1000} onChange={setSalePrice} />

          <fieldset>
            <legend className="mb-1.5 text-xs font-medium text-dim">Courier</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {couriers.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={courierId === c.id}
                  onClick={() => setCourierId(c.id)}
                  className={cn(
                    'rounded-lg border px-2 py-1.5 text-left text-xs transition-colors',
                    courierId === c.id
                      ? 'border-amber-500/30 bg-wine/50 text-amber-400'
                      : 'border-line bg-elevated text-dim hover:text-ink',
                  )}
                >
                  <span className="block font-semibold">{c.name}</span>
                  <span className="tabular">${c.perLb}/lb</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-elevated px-3 py-2.5">
            <div>
              <p id="exempt-label" className="text-sm font-medium text-ink">
                {'Exención < $200 USD'}
              </p>
              <p className="text-xs text-dim">Tráfico postal · sin arancel ni IVA</p>
            </div>
            <Toggle checked={exemption} onChange={setExemption} label="Aplicar exención menor a 200 USD" />
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-line bg-elevated p-4">
          <dl className="divide-y divide-line text-sm">
            {r.lines.map((l) => (
              <div key={l.k} className="flex justify-between gap-3 py-2">
                <dt className="text-dim">{l.k}</dt>
                <dd className={cn('tabular font-semibold', l.v === 0 ? 'text-ok' : 'text-ink')}>{cop(l.v)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto border-t border-line pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-dim">Landed cost</p>
            <p className="tabular text-2xl font-extrabold tracking-tight text-ink" aria-live="polite">
              {cop(r.total)}
            </p>
            <p className="mt-2 text-xs text-dim">
              Margen sobre venta:{' '}
              <span className={cn('tabular font-bold', r.margin >= 25 ? 'text-ok' : 'text-orange')}>
                {r.margin >= 0 ? '+' : ''}
                {r.margin.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </Panel>
  )
}

function NumField({
  id,
  label,
  value,
  step,
  onChange,
}: {
  id: string
  label: string
  value: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-dim">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="tabular h-10 w-full rounded-lg border border-line bg-elevated px-3 text-sm text-ink focus:border-orange focus:outline-none"
      />
    </div>
  )
}
