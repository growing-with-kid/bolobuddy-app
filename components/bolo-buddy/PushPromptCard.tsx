'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { subscribeToPush } from '@/lib/push/subscribe'

type PushPromptCardProps = {
  show: boolean
}

export default function PushPromptCard({ show }: PushPromptCardProps) {
  const [visible, setVisible] = useState(show)
  const [loading, setLoading] = useState(false)

  async function markPrompted() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const existing = (user.user_metadata as Record<string, unknown>) ?? {}
    await supabase.auth.updateUser({
      data: { ...existing, push_prompted: true },
    })
    await supabase.auth.refreshSession()
  }

  async function handleSubscribe() {
    if (loading || !visible) return
    setLoading(true)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const accessToken = session?.access_token
    if (!accessToken) {
      setLoading(false)
      setVisible(false)
      await markPrompted()
      return
    }
    try {
      await subscribeToPush(accessToken)
      setVisible(false)
      await markPrompted()
    } catch {
      setVisible(false)
      await markPrompted()
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
      <p className="text-center text-gray-800">
        Roz raat 8 baje reminder chahiye? 🌙
      </p>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handleSubscribe}
          disabled={loading}
          className="rounded-full px-6 py-2.5 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-70"
          style={{ backgroundColor: '#FF6B35' }}
        >
          {loading ? '...' : 'Haan, bilkul!'}
        </button>
      </div>
    </div>
  )
}
