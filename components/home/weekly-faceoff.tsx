import { ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import { BtnLink, Panel, Pill, ScoreRing, cop } from '@/components/kit'
import { faceoff } from '@/lib/data'
import { cn } from '@/lib/utils'

export function WeeklyFaceoff() {
  const { imported, local, product } = faceoff
  const cards = [
    { ...imported, highlight: false, eta: imported.transit },
    { ...local, highlight: true, eta: local.transit },
  ]

  return (
    <section aria-labelledby="faceoff-title">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">Semana 45</p>
          <h2 id="faceoff-title" className="mt-1 text-xl font-bold tracking-tight text-ink md:text-2xl">
            Análisis Cara a Cara de la Semana
          </h2>
        </div>
        <BtnLink href="/comparador" variant="ghost">
          Ver desglose completo <ArrowRight className="size-4" />
        </BtnLink>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Panel
            key={c.store}
            elevated={c.highlight}
            className={cn('p-5', c.highlight && 'border-orange/50 ring-1 ring-orange/20')}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={c.highlight ? 'amber' : 'neutral'}>{c.tag}</Pill>
                  {c.highlight && <Pill tone="ok">Recomendado</Pill>}
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink">{product}</h3>
                <p className="text-xs text-dim">{c.store}</p>
              </div>
              <ScoreRing score={c.score} highlight={c.highlight} />
            </div>
            <p className="tabular mt-5 text-3xl font-extrabold tracking-tight text-ink">{cop(c.total)}</p>
            <p className="text-xs text-dim">Costo puesto en Bogotá</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-dim" aria-hidden="true" />
                <dt className="sr-only">Entrega</dt>
                <dd className={cn('font-semibold', c.highlight ? 'text-ok' : 'text-ink')}>{c.eta}</dd>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-dim" aria-hidden="true" />
                <dt className="sr-only">Garantía</dt>
                <dd className="font-semibold text-ink">{c.warranty}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </section>
  )
}
