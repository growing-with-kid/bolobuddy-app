import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamari Kahani — Bolo Buddy',
  description:
    'Raat ke 9 baje, thake hue papa ne Hindi bedtime stories dhundhi — aur Bolo Buddy ban gaya. Founder story: Indian culture, screen-light parenting.',
  keywords: [
    'Bolo Buddy founder story',
    'Hindi bedtime stories India',
    'screen-light parenting',
    'Growing With Kid',
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
