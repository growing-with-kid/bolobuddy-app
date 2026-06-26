'use client'

import Link from 'next/link'
import GwkMemorySparkCard from './GwkMemorySparkCard'

type Props = {
  showGwkCard: boolean
  storyCount: number
}

export default function StoryOutro({ showGwkCard, storyCount }: Props) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-600">Sweet dreams. 🌙</p>
      <Link
        href="/bolo-buddy/stories"
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-cta-orange px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        One more story?
      </Link>
      {showGwkCard && <GwkMemorySparkCard storyCount={storyCount} />}
    </section>
  )
}
