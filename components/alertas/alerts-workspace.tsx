'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { LiveDot, PageHeader, Toggle, btn } from '@/components/kit'
import { TriggerFeed } from './trigger-feed'
import { AlertConfig } from './alert-config'

export function AlertsWorkspace() {
  const [engineOn, setEngineOn] = useState(true)

  return (
    <>
      <PageHeader
        eyebrow="Alertas"
        title="Telemetría de precios"
        actions={
          <>
            <div className="flex h-9 items-center gap-2.5 rounded-lg border border-line bg-panel px-3">
              {engineOn && <LiveDot />}
              <span className="text-sm font-medium text-ink">
                Motor Telemetría <span className="text-dim">({engineOn ? '4 activas' : 'en pausa'})</span>
              </span>
              <Toggle checked={engineOn} onChange={setEngineOn} label="Motor de telemetría" />
            </div>
            <button type="button" className={btn.primary}>
              <Plus className="size-4" aria-hidden="true" /> Nueva Regla de Alerta
            </button>
          </>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
        <TriggerFeed paused={!engineOn} />
        <AlertConfig />
      </div>
    </>
  )
}
