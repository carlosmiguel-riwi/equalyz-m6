import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { LiveDot, Panel, PanelHeader, Pill } from '@/components/kit'
import { cn } from '@/lib/utils'

const feed = [
  { sku: 'Sony WH-1000XM5', market: 'Mercado Libre', seller: 'TecnoPlaza', price: 2_089_000, delta: -3.2, mine: false, t: '12s' },
  { sku: 'Sony WH-1000XM5', market: 'Mercado Libre', seller: 'Tu tienda', price: 2_159_000, delta: 0, mine: true, t: '1m' },
  { sku: 'DJI Mini 3 Pro', market: 'Amazon', seller: 'DroneHub', price: 4_455_000, delta: 1.4, mine: false, t: '3m' },
  { sku: 'Garmin FR 265', market: 'Mercado Libre', seller: 'RunStore', price: 1_749_000, delta: -2.7, mine: false, t: '6m' },
  { sku: 'AirPods Pro 2', market: 'Mercado Libre', seller: 'iMarket CO', price: 1_029_000, delta: -6.4, mine: false, t: '9m' },
]

export function BuyBoxTracker() {
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="Buy Box en vivo"
        meta={
          <Pill tone="ok">
            <LiveDot /> 5 competidores
          </Pill>
        }
        action={<span className="text-xs text-dim">Mercado Libre · Amazon</span>}
      />
      <ul className="divide-y divide-line">
        {feed.map((f, i) => (
          <li key={i} className={cn('flex items-center gap-4 px-5 py-3', f.mine && 'bg-wine/30')}>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{f.sku}</p>
              <p className="truncate text-xs text-dim">
                {f.market} · <span className={cn(f.mine && 'font-semibold text-amber-400')}>{f.seller}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="tabular text-sm font-semibold text-ink">${f.price.toLocaleString('en-US')}</p>
              <p
                className={cn(
                  'tabular flex items-center justify-end gap-0.5 text-xs font-semibold',
                  f.delta < 0 ? 'text-orange' : f.delta > 0 ? 'text-ok' : 'text-dim',
                )}
              >
                {f.delta < 0 && <ArrowDownRight className="size-3" aria-hidden="true" />}
                {f.delta > 0 && <ArrowUpRight className="size-3" aria-hidden="true" />}
                {f.delta === 0 ? 'Buy Box: no' : `${f.delta > 0 ? '+' : ''}${f.delta}%`}
              </p>
            </div>
            <span className="tabular w-8 text-right text-[11px] text-dim">{f.t}</span>
          </li>
        ))}
      </ul>
      <p className="mt-auto border-t border-line px-5 py-3 text-xs text-dim">
        Para recuperar la Buy Box en XM5: <span className="font-semibold text-amber-400">−$71,000 COP</span> · margen
        resultante <span className="font-semibold text-ok">+41%</span>
      </p>
    </Panel>
  )
}
