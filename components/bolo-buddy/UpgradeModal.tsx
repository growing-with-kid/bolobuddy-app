'use client'

import { useRouter } from 'next/navigation'

export default function UpgradeModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()

  function handleUpgrade() {
    router.push('/bolo-buddy/pricing')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-heading"
    >
      <div
        className="w-full max-w-md rounded-t-3xl p-6 sm:rounded-2xl sm:p-8"
        style={{ backgroundColor: '#FFF8F0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="inline-block rounded-full bg-amber-200 px-3 py-0.5 text-xs font-semibold text-amber-900"
          aria-hidden
        >
          Most Popular
        </span>
        <h2
          id="upgrade-modal-heading"
          className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl"
        >
          PREMIUM
        </h2>
        <p className="mt-1 text-lg font-medium text-gray-700">₹299 / month per family</p>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>✓ Unlimited stories every night</li>
          <li>✓ All 5 moods unlocked</li>
          <li>✓ All 4 languages</li>
          <li>✓ Save &amp; download stories</li>
          <li>✓ No ads, ever</li>
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleUpgrade}
            className="w-full rounded-full py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#FF6B35' }}
          >
            Start Premium — ₹299/month
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
