import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { Kpi, PageHeader, Pill } from '@/components/kit'
import { FilterBar } from '@/components/comunidad/filter-bar'
import { ReceiptFeed } from '@/components/comunidad/receipt-feed'
import { StoreSemaphore } from '@/components/comunidad/store-semaphore'
import { DealRadar } from '@/components/comunidad/deal-radar'

export const metadata: Metadata = { title: 'Comunidad y Reseñas Verificadas · Equalyz' }

export default function ComunidadPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 md:px-8 md:py-10">
      <PageHeader
        eyebrow="Comunidad"
        title="Reseñas verificadas"
        badge={
          <Pill tone="amber">
            <ShieldCheck className="size-3" aria-hidden="true" /> Auditoría con factura y guía. Cero bots.
          </Pill>
        }
      />
      <FilterBar />
      <section aria-label="Métricas de auditoría" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Facturas auditadas" value="12.4K" delta="+312" hint="Últimos 30 días" />
        <Kpi label="Auténticas" value="98.6%" delta="+0.4" hint="Validación CUFE DIAN" />
        <Kpi label="Desviación promedio" value="±2.3%" hint="Precio pagado vs. publicado" />
        <Kpi label="Tránsito medio" value="6.8 días" delta="−0.9" hint="Importaciones courier" />
      </section>
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <ReceiptFeed />
        <aside className="flex flex-col gap-4">
          <StoreSemaphore />
          <DealRadar />
        </aside>
      </div>
    </div>
  )
}
