import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamari Kahani — Bolo Buddy',
  description:
    'Raat ke woh 9 baje se shuru hua. Ek thake hue papa ki ek choti si zaroorat — aur Bolo Buddy ki puri kahani.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
