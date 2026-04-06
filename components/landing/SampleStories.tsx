'use client'

import Link from 'next/link'

const sampleSelectorHref = '/bolo-buddy/sample'

const iconClass = 'h-[85%] w-[85%] min-h-[32px] min-w-[32px] text-white'

const stories = [
  {
    id: 'nanis-moonlight-garden',
    iconGradient: 'from-[#FF8C7E] to-[#FF6B9D]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    title: "Nani's Moonlight Garden (Hindi)",
    description: "A grandmother's secret garden that only blooms at night",
  },
  {
    id: 'cloud-forgot-rain',
    iconGradient: 'from-[#81C784] to-[#66BB6A]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6L12 2z" />
      </svg>
    ),
    title: 'The Cloud Who Forgot to Rain (English)',
    description: 'A worried little cloud learns to let go.',
  },
  {
    id: 'ammas-jasmine-song',
    iconGradient: 'from-[#7E57C2] to-[#5E35B1]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
        <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 5 3 6.5.5.5 1 1 1.5 1.5l1.5 1.5 1.5-1.5c.5-.5 1-1 1.5-1.5 1.5-1.5 3-4 3-6.5 0-3.5-2.5-6-6-6zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
      </svg>
    ),
    title: "Amma's Jasmine Song (Tamil)",
    description: 'How a jasmine flower helped find the way home',
  },
  {
    id: 'dadajis-train-story',
    iconGradient: 'from-[#F06292] to-[#EC407A]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
        <path d="M12 2l1.5 4.5L18 8l-3.5 2.5L16 15l-4-2.5L8 15l1.5-4.5L6 8l4.5-1.5L12 2z" />
      </svg>
    ),
    title: "Dadaji's Train Story (Hinglish)",
    description: 'A magical train ride through sleepy villages',
  },
]

function StoryCard({
  iconGradient,
  icon,
  title,
  description,
  sampleId,
}: {
  iconGradient: string
  icon: React.ReactNode
  title: string
  description: string
  sampleId: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <div
        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${iconGradient}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm text-body-charcoal">{title}</p>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
      <Link
        href={`/bolo-buddy/sample/play/${sampleId}`}
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-white shadow-[0_4px_16px_rgba(255,107,53,0.3)] transition-transform duration-150 hover:scale-105 active:scale-95"
        aria-label={`Play ${title}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden>
          <path d="M6.5 4.5l9 5.5-9 5.5V4.5z" />
        </svg>
      </Link>
    </div>
  )
}

export function SampleStories() {
  return (
    <section
      id="sample-stories"
      className="relative overflow-hidden py-20 px-4"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 50%,
            rgba(255, 140, 60, 0.12) 0%,
            rgba(255, 100, 80, 0.08) 40%,
            rgba(255, 200, 180, 0.05) 70%,
            transparent 100%),
          radial-gradient(ellipse 60% 80% at 80% 60%,
            rgba(220, 100, 150, 0.08) 0%,
            transparent 60%)
        `,
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-serif text-body-charcoal mb-2 text-center text-2xl font-semibold sm:text-3xl">
          Listen to Sample Stories
        </h2>
        <p className="text-subtext-grey mb-10 text-center text-sm sm:text-base">
          Stories rooted in your family&apos;s world. Hear the kind of calm, gentle stories your child will drift off to—before you sign up for anything.
        </p>
        <div className="flex flex-col gap-3">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              iconGradient={story.iconGradient}
              icon={story.icon}
              title={story.title}
              description={story.description}
              sampleId={story.id}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href={sampleSelectorHref}
            className="rounded-full border-2 border-cta-orange bg-transparent px-8 py-3.5 text-base font-medium text-body-charcoal transition-transform duration-200 hover:scale-[1.02]"
          >
            Browse all samples →
          </Link>
        </div>
      </div>
    </section>
  )
}
