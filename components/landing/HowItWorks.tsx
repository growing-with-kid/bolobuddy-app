import { LanguagePills } from './LanguagePills'

export function HowItWorks() {
  const ages = [
    { label: '3-4', selected: false },
    { label: '5-6', selected: true },
    { label: '7-8', selected: false },
  ]
  const moods = [
    { icon: '🌙', label: 'Bedtime Calm', sub: 'Wind down gently', selected: true, iconClass: 'calm', premium: false },
    { icon: '⭐', label: 'Brave & Bold', sub: 'Courage stories', selected: false, iconClass: 'brave', premium: false },
    { icon: '💝', label: 'Kind Heart', sub: 'Sharing & caring', selected: false, iconClass: 'kind', premium: false },
    { icon: '🌿', label: 'Nature Tales', sub: 'Animals & outdoors', selected: false, iconClass: 'nature', premium: false },
    { icon: '🕉️', label: 'Mythology & Devotion', sub: 'Ramayan, Krishna & more', selected: false, iconClass: 'mythology', premium: true },
  ]

  return (
    <section className="relative z-10 bg-white mt-12 pt-12 pb-20 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
            How it works
          </h2>
          <ol className="space-y-8">
            <li>
              <h3 className="font-serif text-xl font-semibold text-gray-900">Tell us about your child</h3>
              <p className="mt-2 text-gray-500 text-lg">Age, language, and what kind of story they need tonight. Takes 30 seconds.</p>
            </li>
            <li>
              <h3 className="font-serif text-xl font-semibold text-gray-900">Choose tonight&apos;s mood</h3>
              <p className="mt-2 text-gray-500 text-lg">Brave and bold, calm and sleepy, kind-hearted, or a favourite mythology story.</p>
            </li>
            <li>
              <h3 className="font-serif text-xl font-semibold text-gray-900">Press play and step away</h3>
              <p className="mt-2 text-gray-500 text-lg">Pure audio. No screen needed. Just your child&apos;s imagination and a story made for them.</p>
            </li>
          </ol>
        </div>
        <div className="flex justify-center md:justify-end min-w-0">
          {/* Phone mockup — GWK Story Selection Branded */}
          <div className="w-full max-w-[375px] shrink-0 rounded-[32px] bg-white p-5 shadow-[0_25px_50px_rgba(0,0,0,0.25)] sm:p-6">
            <div className="text-xs font-semibold text-[#FF6B35] uppercase tracking-widest mb-2">
              Preview — see how it works
            </div>
            <div className="text-center mb-7">
              <h3 className="font-serif text-2xl text-[#1a1a1a] font-medium mb-1.5">
                Tonight&apos;s Story
              </h3>
              <p className="text-sm text-[#666] font-normal">Pick what feels right for your child</p>
            </div>

            <div className="mb-6">
              <div className="text-[13px] text-[#666] font-medium uppercase tracking-wider mb-3">
                Child&apos;s Age
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {ages.map(({ label, selected }) => (
                  <div
                    key={label}
                    className={`rounded-xl border-2 py-3.5 text-center text-[15px] font-medium transition-all ${
                      selected
                        ? 'border-[#9B7EDE] bg-gradient-to-br from-[#9B7EDE] to-[#C77DFF] text-white shadow-[0_4px_12px_rgba(155,126,222,0.3)]'
                        : 'border-[#e5e5e5] bg-white text-[#666]'
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[13px] text-[#666] font-medium uppercase tracking-wider mb-3">
                Tonight&apos;s Mood
              </div>
              <div className="grid grid-cols-2 gap-3">
                {moods.map(({ icon, label, sub, selected, iconClass, premium }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 rounded-[14px] border-2 p-4 transition-all ${
                      selected
                        ? 'border-[#9B7EDE] bg-gradient-to-br from-[#F8F5FF] to-[#FFF0F8] shadow-[0_2px_8px_rgba(155,126,222,0.15)]'
                        : 'border-[#e5e5e5] bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-[20px] text-white ${
                        iconClass === 'calm'
                          ? 'bg-gradient-to-br from-[#FF8C7E] to-[#FF6B9D]'
                          : iconClass === 'brave'
                            ? 'bg-gradient-to-br from-[#FFC107] to-[#FFD54F]'
                            : iconClass === 'kind'
                              ? 'bg-gradient-to-br from-[#E91E63] to-[#F48FB1]'
                              : iconClass === 'nature'
                                ? 'bg-gradient-to-br from-[#00BFA5] to-[#26C6DA]'
                                : 'bg-gradient-to-br from-[#7C4DFF] to-[#9B7EDE]'
                      }`}
                    >
                      {icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[15px] font-semibold text-[#1a1a1a] leading-tight flex items-center gap-2 flex-wrap">
                        {label}
                        {premium && (
                          <span className="inline-flex items-center rounded-full bg-[#7C4DFF] px-2 py-0.5 text-[10px] font-medium text-white">
                            Premium
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-[#888] leading-snug mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <LanguagePills />

            <button
              type="button"
              className="w-full rounded-xl bg-[#FF6B35] py-4 text-base font-semibold text-white shadow-[0_4px_12px_rgba(255,107,53,0.3)] transition-all hover:bg-[#e55a25] hover:shadow-[0_6px_16px_rgba(255,107,53,0.4)] min-h-[56px]"
            >
              Get Tonight&apos;s Story →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
