'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/bolo-buddy/Navbar';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

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
      <p className="text-[#8A7B6F] text-sm max-w-sm">
        Link pe click karein — aur aapka account ready ho jayega.
        Spam folder bhi check karein agar mail na aaye.
      </p>
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
