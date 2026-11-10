import { Panel, PanelHeader, Pill } from '@/components/kit'
import { cn } from '@/lib/utils'

const rows: { k: string; a: string; b: string; win: 'A' | 'B' | '=' }[] = [
  { k: 'Precio final', a: '$1,479,000', b: '$1,489,000', win: 'A' },
  { k: 'Envío', a: '$86,400 · 8–12 días', b: '$0 · 24 h', win: 'B' },
  { k: 'Impuesto DIAN', a: '$342,421 (arancel + IVA)', b: 'Incluido en precio', win: 'B' },
  { k: 'Garantía', a: 'EE. UU. · envío a cargo', b: '12 meses en Colombia', win: 'B' },
  { k: 'Devoluciones', a: 'Internacional · 30 días', b: 'En tienda · 30 días', win: 'B' },
  { k: 'Riesgo TRM', a: 'Expuesto ±2.1%', b: 'Precio fijo COP', win: 'B' },
  { k: 'Score Equalyz', a: '79 / 100', b: '94 / 100', win: 'B' },
]

export function CriteriaMatrix() {
  return (
    <Panel>
      <PanelHeader title="Matriz de criterios" meta={<Pill>7 variables</Pill>} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-dim">
              <th scope="col" className="px-5 py-2.5 font-semibold">Criterio</th>
              <th scope="col" className="px-5 py-2.5 font-semibold">A · Amazon USA</th>
              <th scope="col" className="px-5 py-2.5 font-semibold">B · Éxito</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Gana</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.k} className="hover:bg-elevated/60">
                <th scope="row" className="px-5 py-3 text-left font-medium text-ink">{r.k}</th>
                <td className={cn('tabular px-5 py-3', r.win === 'A' ? 'font-semibold text-ok' : 'text-dim')}>{r.a}</td>
                <td className={cn('tabular px-5 py-3', r.win === 'B' ? 'font-semibold text-ok' : 'text-dim')}>{r.b}</td>
                <td className="px-5 py-3 text-right">
                  <Pill tone={r.win === 'B' ? 'amber' : 'neutral'}>{r.win}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
