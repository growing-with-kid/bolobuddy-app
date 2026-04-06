'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UpgradeToast({ show }: { show: boolean }) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) return
    setVisible(true)
    router.replace('/bolo-buddy/dashboard')
    const t = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(t)
  }, [show, router])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-md rounded-xl px-4 py-3 text-center text-white shadow-lg sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
      style={{ backgroundColor: '#7B2FBE' }}
      role="status"
      aria-live="polite"
    >
      Welcome to Premium! Ab unlimited kahaniyaan suniye 🌙
    </div>
  )
}
