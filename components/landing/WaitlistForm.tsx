'use client'

import { useActionState, useEffect, useState } from 'react'
import { joinWaitlist, type WaitlistState } from '@/app/bolo-buddy/actions'

const initialState: WaitlistState = { message: '', type: 'error' }

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState)
  const [message, setMessage] = useState<WaitlistState | null>(null)

  useEffect(() => {
    if (state?.type) setMessage(state)
  }, [state])

  return (
    <section id="waitlist" className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <h2 className="font-serif text-body-charcoal mb-4 text-center text-2xl font-semibold sm:text-3xl">
          We&apos;re inviting Indian families into beta one at a time.
        </h2>
        <p className="text-subtext-grey mb-8 text-center text-sm sm:text-base">
          Add your email and we&apos;ll reach out personally.
        </p>
        <form action={formAction} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            disabled={isPending || (message?.type === 'success')}
            className="text-body-charcoal placeholder:text-subtext-grey flex-1 rounded-full border border-black/15 bg-white px-5 py-3 text-base outline-none focus:ring-2 focus:ring-cta-orange/40 sm:py-3.5"
          />
          <button
            type="submit"
            disabled={isPending || (message?.type === 'success')}
            className="rounded-full bg-black px-6 py-3.5 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-70 sm:shrink-0"
          >
            {isPending ? 'Joining…' : 'Join the waitlist'}
          </button>
        </form>
        {message?.message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.type === 'success' ? 'text-body-charcoal' : 'text-red-600'
            }`}
          >
            {message.message}
          </p>
        )}
      </div>
    </section>
  )
}
