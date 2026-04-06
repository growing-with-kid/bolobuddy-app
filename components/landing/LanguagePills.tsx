'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  { id: 'en', scriptLabel: 'English' },
  { id: 'hi', scriptLabel: 'हिंदी' },
  { id: 'hinglish', scriptLabel: 'Hinglish' },
  { id: 'ta', scriptLabel: 'தமிழ்' },
] as const

function getDefaultLanguageId(): string {
  if (typeof navigator === 'undefined') return 'en'
  const lang = (navigator.language || navigator.languages?.[0] || '').toLowerCase()
  if (lang.startsWith('hi')) return 'hi'
  if (lang.startsWith('ta')) return 'ta'
  if (lang.startsWith('en')) return 'en'
  return 'en'
}

export function LanguagePills() {
  const [selectedId, setSelectedId] = useState<string>('en')

  useEffect(() => {
    setSelectedId(getDefaultLanguageId())
  }, [])

  return (
    <div className="mb-6">
      <div className="text-[13px] text-[#666] font-medium uppercase tracking-wider mb-3">
        Language
      </div>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map(({ id, scriptLabel }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedId(id)}
            className={`rounded-[20px] border-2 px-4 py-2.5 text-sm font-medium transition-all ${
              selectedId === id
                ? 'border-[#9B7EDE] bg-gradient-to-br from-[#9B7EDE] to-[#C77DFF] text-white'
                : 'border-[#e5e5e5] bg-white text-[#666] hover:border-[#d0d0d0]'
            }`}
          >
            {scriptLabel}
          </button>
        ))}
      </div>
    </div>
  )
}
