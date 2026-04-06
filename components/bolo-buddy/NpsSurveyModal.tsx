'use client'

import { useState } from 'react'

function pillBg(score: number): string {
  if (score <= 6) return 'bg-gray-100 text-gray-600'
  if (score <= 8) return 'bg-[#FFD166] text-[#2D2D2D]'
  return 'bg-green-100 text-green-700'
}

export function NpsSurveyModal({
  accessToken,
  onClose,
}: {
  accessToken: string
  onClose: () => void
}) {
  const [score, setScore] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [thankYou, setThankYou] = useState(false)

  async function handleSubmit() {
    if (score === null || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/feedback/nps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ score, comment: comment.trim() || undefined }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setThankYou(true)
      setTimeout(() => onClose(), 2000)
    } catch {
      setSubmitting(false)
    }
  }

  if (thankYou) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <div className="w-full max-w-md rounded-t-3xl bg-[#FFF8F0] p-8">
          <p className="text-center font-medium text-[#2D2D2D]">
            Shukriya! Aapka feedback bahut kaam aayega 🙏
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-md rounded-t-3xl bg-[#FFF8F0] p-8">
        <p className="mb-1 font-bold text-lg text-[#2D2D2D]">
          Bolo Buddy ko apne dost ko recommend karoge?
        </p>
        <p className="mb-5 text-sm text-gray-400">
          0 = bilkul nahi, 10 = zaroor!
        </p>
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setScore(n)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all ${pillBg(n)} ${
                score === n ? 'scale-110 font-bold ring-2 ring-[#7B2FBE]' : ''
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <textarea
          placeholder="Kuch aur batana chahoge? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-5 w-full rounded-2xl border border-gray-200 bg-white p-3 text-sm"
          rows={3}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={score === null || submitting}
          className="w-full rounded-full py-3 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: '#FF6B35' }}
        >
          Bhejna
        </button>
      </div>
    </div>
  )
}
