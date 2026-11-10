import { Clock, Truck, ShieldCheck, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel, Pill, ScoreRing, btn, cop } from '@/components/kit'
import type { CostLine } from '@/lib/data'

type Offer = {
  store: string
  tag: string
  total: number
  transit: string
  courier: string
  score: number
  warranty: string
  lines: CostLine[]
}

export function OfferCard({
  side,
  offer,
  product,
  recommended,
}: {
  side: 'A' | 'B'
  offer: Offer
  product: string
  recommended?: boolean
}) {
  return (
    <Panel
      elevated={recommended}
      aria-label={`Oferta ${side}: ${offer.store}`}
      className={cn('flex flex-col', recommended && 'border-orange/60 ring-1 ring-orange/25')}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-wine text-[11px] font-bold text-amber-400">
              {side}
            </span>
            <Pill tone={recommended ? 'amber' : 'neutral'}>{offer.tag}</Pill>
            {recommended && (
              <Pill tone="ok">
                <Zap className="size-3" aria-hidden="true" /> Entrega rápida
              </Pill>
            )}
          </div>
          <h2 className="mt-3 truncate text-lg font-semibold text-ink">{product}</h2>
          <p className="text-xs text-dim">{offer.store}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={offer.score} size={64} highlight={recommended} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-dim">Score</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-dim">Landed cost</p>
        <p className="tabular mt-1 text-3xl font-extrabold tracking-tight text-ink">{cop(offer.total)}</p>

        <dl className="mt-5 divide-y divide-line text-sm">
          {offer.lines.map((l) => (
            <div key={l.label} className="flex items-center justify-between gap-4 py-2">
              <dt className="min-w-0">
                <span className="text-ink">{l.label}</span>
                {l.note && <span className="block text-xs text-dim">{l.note}</span>}
              </dt>
              <dd className={cn('tabular shrink-0 font-semibold', l.value === 0 ? 'text-ok' : 'text-ink')}>
                {l.value === 0 ? '$0' : cop(l.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-line p-5 text-xs">
        <Fact icon={Clock} label="Tránsito" value={offer.transit} ok={recommended} />
        <Fact icon={Truck} label="Logística" value={offer.courier} />
        <Fact icon={ShieldCheck} label="Garantía" value={offer.warranty} ok={recommended} />
      </div>

      <div className="p-5 pt-0">
        <button type="button" className={cn(recommended ? btn.primary : btn.ghost, 'w-full')}>
          {recommended ? `Comprar en ${offer.store} →` : `Ver en ${offer.store}`}
        </button>
      </div>
    </Panel>
  )
}

function Fact({
  icon: Icon,
  label,
  value,
  ok,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  ok?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-dim">
        <Icon className="size-3.5" aria-hidden="true" /> {label}
      </p>
      <p className={cn('mt-1 truncate font-semibold', ok ? 'text-ok' : 'text-ink')}>{value}</p>
    </div>
  )
}
