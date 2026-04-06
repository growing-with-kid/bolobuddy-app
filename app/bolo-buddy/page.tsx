'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/bolo-buddy/Navbar'
import { Hero } from '@/components/landing/Hero'
import { PapaKiAwaazSection } from '@/components/landing/PapaKiAwaazSection'
import { FeatureCards } from '@/components/landing/FeatureCards'
import { SampleStories } from '@/components/landing/SampleStories'
import { Pricing } from '@/components/landing/Pricing'
import { FounderCredit } from '@/components/landing/FounderCredit'
import BoloFooter from '@/components/bolo-buddy/Footer'

export default function BoloBuddyPage() {
  const [premiumCtaHref, setPremiumCtaHref] = useState('/bolo-buddy/signup')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setPremiumCtaHref(session?.user ? '/bolo-buddy/pricing' : '/bolo-buddy/signup')
    })
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal flex flex-col">
        <Navbar variant="light" pill />
        <main className="pt-[104px] flex-1">
          <Hero sampleHref="/bolo-buddy/sample" signupHref="/bolo-buddy/signup" />
          <SampleStories />
          <PapaKiAwaazSection />
          <FeatureCards />
          <Pricing freeCtaHref="/bolo-buddy/signup" premiumCtaHref={premiumCtaHref} />
          <FounderCredit />
          <BoloFooter />
        </main>
      </div>
    </>
  )
}
