import { Meter, Panel, PanelHeader } from '@/components/kit'
import { cn } from '@/lib/utils'

const stores = [
  { name: 'Mercado Libre', score: 96, reports: '4.1K' },
  { name: 'Éxito', score: 93, reports: '1.8K' },
  { name: 'Amazon USA', score: 84, reports: '5.2K' },
  { name: 'AliExpress', score: 68, reports: '1.3K' },
]

const level = (s: number) => (s >= 90 ? 'ok' : s >= 75 ? 'brand' : 'fire')

export function StoreSemaphore() {
  return (
    <Panel>
      <PanelHeader title="Semáforo de confiabilidad" />
      <ul className="flex flex-col gap-4 p-5">
        {stores.map((s) => {
          const l = level(s.score)
          return (
            <li key={s.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-ink">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-2 rounded-full',
                      l === 'ok' && 'bg-ok',
                      l === 'brand' && 'bg-amber',
                      l === 'fire' && 'bg-fire',
                    )}
                  />
                  {s.name}
                </span>
                <span className="tabular text-xs text-dim">
                  <span className="font-bold text-ink">{s.score}%</span> · {s.reports}
                </span>
              </div>
              <Meter value={s.score} tone={l} />
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
