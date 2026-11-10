import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginShowcase } from '@/components/login/login-showcase'
import { AuthCard } from '@/components/login/auth-card'

export const metadata: Metadata = { title: 'Acceso · Equalyz' }

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh bg-canvas lg:grid-cols-[1.1fr_1fr]">
      <LoginShowcase />
      <section className="relative flex flex-col items-center justify-center px-4 py-10 md:px-8">
        <Link href="/" className="mb-8 text-xl font-bold tracking-tight text-ink lg:hidden">
          Equalyz
        </Link>
        <AuthCard />
      </section>
    </main>
  )
}
