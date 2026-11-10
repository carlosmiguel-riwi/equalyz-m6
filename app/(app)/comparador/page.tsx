import type { Metadata } from 'next'
import { PageHeader, Pill, LiveDot } from '@/components/kit'
import { CompareInputs } from '@/components/comparador/compare-inputs'
import { OfferCard } from '@/components/comparador/offer-card'
import { VerdictBanner } from '@/components/comparador/verdict-banner'
import { CriteriaMatrix } from '@/components/comparador/criteria-matrix'
import { faceoff } from '@/lib/data'

export const metadata: Metadata = { title: 'Comparador Cara a Cara · Equalyz' }

export default function ComparadorPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 md:px-8 md:py-10">
      <PageHeader
        eyebrow="Comparador"
        title="Cara a Cara"
        badge={
          <Pill tone="ok">
            <LiveDot /> TRM 4,120 · Tarifas courier hoy
          </Pill>
        }
      />
      <CompareInputs defaultA={faceoff.imported.url} defaultB={faceoff.local.url} />
      <div className="grid gap-4 lg:grid-cols-2">
        <OfferCard side="A" offer={faceoff.imported} product={faceoff.product} />
        <OfferCard side="B" offer={faceoff.local} product={faceoff.product} recommended />
      </div>
      <VerdictBanner />
      <CriteriaMatrix />
    </div>
  )
}
