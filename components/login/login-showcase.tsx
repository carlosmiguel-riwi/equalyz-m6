import Link from 'next/link'
import { LiveDot, Pill } from '@/components/kit'

const metrics = [
  { k: 'TRM', v: '$4,120', d: '+0.3%' },
  { k: 'SKUs monitoreados', v: '18.2K', d: '+412' },
  { k: 'Spread medio', v: '+31%', d: '7d' },
]

const opps = [
  { p: 'Garmin Forerunner 265', o: 'AliExpress → ML', s: 52 },
  { p: 'Sony WH-1000XM5', o: 'Amazon USA → ML', s: 46 },
  { p: 'GoPro Hero 12', o: 'AliExpress → Éxito', s: 36 },
  { p: 'DJI Mini 3 Pro', o: 'Amazon USA → ML', s: 29 },
]

export function LoginShowcase() {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-line bg-panel p-10 lg:flex">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-wine-2/30 blur-3xl"
      />
      <div className="relative flex items-center gap-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-ink">
          Equalyz
        </Link>
        <span className="rounded-md border border-line px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
          Market Intelligence
        </span>
      </div>

      <div className="relative flex max-w-lg flex-col gap-8">
        <div>
          <Pill tone="ok">
            <LiveDot /> Telemetría en vivo
          </Pill>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight text-ink">
            Landed cost real, <span className="text-brand">antes de comprar.</span>
          </h1>
        </div>

        <dl className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <div key={m.k} className="rounded-xl border border-line bg-elevated p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-dim">{m.k}</dt>
              <dd className="tabular mt-1 text-lg font-bold text-ink">{m.v}</dd>
              <dd className="tabular text-xs font-semibold text-ok">{m.d}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-2xl border border-line bg-elevated">
          <p className="border-b border-line px-4 py-3 text-xs font-semibold text-ink">Arbitraje en vivo</p>
          <ul className="divide-y divide-line">
            {opps.map((o) => (
              <li key={o.p} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{o.p}</p>
                  <p className="text-xs text-dim">{o.o}</p>
                </div>
                <span className="tabular font-bold text-ok">+{o.s}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="relative text-xs text-dim">© 2025 Equalyz. Todos los derechos reservados.</p>
    </aside>
  )
}
