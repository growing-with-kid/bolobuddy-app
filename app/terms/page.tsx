import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Bolo Buddy',
  description: 'Terms of Service for Bolo Buddy.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Link
          href="/bolo-buddy"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back
        </Link>
        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Elevate Innovation Pvt. Ltd.
        </p>
        <p className="mt-4 text-gray-600">
          By using Bolo Buddy you agree to these terms. This page will contain our terms of service, acceptable use, and related legal information. Full terms coming soon.
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          For questions, contact us at the email listed on the app or website.
        </p>
      </div>
    </div>
  )
}
