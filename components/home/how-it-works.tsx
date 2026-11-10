import { Panel } from '@/components/kit'

const steps = [
  { n: '01', title: 'Pega la URL', body: 'Amazon, Mercado Libre, Éxito, AliExpress y 44 tiendas más.' },
  { n: '02', title: 'Calculamos el costo puesto', body: 'FOB × TRM + courier + arancel DIAN + IVA 19%.' },
  { n: '03', title: 'Decide con datos', body: 'Score 0–100 por precio, tiempo, garantía y devoluciones.' },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <h2 id="how-title" className="mb-5 text-xl font-bold tracking-tight text-ink md:text-2xl">
        Cómo funciona
      </h2>
      <ol className="grid gap-3 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n}>
            <Panel className="h-full p-5">
              <span className="tabular text-xs font-bold text-orange">{s.n}</span>
              <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-dim">{s.body}</p>
            </Panel>
          </li>
        ))}
      </ol>
    </section>
  )
}
