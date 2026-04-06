import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hasAnyChildProfile } from '../actions'
import Navbar from '@/components/bolo-buddy/Navbar'
import OnboardingFlow from '@/components/bolo-buddy/OnboardingFlow'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Set up your child | Bolo Buddy',
  description: 'A few quick questions so stories feel personal.',
}

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/bolo-buddy/signup')
  }

  const hasProfile = await hasAnyChildProfile()
  if (hasProfile) {
    redirect('/bolo-buddy/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <Navbar variant="light" pill />
      <main className="pt-[104px]">
        <div className="mx-auto max-w-lg px-4 py-8">
          <OnboardingFlow />
        </div>
      </main>
    </div>
  )
}
