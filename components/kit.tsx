import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative flex size-2', className)} aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-ok" />
    </span>
  )
}

export function Panel({
  className,
  elevated,
  children,
  ...props
}: React.ComponentProps<'section'> & { elevated?: boolean }) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-line',
        elevated ? 'bg-elevated' : 'bg-panel',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function PanelHeader({
  title,
  meta,
  action,
  className,
}: {
  title: string
  meta?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between gap-3 border-b border-line px-5 py-3.5', className)}>
      <div className="flex min-w-0 items-center gap-2.5">
        <h2 className="truncate text-sm font-semibold text-ink">{title}</h2>
        {meta}
      </div>
      {action}
    </div>
  )
}

type Tone = 'wine' | 'ok' | 'amber' | 'neutral' | 'fire'

const toneMap: Record<Tone, string> = {
  wine: 'border-wine-2/60 bg-wine/60 text-amber-300',
  ok: 'border-ok/25 bg-ok/10 text-ok',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-400',
  neutral: 'border-line bg-elevated text-dim',
  fire: 'border-fire/30 bg-fire/10 text-orange',
}

export function Pill({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: Tone
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-semibold',
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Kpi({
  label,
  value,
  delta,
  deltaTone = 'ok',
  hint,
}: {
  label: string
  value: string
  delta?: string
  deltaTone?: 'ok' | 'fire'
  hint?: string
}) {
  return (
    <Panel className="p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-dim">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="tabular text-2xl font-bold tracking-tight text-ink">{value}</p>
        {delta && (
          <span className={cn('tabular text-xs font-semibold', deltaTone === 'ok' ? 'text-ok' : 'text-orange')}>
            {delta}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-dim">{hint}</p>}
    </Panel>
  )
}

export function PageHeader({
  eyebrow,
  title,
  badge,
  actions,
}: {
  eyebrow?: string
  title: string
  badge?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">{eyebrow}</p>
        )}
        <div className="mt-1.5 flex flex-wrap items-center gap-3">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-ink md:text-3xl">{title}</h1>
          {badge}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange disabled:opacity-50'

export const btn = {
  primary: cn(btnBase, 'bg-brand text-canvas hover:brightness-110'),
  ghost: cn(btnBase, 'border border-line bg-panel text-ink hover:bg-elevated'),
}

export function BtnLink({
  href,
  variant = 'primary',
  className,
  children,
}: {
  href: string
  variant?: keyof typeof btn
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={cn(btn[variant], className)}>
      {children}
    </Link>
  )
}

export function ScoreRing({ score, size = 56, highlight }: { score: number; size?: number; highlight?: boolean }) {
  const r = (size - 6) / 2
  const c = 2 * Math.PI * r
  const id = `g-${score}-${size}`
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffba08" />
            <stop offset="50%" stopColor="#f48c06" />
            <stop offset="100%" stopColor="#dc2f02" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#333851" strokeWidth="4" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={highlight ? `url(#${id})` : '#94a3b8'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="tabular text-sm font-bold text-ink">{score}</span>
        <span className="sr-only">de 100</span>
      </span>
    </div>
  )
}

export function Meter({ value, tone = 'brand' }: { value: number; tone?: 'brand' | 'ok' | 'fire' }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
      <div
        className={cn(
          'h-full rounded-full',
          tone === 'brand' && 'bg-brand',
          tone === 'ok' && 'bg-ok',
          tone === 'fire' && 'bg-fire',
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors',
        checked ? 'border-transparent bg-brand' : 'border-line bg-elevated',
        className,
      )}
    >
      <span
        className={cn(
          'inline-block size-3.5 rounded-full bg-ink shadow transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-[2px]',
        )}
      />
    </button>
  )
}

export const cop = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-US') + ' COP'
