import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.bolobuddy.in',
  ),
  title: 'Bolo Buddy | Bedtime Stories for Indian Children',
  description:
    'Hindi, Hinglish, and English bedtime stories for kids aged 3–8 — Ramayan, Panchatantra, and original tales. Voice-first, screen-light, made for Indian families.',
  keywords: [
    'Hindi bedtime stories for kids',
    'Hinglish bedtime stories',
    'Indian bedtime stories',
    'Ramayan stories for children',
    'bedtime stories age 3-8',
  ],
}

export default function BoloBuddyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
