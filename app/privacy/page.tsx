import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Bolo Buddy',
  description: 'Privacy Policy for Bolo Buddy.',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Elevate Innovation Pvt. Ltd.
        </p>
        <p className="mt-4 text-gray-600">
          We respect your privacy. This page will outline how we collect, use, and protect your and your child’s information when you use Bolo Buddy. Full policy coming soon.
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          For questions, contact us at the email listed on the app or website.
        </p>
      </div>
    </div>
  )
}
