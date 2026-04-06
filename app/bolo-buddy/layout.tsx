import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bolo Buddy | Bedtime Stories for Indian Children',
  description:
    'AI-powered, voice-first bedtime stories in Hindi, Hinglish, English and Tamil. Culturally rooted. Screen-free. Made for Indian families.',
}

export default function BoloBuddyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
