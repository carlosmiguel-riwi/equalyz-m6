import { Panel, PanelHeader, Pill, Meter } from '@/components/kit'
import { cn } from '@/lib/utils'

const rows = [
  { sku: 'EQ-AUD-0142', name: 'Sony WH-1000XM5', origin: 'Amazon USA', landed: 1_479_000, local: 2_159_000, margin: 46, status: 'ok' },
  { sku: 'EQ-DRN-0087', name: 'DJI Mini 3 Pro', origin: 'Amazon USA', landed: 3_412_000, local: 4_401_000, margin: 29, status: 'ok' },
  { sku: 'EQ-WRB-0311', name: 'Garmin Forerunner 265', origin: 'AliExpress', landed: 1_184_000, local: 1_799_000, margin: 52, status: 'ok' },
  { sku: 'EQ-AUD-0219', name: 'AirPods Pro 2', origin: 'Amazon USA', landed: 812_000, local: 1_099_000, margin: 35, status: 'under' },
  { sku: 'EQ-LAP-0055', name: 'MacBook Air M3 13"', origin: 'Amazon USA', landed: 4_620_000, local: 5_390_000, margin: 17, status: 'thin' },
  { sku: 'EQ-CAM-0120', name: 'GoPro Hero 12', origin: 'AliExpress', landed: 1_290_000, local: 1_749_000, margin: 36, status: 'ok' },
] as const

const fmt = (n: number) => '$' + n.toLocaleString('en-US')

export function ArbitrageMatrix() {
  return (
    <Panel>
      <PanelHeader
        title="Matriz de arbitraje"
        meta={<Pill>6 de 24 SKUs</Pill>}
        action={<span className="hidden text-xs text-dim sm:inline">Valores en COP · TRM 4,120</span>}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-dim">
              <th scope="col" className="px-5 py-2.5 font-semibold">SKU</th>
              <th scope="col" className="px-5 py-2.5 font-semibold">Producto</th>
              <th scope="col" className="px-5 py-2.5 font-semibold">Origen</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Landed cost</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Precio local sugerido</th>
              <th scope="col" className="w-48 px-5 py-2.5 font-semibold">Margin spread</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.sku} className="hover:bg-elevated/60">
                <td className="tabular px-5 py-3 text-xs font-semibold text-dim">{r.sku}</td>
                <th scope="row" className="px-5 py-3 text-left font-medium text-ink">{r.name}</th>
                <td className="px-5 py-3 text-dim">{r.origin}</td>
                <td className="tabular px-5 py-3 text-right text-ink">{fmt(r.landed)}</td>
                <td className="tabular px-5 py-3 text-right font-semibold text-ink">{fmt(r.local)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'tabular w-10 text-sm font-bold',
                        r.margin >= 25 ? 'text-ok' : 'text-orange',
                      )}
                    >
                      +{r.margin}%
                    </span>
                    <Meter value={Math.min(100, r.margin * 1.6)} tone={r.margin >= 25 ? 'ok' : 'fire'} />
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  {r.status === 'ok' && <Pill tone="ok">Óptimo</Pill>}
                  {r.status === 'under' && <Pill tone="fire">Subcotizado</Pill>}
                  {r.status === 'thin' && <Pill tone="wine">Margen bajo</Pill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
