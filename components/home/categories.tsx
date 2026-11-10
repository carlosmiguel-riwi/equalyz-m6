import Link from 'next/link'
import { Headphones, Laptop, Watch, Camera, Gamepad2, Smartphone } from 'lucide-react'

const cats = [
  { name: 'Audio ANC', icon: Headphones, offers: 312, spread: '-21%' },
  { name: 'Laptops', icon: Laptop, offers: 184, spread: '-14%' },
  { name: 'Wearables', icon: Watch, offers: 226, spread: '-19%' },
  { name: 'Drones y cámaras', icon: Camera, offers: 97, spread: '-24%' },
  { name: 'Gaming', icon: Gamepad2, offers: 141, spread: '-11%' },
  { name: 'Smartphones', icon: Smartphone, offers: 408, spread: '-9%' },
]

export function Categories() {
  return (
    <section aria-labelledby="cat-title">
      <h2 id="cat-title" className="mb-5 text-xl font-bold tracking-tight text-ink md:text-2xl">
        Explorar categorías
      </h2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {cats.map((c) => (
          <li key={c.name}>
            <Link
              href={`/comparador?cat=${encodeURIComponent(c.name)}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-4 transition-colors hover:border-orange/40 hover:bg-elevated"
            >
              <c.icon className="size-5 text-dim transition-colors group-hover:text-amber" aria-hidden="true" />
              <span className="mt-4 text-sm font-semibold text-ink">{c.name}</span>
              <span className="mt-1 flex items-center justify-between text-xs text-dim">
                <span className="tabular">{c.offers} ofertas</span>
                <span className="tabular font-semibold text-ok">{c.spread}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
