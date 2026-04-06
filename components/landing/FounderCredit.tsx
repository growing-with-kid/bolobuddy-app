import Image from 'next/image'

export function FounderCredit() {
  return (
    <Image
      src="/founder-photo.png"
      alt="Raghvendra Singh — Founder, Bolo Buddy"
      width={80}
      height={80}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  )
}
