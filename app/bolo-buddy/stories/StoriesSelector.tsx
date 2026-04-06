'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const ages = ['3–4', '5–6', '7–8']
const moods = [
  { label: 'Happy 😊', value: 'happy' },
  { label: 'Sleepy 😴', value: 'sleepy' },
  { label: 'Curious 🤔', value: 'curious' },
  { label: 'Sad 🌧', value: 'sad' },
]
const LANGUAGES = [
  { id: 'en', scriptLabel: 'English' },
  { id: 'hi', scriptLabel: 'हिंदी' },
  { id: 'hinglish', scriptLabel: 'Hinglish' },
  { id: 'ta', scriptLabel: 'தமிழ்' },
] as const

function getDefaultLanguageId(): string {
  if (typeof navigator === 'undefined') return 'en'
  const lang = (navigator.language || '').toLowerCase()
  if (lang.startsWith('hi')) return 'hi'
  if (lang.startsWith('ta')) return 'ta'
  if (lang.startsWith('en')) return 'en'
  return 'en'
}

export default function StoriesSelector() {
  const [age, setAge] = useState('5–6')
  const [mood, setMood] = useState('sleepy')
  const [languageId, setLanguageId] = useState('en')

  useEffect(() => {
    setLanguageId(getDefaultLanguageId())
  }, [])

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/bolo-buddy"
        className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back
      </Link>
      <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
        Tonight&apos;s Story
      </h1>
      <p className="mt-2 text-gray-600">
        Choose what your child is feeling right now.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Age</p>
          <div className="flex flex-wrap gap-2">
            {ages.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAge(a)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  age === a
                    ? 'bg-cta-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Mood</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mood === m.value
                    ? 'bg-cta-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Language</p>
          <p className="mb-2 text-xs text-gray-500">In the script your child knows. Each language has equal standing.</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(({ id, scriptLabel }) => (
              <button
                key={id}
                type="button"
                onClick={() => setLanguageId(id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  languageId === id
                    ? 'bg-cta-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {scriptLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={`/bolo-buddy/stories/play/1?language=${encodeURIComponent(languageId)}&mood=${encodeURIComponent(mood)}`}
        className="mt-10 flex w-full items-center justify-center rounded-full bg-cta-orange py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
      >
        Aaj raat ki Kahani Shuru Karo
      </Link>

      <p className="mt-8 text-center text-xs text-gray-500">
        Story generation powered by AI. Your selections shape the story.
      </p>
    </div>
  )
}
