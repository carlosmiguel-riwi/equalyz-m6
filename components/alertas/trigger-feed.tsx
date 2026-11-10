import { TrendingDown } from 'lucide-react'
import { Panel, PanelHeader, Pill, cop } from '@/components/kit'
import { cn } from '@/lib/utils'

const triggers = [
  { product: 'Sony WH-1000XM5', rule: 'Audio ANC · ≥ 15%', store: 'Amazon USA', before: 1_742_000, now: 1_479_000, local: 2_159_000, t: 'hace 4 min', hot: true },
  { product: 'DJI Mini 3 Pro', rule: 'Drones 4K · ≥ 10%', store: 'Amazon USA', before: 3_890_000, now: 3_412_000, local: 4_401_000, t: 'hace 22 min', hot: true },
  { product: 'Garmin Forerunner 265', rule: 'Tech & Wearables · ≥ 20%', store: 'AliExpress', before: 1_520_000, now: 1_184_000, local: 1_799_000, t: 'hace 1 h', hot: false },
  { product: 'AirPods Pro 2', rule: 'Audio ANC · ≥ 15%', store: 'Mercado Libre', before: 1_249_000, now: 1_029_000, local: 1_099_000, t: 'hace 3 h', hot: false },
]

export function TriggerFeed({ paused }: { paused: boolean }) {
  return (
    <Panel className={cn('transition-opacity', paused && 'opacity-50')}>
      <PanelHeader
        title="Disparadores activos"
        meta={<Pill tone={paused ? 'neutral' : 'ok'}>{paused ? 'Pausado' : '4 en las últimas 24 h'}</Pill>}
      />
      <ul className="divide-y divide-line">
        {triggers.map((t) => {
          const drop = ((t.before - t.now) / t.before) * 100
          const spread = t.local - t.now
          const spreadPct = (spread / t.now) * 100
          return (
            <li key={t.product} className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {t.hot && <Pill tone="fire">Nuevo</Pill>}
                  <Pill>{t.rule}</Pill>
                  <span className="text-xs text-dim">{t.t}</span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-ink">{t.product}</h3>
                <p className="flex flex-wrap items-center gap-x-2 text-sm text-dim">
                  {t.store} ·
                  <span className="tabular line-through">{cop(t.before)}</span>
                  <span className="tabular font-semibold text-ink">{cop(t.now)}</span>
                  <span className="tabular flex items-center gap-0.5 font-semibold text-ok">
                    <TrendingDown className="size-3.5" aria-hidden="true" />
                    {drop.toFixed(1)}%
                  </span>
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-4 rounded-xl border border-line bg-elevated px-4 py-3 text-xs md:min-w-64">
                <div>
                  <dt className="text-dim">Precio local</dt>
                  <dd className="tabular mt-0.5 font-semibold text-ink">${t.local.toLocaleString('en-US')}</dd>
                </div>
                <div>
                  <dt className="text-dim">Spread neto</dt>
                  <dd className={cn('tabular mt-0.5 font-bold', spread > 0 ? 'text-ok' : 'text-orange')}>
                    {spread > 0 ? '+' : ''}${spread.toLocaleString('en-US')}
                    <span className="ml-1 font-semibold">({spreadPct.toFixed(0)}%)</span>
                  </dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
