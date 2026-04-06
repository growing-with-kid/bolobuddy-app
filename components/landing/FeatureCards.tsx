'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LanguagePills } from './LanguagePills'

export function FeatureCards() {
  const ages = ['3-4', '5-6', '7-9']
  const moods = [
    { key: 'bedtime-calm', icon: '🌙', label: 'Bedtime Calm', sub: 'Wind down gently', iconClass: 'calm' as const, premium: false },
    { key: 'brave-bold', icon: '⭐', label: 'Brave & Bold', sub: 'Courage stories', iconClass: 'brave' as const, premium: false },
    { key: 'kind-heart', icon: '💝', label: 'Kind Heart', sub: 'Sharing & caring', iconClass: 'kind' as const, premium: false },
    { key: 'nature-tales', icon: '🌿', label: 'Nature Tales', sub: 'Animals & outdoors', iconClass: 'nature' as const, premium: false },
    { key: 'mythology-devotion', icon: '🕉️', label: 'Mythology & Devotion', sub: 'Ramayan, Krishna & more', iconClass: 'mythology' as const, premium: true },
  ]
  const [selectedAge, setSelectedAge] = useState('5-6')
  const [selectedMood, setSelectedMood] = useState('bedtime-calm')
  const cards = [
    {
      title: 'Apni awaaz record karo',
      description: 'Phone uthao aur 2 minute bolte raho — koi bhi topic. Studio nahi chahiye. Ghar ka normal sound bilkul theek hai.',
      bgStyle: { background: '#C4B5FD' },
      iconSrc: '/icons/how-it-works-flower.png',
    },
    {
      title: 'Bolo Buddy seekhta hai',
      description: 'Humara AI tumhari awaaz ka andaz, ruk-ruk ke bolna, aur warmth capture karta hai. Automatic — koi extra step nahi.',
      bgStyle: { background: '#FCD34D' },
      iconSrc: '/icons/how-it-works-star.png',
    },
    {
      title: 'Har raat — tumhari awaaz',
      description: 'Bacche ka naam lekar, nai kahani, tumhari hi awaaz mein. Chahe tum ghar ho ya door — awaaz wahan hogi.',
      bgStyle: { background: '#5EEAD4' },
      iconSrc: '/icons/how-it-works-cloud.png',
    },
  ]

  return (
    <section id="features" className="scroll-mt-24" style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
      <div id="how-it-works" className="scroll-mt-24">
        <h2 className="font-serif text-body-charcoal text-center text-2xl font-semibold sm:text-3xl mb-2 mx-auto max-w-2xl px-4">
          How it works
        </h2>
        <p className="text-subtext-grey text-center text-sm sm:text-base mb-8 max-w-xl mx-auto px-4">
          For parents, grandparents, and caregivers. Stories your child will carry into their dreams.
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-3 w-full"
          style={{ gap: '20px', maxWidth: '900px', margin: '0 auto', width: '100%' }}
        >
          {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col overflow-hidden w-full"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EBEBEB',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.07)',
              minWidth: 0,
            }}
          >
            {/* Top ~60%: colored block fills full card width; flex 0 0 auto prevents shrink */}
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-t-[19px] flex-shrink-0"
              style={{
                width: '100%',
                minWidth: '100%',
                aspectRatio: '3/2',
                minHeight: '200px',
                ...card.bgStyle,
              }}
            >
              <div className="relative flex items-center justify-center w-full h-full p-4 min-w-0">
                <div className="relative w-[88%] h-[88%] min-h-[120px]">
                  <Image
                    src={card.iconSrc}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>
            </div>
            {/* Bottom ~40%: white area with heading + subtitle */}
            <div style={{ padding: '20px 20px 24px 20px', flex: '0 0 auto' }}>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  lineHeight: 1.35,
                  color: '#111',
                  marginBottom: '6px',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: '#555',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {card.description}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* See how it works — interactive preview (Languages anchor) */}
      <div id="languages" className="flex justify-center mt-16 mb-4 scroll-mt-24">
        <p className="text-sm font-semibold text-[#FF6B35] uppercase tracking-widest">
          See how it works
        </p>
      </div>
      <div className="flex justify-center px-4">
        <div className="w-full max-w-[375px] shrink-0 rounded-[32px] bg-white p-5 shadow-[0_25px_50px_rgba(0,0,0,0.15)] sm:p-6 border border-gray-100">
          <div className="mb-7">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">
              Tonight&apos;s Story
            </h3>
            <p className="text-sm text-[#666]">Pick what feels right for your child</p>
          </div>

          <div className="mb-6">
            <div className="text-[13px] text-[#1a1a1a] font-bold uppercase tracking-wider mb-3">
              Child&apos;s Age
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {ages.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedAge(label)}
                  className={`rounded-xl border-2 py-3.5 text-center text-[15px] font-medium transition-all ${
                    selectedAge === label
                      ? 'border-[#9B7EDE] bg-gradient-to-br from-[#9B7EDE] to-[#C77DFF] text-white shadow-[0_4px_12px_rgba(155,126,222,0.3)]'
                      : 'border-[#e5e5e5] bg-white text-[#666]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-[13px] text-[#1a1a1a] font-bold uppercase tracking-wider mb-3">
              Tonight&apos;s Mood
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moods.map(({ key, icon, label, sub, iconClass, premium }, index) => {
                const cardColor =
                  iconClass === 'calm'
                    ? '#FF8C7E'
                    : iconClass === 'brave'
                      ? '#FCD34D'
                      : iconClass === 'kind'
                        ? '#F472B6'
                        : iconClass === 'nature'
                          ? '#5EEAD4'
                          : '#C4B5FD'
                const isFullWidth = index === 4 // Mythology & Devotion
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSelectedMood(key)}
                    className={`relative rounded-[12px] overflow-hidden aspect-square ${
                      selectedMood === key ? 'ring-2 ring-[#9B7EDE] ring-offset-1' : ''
                    } ${isFullWidth ? 'col-span-2' : ''}`}
                  >
                    {/* Background colour */}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: cardColor }}
                    />
                    {/* Emoji — centred, large, slightly transparent */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl" style={{ opacity: 0.8 }}>
                        {icon}
                      </span>
                    </div>
                    {/* Dark gradient at bottom for text legibility */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"
                      aria-hidden
                    />
                    {/* Text — must be z-10, sits above gradient */}
                    <div className="absolute bottom-2 left-2 right-2 z-10">
                      <p className="font-bold text-[13px] text-white leading-tight flex items-center gap-2 flex-wrap">
                        {label}
                        {premium && (
                          <span className="inline-flex items-center rounded-full bg-[#7C4DFF] px-2 py-0.5 text-[10px] font-medium text-white">
                            Premium
                          </span>
                        )}
                      </p>
                      <p className="text-white/80 text-[10px]">{sub}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <LanguagePills />

          <Link
            href={`/bolo-buddy/signup?age=${encodeURIComponent(selectedAge)}&mood=${encodeURIComponent(selectedMood)}`}
            className="block w-full rounded-xl bg-[#FF6B35] py-4 text-center text-base font-semibold text-white shadow-[0_4px_12px_rgba(255,107,53,0.3)] transition-all hover:bg-[#e55a25] hover:shadow-[0_6px_16px_rgba(255,107,53,0.4)] min-h-[56px] leading-[2.75rem]"
          >
            Try a free story →
          </Link>
        </div>
      </div>
    </section>
  )
}
