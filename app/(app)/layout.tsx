import { SiteNav } from '@/components/shell/site-nav'
import { SiteFooter } from '@/components/shell/site-footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
