'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { btn } from '@/components/kit'

type Mode = 'login' | 'signup'

export function AuthCard() {
  const [mode, setMode] = useState<Mode>('login')

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-elevated/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
      <div role="tablist" aria-label="Acceso" className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-panel p-1">
        {(
          [
            ['login', 'Iniciar Sesión'],
            ['signup', 'Crear Cuenta'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={mode === id}
            aria-controls="auth-panel"
            onClick={() => setMode(id)}
            className={cn(
              'rounded-md py-2 text-sm font-semibold transition-colors',
              mode === id ? 'border border-amber-500/20 bg-wine/50 text-amber-400' : 'text-dim hover:text-ink',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="auth-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="mt-6">
        <h2 className="text-xl font-bold tracking-tight text-ink">
          {mode === 'login' ? 'Accede a tu radar' : 'Crea tu cuenta corporativa'}
        </h2>
        <p className="mt-1 text-sm text-dim">
          {mode === 'login' ? 'Alertas, SKUs y landed cost sincronizados.' : '14 días de prueba · sin tarjeta.'}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button type="button" className={btn.ghost}>
            <GoogleMark /> Google
          </button>
          <button type="button" className={btn.ghost}>
            <AppleMark /> Apple
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-wider text-dim">
          <span className="h-px flex-1 bg-line" /> o con correo <span className="h-px flex-1 bg-line" />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          {mode === 'signup' && <Field id="company" label="Empresa / NIT" type="text" autoComplete="organization" />}
          <Field id="email" label="Correo corporativo" type="email" autoComplete="email" placeholder="tu@empresa.co" />
          <Field
            id="password"
            label="Contraseña"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
          <button type="submit" className={cn(btn.primary, 'mt-2 h-11')}>
            Ingresar al Radar →
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-dim">
          Al continuar aceptas los Términos y la Política de datos (Ley 1581).
        </p>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-dim">
        {label}
      </label>
      <input
        id={id}
        name={id}
        required
        {...props}
        className="h-11 w-full rounded-lg border border-line bg-panel px-3 text-sm text-ink placeholder:text-dim focus:border-orange focus:outline-none"
      />
    </div>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  )
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-ink" aria-hidden="true">
      <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
    </svg>
  )
}
