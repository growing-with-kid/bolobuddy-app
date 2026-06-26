import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bedtime Stories — Hindi, Hinglish & Mythology | Bolo Buddy',
  description:
    'Create personalised bedtime stories in Hindi, Hinglish, or English. Choose bedtime calm, kindness, courage, nature, or Ramayan mythology — for kids aged 3–8.',
  keywords: [
    'Ramayan stories for children in simple Hindi',
    'Hindi bedtime stories for kids aged 3-8',
    'mythology bedtime stories India',
    'personalised bedtime stories',
  ],
}

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
