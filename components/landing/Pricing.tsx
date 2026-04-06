import Link from 'next/link'

type PricingProps = { freeCtaHref?: string; premiumCtaHref?: string }

const freeFeatures = [
  '3 stories per month',
  '4 story moods: Bedtime Calm, Kind Heart, Nature Tales, Brave & Bold',
  'Hindi, English, Hinglish, Tamil',
  '2 voice options',
  'Listen anytime — no expiry',
]

const premiumFeatures = [
  'Unlimited stories, every night',
  'All 5 moods — including Mythology & Devotion',
  'Hindi, English, Hinglish, Tamil — more coming soon',
  'All 4 calm, familiar voices',
  'Save & download stories to keep forever',
  'Priority support',
]

export function Pricing({ freeCtaHref = '/bolo-buddy/signup', premiumCtaHref = '/bolo-buddy/signup' }: PricingProps) {
  return (
    <section id="pricing" className="relative z-10 scroll-mt-24 bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-body-charcoal mb-2 text-center text-2xl font-semibold sm:text-3xl">
          Simple, Fair Pricing
        </h2>
        <p className="text-subtext-grey mb-4 text-center text-sm sm:text-base">
          Start free. Upgrade anytime. Cancel anytime.
        </p>
        <p className="text-subtext-grey mb-12 text-center text-sm sm:text-base font-normal">
          Start with 3 free stories. No card needed. See if your child loves it.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          <div className="border-2 border-[#2D2D2D]/10 rounded-[24px] p-8 bg-white flex flex-col justify-between">
            <p className="text-body-charcoal mb-2 text-sm font-semibold uppercase tracking-wide">
              FREE PLAN
            </p>
            <p className="text-body-charcoal mb-1 font-serif text-4xl font-bold">₹0</p>
            <p className="text-subtext-grey mb-4 text-sm">Per family, free forever</p>
            <p className="text-body-charcoal mb-2 text-sm font-semibold">Bedtime Stories:</p>
            <ul className="text-subtext-grey mb-8 mt-2 list-disc space-y-2 pl-5 text-sm">
              {freeFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href={freeCtaHref}
              className="mt-auto rounded-full border-2 border-[#2D2D2D] bg-transparent px-6 py-3.5 text-center text-base font-medium text-[#2D2D2D] transition-transform duration-200 hover:scale-[1.02] min-h-[56px] flex items-center justify-center"
            >
              Try a free story →
            </Link>
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-[24px] p-8 bg-[#2D2D2D] shadow-[0_16px_64px_rgba(255,107,53,0.25)]">
            <div className="absolute top-4 right-4 text-[#FFD166] text-2xl opacity-60" aria-hidden>✦</div>
            <span className="inline-block w-fit bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
              Most Popular
            </span>
            <p className="text-white mb-2 text-sm font-semibold uppercase tracking-wide">
              PREMIUM
            </p>
            <p className="font-serif text-5xl font-extrabold text-white">₹299</p>
            <p className="text-white/60 text-sm mb-6">per month per family</p>
            <p className="text-white font-semibold mb-2 text-sm">Premium Services:</p>
            <ul className="text-white/95 mb-8 mt-2 list-disc space-y-2 pl-5 text-sm">
              {premiumFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href={premiumCtaHref ?? '/bolo-buddy/signup'}
              className="mt-auto w-full bg-[#FF6B35] text-white py-4 rounded-[100px] font-bold text-base text-center hover:bg-[#e55c25] transition-colors min-h-[56px] flex items-center justify-center"
            >
              Start Premium — ₹299/month
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
