import type { Metadata } from 'next'
import { AlertsWorkspace } from '@/components/alertas/alerts-workspace'

export const metadata: Metadata = { title: 'Alertas & Telemetría · Equalyz' }

export default function AlertasPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 md:px-8 md:py-10">
      <AlertsWorkspace />
    </div>
  )
}
