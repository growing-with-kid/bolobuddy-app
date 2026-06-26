'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/bolo-buddy/Navbar';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);

  async function handleNewsletterOptIn(checked: boolean) {
    setNewsletterOptIn(checked);
    if (!checked || !email || newsletterDone) return;

    try {
      const res = await fetch('/api/newsletter/beehiiv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setNewsletterDone(true);
    } catch {
      // Signup already succeeded — don't block or alarm the user
    }
  }

  return (
    <main className="pt-[104px] flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="text-5xl mb-6">📬</div>
      <h1 className="font-nunito text-3xl font-extrabold text-[#2D2D2D] mb-3">
        Email check karein
      </h1>
      <p className="text-[#8A7B6F] text-base max-w-sm mb-2">
        Humne ek confirmation link bheja hai:
      </p>
      {email && (
        <p className="text-[#7B2FBE] font-bold text-base mb-6">{email}</p>
      )}
      <p className="text-[#8A7B6F] text-sm max-w-sm mb-8">
        Link pe click karein — aur aapka account ready ho jayega.
        Spam folder bhi check karein agar mail na aaye.
      </p>

      {email && (
        <label className="flex items-start gap-3 max-w-sm text-left cursor-pointer group">
          <input
            type="checkbox"
            checked={newsletterOptIn}
            onChange={(e) => handleNewsletterOptIn(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-[#2D2D2D]/20 text-[#7B2FBE] focus:ring-[#7B2FBE]"
          />
          <span className="text-[#8A7B6F] text-sm leading-snug group-hover:text-[#2D2D2D]/80 transition-colors">
            Also subscribe to the GWK newsletter — honest parenting stories from
            Raghvendra&apos;s table, every week. Free.
            {newsletterDone && (
              <span className="block text-[#7B2FBE] text-xs font-semibold mt-1">
                You&apos;re on the list!
              </span>
            )}
          </span>
        </label>
      )}
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar variant="light" pill />
      <Suspense fallback={null}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
