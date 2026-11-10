import { BadgeCheck, Star } from 'lucide-react'
import { Panel, Pill } from '@/components/kit'
import { cn } from '@/lib/utils'

const receipts = [
  {
    user: 'Laura M.',
    initials: 'LM',
    city: 'Medellín',
    product: 'Sony WH-1000XM5',
    store: 'Amazon USA',
    paid: 1_486_200,
    quoted: 1_479_000,
    rating: 4,
    cufe: 'a3f9…c71e',
    guide: '4-72 · RN8834120CO',
    steps: ['Compra', 'Miami', 'Aduana DIAN', 'Entregado'],
    done: 4,
    days: 9,
    note: 'Arancel cobrado igual al estimado. Llegó en caja original sellada.',
  },
  {
    user: 'Andrés R.',
    initials: 'AR',
    city: 'Bogotá',
    product: 'DJI Mini 3 Pro',
    store: 'Mercado Libre',
    paid: 4_389_000,
    quoted: 4_401_000,
    rating: 5,
    cufe: '7be2…09fa',
    guide: 'Envíos ML · MEL4410298',
    steps: ['Compra', 'Despacho', 'En ruta', 'Entregado'],
    done: 4,
    days: 1,
    note: 'Factura electrónica válida. Garantía DJI Colombia registrada.',
  },
  {
    user: 'Camila T.',
    initials: 'CT',
    city: 'Cali',
    product: 'Garmin Forerunner 265',
    store: 'AliExpress',
    paid: 1_241_000,
    quoted: 1_184_000,
    rating: 3,
    cufe: 'e10d…4b28',
    guide: 'Cainiao · LP0043877',
    steps: ['Compra', 'Shenzhen', 'Aduana DIAN', 'Entregado'],
    done: 3,
    days: 17,
    note: 'Retenido 5 días en aduana. Costo final +4.8% vs. estimado.',
  },
]

export function ReceiptFeed() {
  return (
    <section aria-label="Reportes verificados" className="flex flex-col gap-3">
      {receipts.map((r) => {
        const dev = ((r.paid - r.quoted) / r.quoted) * 100
        return (
          <Panel key={r.cufe} className="p-5">
            <article>
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-wine text-xs font-bold text-amber-300">
                    {r.initials}
                  </span>
                  <div>
                    <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                      {r.user}
                      <BadgeCheck className="size-4 text-ok" aria-label="Usuario verificado" />
                    </p>
                    <p className="text-xs text-dim">
                      {r.city} · {r.store}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5" aria-label={`${r.rating} de 5 estrellas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className={cn('size-3.5', i < r.rating ? 'fill-amber text-amber' : 'text-line')}
                    />
                  ))}
                </div>
              </header>

              <h3 className="mt-4 text-base font-semibold text-ink">{r.product}</h3>
              <p className="mt-1 text-sm text-dim">{r.note}</p>

              <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-line bg-elevated p-3 text-xs sm:grid-cols-4">
                <div>
                  <dt className="text-dim">Pagado</dt>
                  <dd className="tabular mt-0.5 font-semibold text-ink">${r.paid.toLocaleString('en-US')}</dd>
                </div>
                <div>
                  <dt className="text-dim">Desviación</dt>
                  <dd className={cn('tabular mt-0.5 font-semibold', Math.abs(dev) < 2 ? 'text-ok' : 'text-orange')}>
                    {dev > 0 ? '+' : ''}
                    {dev.toFixed(1)}%
                  </dd>
                </div>
                <div>
                  <dt className="text-dim">CUFE DIAN</dt>
                  <dd className="mt-0.5 font-mono font-semibold text-ink">{r.cufe}</dd>
                </div>
                <div>
                  <dt className="text-dim">Guía</dt>
                  <dd className="mt-0.5 truncate font-semibold text-ink">{r.guide}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-dim">
                  <span>Tracking</span>
                  <span className="tabular">{r.days} días</span>
                </div>
                <ol className="mt-2 grid grid-cols-4 gap-1.5">
                  {r.steps.map((s, i) => {
                    const reached = i < r.done
                    return (
                      <li key={s} className="flex flex-col gap-1.5">
                        <span className={cn('h-1 rounded-full', reached ? 'bg-brand' : 'bg-line')} />
                        <span className={cn('truncate text-[11px]', reached ? 'text-ink' : 'text-dim')}>{s}</span>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <footer className="mt-4 flex flex-wrap gap-2">
                <Pill tone="ok">Factura validada</Pill>
                <Pill tone={r.done === r.steps.length ? 'ok' : 'wine'}>
                  {r.done === r.steps.length ? 'Guía cerrada' : 'Guía en curso'}
                </Pill>
              </footer>
            </article>
          </Panel>
        )
      })}
    </section>
  )
}
