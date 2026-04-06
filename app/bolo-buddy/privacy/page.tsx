import Link from 'next/link'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Privacy Policy | Bolo Buddy',
  description: 'Privacy Policy for Bolo Buddy.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="mx-auto max-w-2xl px-5 py-12">
        <Link
          href="/bolo-buddy"
          className="mb-6 inline-block text-sm text-gray-600 hover:text-gray-900"
        >
          ← Wapas jao
        </Link>
        <h1
          className={`${nunito.className} text-3xl font-bold text-[#7B2FBE]`}
        >
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-gray-400">Last updated: March 2026</p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          What We Collect
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          We collect: your name and email address when you sign up, your
          child&apos;s name and age group for story personalization, stories
          generated and play history to improve your experience, device push
          notification tokens if you opt in to reminders, payment information
          processed securely by Razorpay (we never store card details).
        </p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          How We Use Your Data
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          Your data is used only to: personalize stories for your child, send
          bedtime reminders if you opt in, process your subscription payment,
          improve story quality over time. We do not use your data for
          advertising. We do not sell your data to any third party. Ever.
        </p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          Children&apos;s Privacy
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          Bolo Buddy takes children&apos;s privacy seriously. We collect only
          the child&apos;s first name and age group — nothing else. We do not
          serve ads to children. We do not share children&apos;s data with
          third parties. Parents can request deletion of all data at any time.
          We comply with applicable children&apos;s privacy laws including
          COPPA principles.
        </p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          Third Party Services
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          We use the following services to operate Bolo Buddy: Supabase
          (database and authentication, hosted in the EU), Anthropic Claude (AI
          story generation — story prompts are sent to Anthropic&apos;s API),
          Sarvam AI (text-to-speech conversion for Indian languages), Razorpay
          (payment processing, PCI-DSS compliant), Vercel (hosting). Each of
          these services has their own privacy policy.
        </p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          Data Retention
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          We retain your account data for as long as your account is active.
          Generated stories are stored so you can replay them. You may request
          deletion of your account and all associated data by{' '}
          <a
            href="mailto:growingwithkid@gmail.com"
            className="text-[#FF6B35] underline"
          >
            emailing us
          </a>
          .
        </p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          Your Rights
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          You have the right to: access the data we hold about you, correct
          inaccurate data, request deletion of your data, opt out of push
          notifications at any time in your device settings.
        </p>

        <h2 className="mb-2 mt-8 text-lg font-bold text-[#2D2D2D]">
          Contact
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          For privacy questions or data deletion requests:{' '}
          <a
            href="mailto:growingwithkid@gmail.com"
            className="text-[#FF6B35] underline"
          >
            growingwithkid@gmail.com
          </a>
          . We will respond within 7 business days.
        </p>
      </div>
    </div>
  )
}
