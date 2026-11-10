import type { Metadata } from 'next'
import { Download, Plus } from 'lucide-react'
import { Kpi, LiveDot, PageHeader, Pill, btn } from '@/components/kit'
import { ArbitrageMatrix } from '@/components/emprendedor/arbitrage-matrix'
import { BuyBoxTracker } from '@/components/emprendedor/buybox-tracker'
import { LandedCalculator } from '@/components/emprendedor/landed-calculator'

export const metadata: Metadata = { title: 'Emprendedor B2B · Equalyz' }

export default function EmprendedorPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 md:px-8 md:py-10">
      <PageHeader
        eyebrow="Panel B2B"
        title="Arbitraje y catálogo"
        badge={
          <Pill tone="ok">
            <LiveDot /> Sync DIAN &amp; TRM Activa
          </Pill>
        }
        actions={
          <>
            <a href="/arbitrage.csv" download className={btn.ghost}>
              <Download className="size-4" aria-hidden="true" /> Descargar CSV
            </a>
            <button type="button" className={btn.primary}>
              <Plus className="size-4" aria-hidden="true" /> Agregar Producto/SKU
            </button>
          </>
        }
      />

      <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="SKUs detectados" value="24" delta="+3" hint="Últimos 7 días" />
        <Kpi label="Alertas de subcotización" value="06" delta="+2" deltaTone="fire" hint="Bajo precio sugerido" />
        <Kpi label="Ahorro en courier" value="$1.8M" delta="COP" hint="Consolidación mensual" />
        <Kpi label="Salud de catálogo" value="94/100" delta="+4" hint="Precio, stock y margen" />
      </section>

      <ArbitrageMatrix />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <BuyBoxTracker />
        <LandedCalculator />
      </div>
    </div>
  )
}
