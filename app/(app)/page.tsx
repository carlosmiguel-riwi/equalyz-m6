import { HeroSearch } from '@/components/home/hero-search'
import { ValueStats } from '@/components/home/value-stats'
import { WeeklyFaceoff } from '@/components/home/weekly-faceoff'
import { HowItWorks } from '@/components/home/how-it-works'
import { Categories } from '@/components/home/categories'

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-4 py-10 md:px-8 md:py-14">
      <HeroSearch />
      <ValueStats />
      <WeeklyFaceoff />
      <HowItWorks />
      <Categories />
    </div>
  )
}
