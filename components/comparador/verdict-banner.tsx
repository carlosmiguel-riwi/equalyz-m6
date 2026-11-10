import { CheckCircle2 } from 'lucide-react'

export function VerdictBanner() {
  return (
    <section
      aria-label="Veredicto"
      className="flex flex-col gap-4 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-wine/80 via-wine-2/40 to-panel p-5 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden="true" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300/80">Veredicto</p>
          <p className="mt-1 text-balance text-base font-semibold text-ink md:text-lg">
            Por <span className="tabular text-amber-400">+$10,000 COP</span> recibes en 24h con garantía directa en
            Colombia.
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-3 gap-6 text-xs md:shrink-0">
        <div>
          <dt className="text-dim">Diferencia</dt>
          <dd className="tabular mt-0.5 text-sm font-bold text-ink">+0.68%</dd>
        </div>
        <div>
          <dt className="text-dim">Días ahorrados</dt>
          <dd className="tabular mt-0.5 text-sm font-bold text-ok">−10</dd>
        </div>
        <div>
          <dt className="text-dim">Δ Score</dt>
          <dd className="tabular mt-0.5 text-sm font-bold text-ok">+15</dd>
        </div>
      </dl>
    </section>
  )
}
