import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Choose a Sample Story | Bolo Buddy',
  description: 'Pick a sample story to listen to.',
}

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
