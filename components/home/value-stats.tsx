import { Panel } from '@/components/kit'

const stats = [
  { value: '18%+', label: 'Ahorro medio', hint: 'vs. precio de vitrina' },
  { value: '100%', label: 'Sin sorpresas', hint: 'Costo puesto en puerta' },
  { value: '48+', label: 'Tiendas', hint: 'Nacionales e internacionales' },
  { value: '24h', label: 'Actualización', hint: 'Precios, TRM y tarifas' },
]

export function ValueStats() {
  return (
    <section aria-label="Indicadores clave" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <Panel key={s.label} className="p-5">
          <p className="tabular text-3xl font-extrabold tracking-tight text-brand">{s.value}</p>
          <p className="mt-2 text-sm font-semibold text-ink">{s.label}</p>
          <p className="text-xs text-dim">{s.hint}</p>
        </Panel>
      ))}
    </section>
  )
}
