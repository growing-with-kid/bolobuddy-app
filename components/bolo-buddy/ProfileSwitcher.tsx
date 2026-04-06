'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ChildProfileRow } from '@/app/bolo-buddy/actions'

const COOKIE_NAME = 'bolo_active_child_id'

function setActiveChildCookie(profileId: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(profileId)};path=/;max-age=31536000`
}

export default function ProfileSwitcher({
  profiles,
  activeId,
}: {
  profiles: ChildProfileRow[]
  activeId?: string | null
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const active = profiles.find((p) => p.id === activeId) ?? profiles[0]
  if (profiles.length <= 1) return null

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span>{active?.name ?? 'Child'}</span>
        <span className="text-gray-400">▼</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setActiveChildCookie(p.id)
                setOpen(false)
                router.refresh()
              }}
              className={`block w-full px-4 py-2 text-left text-sm ${
                p.id === active?.id ? 'bg-orange-50 font-medium text-cta-orange' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
