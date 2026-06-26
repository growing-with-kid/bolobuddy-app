import { Nunito, Inter, Lora } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/bolo-buddy/Navbar'
import BoloFooter from '@/components/bolo-buddy/Footer'
import { ScreenFreePhilosophyQuote } from '@/components/landing/ScreenFreePhilosophyQuote'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'] })

export const metadata = {
  title: 'Hamari Kahani — Bolo Buddy',
  description:
    'One tired papa, one bedtime question, and why Growing With Kid built Bolo Buddy.',
}

const heroStars = [
  { w: 3, h: 3, top: '11%', left: '7%', d: '3s', dl: '0s' },
  { w: 4, h: 4, top: '19%', left: '21%', d: '4.2s', dl: '0.5s' },
  { w: 3, h: 3, top: '8%', left: '71%', d: '3.5s', dl: '0.8s' },
  { w: 5, h: 5, top: '29%', left: '87%', d: '2.8s', dl: '1.2s' },
  { w: 3, h: 3, top: '55%', left: '5%', d: '4s', dl: '0.3s' },
  { w: 4, h: 4, top: '64%', left: '93%', d: '3.2s', dl: '1.5s' },
  { w: 3, h: 3, top: '14%', left: '49%', d: '3.8s', dl: '0.7s' },
]

const principles = [
  {
    title: 'Cultural',
    desc: 'Indian stories, Indian languages, Indian families.',
    accent: '#7B2FBE',
    border: 'border-[#7B2FBE]/15',
    bg: 'bg-[#7B2FBE]/[0.06]',
  },
  {
    title: 'Calm',
    desc: 'No screens. No flashing lights. Just a voice.',
    accent: '#FF6B35',
    border: 'border-[#FF6B35]/15',
    bg: 'bg-[#FF6B35]/[0.06]',
  },
  {
    title: 'Consistent',
    desc: 'Same story. Same voice. Every night.',
    accent: '#FBA81A',
    border: 'border-[#FBA81A]/30',
    bg: 'bg-[#FBA81A]/[0.12]',
  },
]

const aiTeam = [
  { name: 'Aditya', note: 'keeps the tech honest when I am half asleep' },
  { name: 'Meera', note: 'writes stories that sound like someone who actually tucks kids in' },
  { name: 'Rohan', note: 'makes sure every page feels calm, not loud' },
  { name: 'Pushkar', note: 'ships the fixes I notice at 11 p.m.' },
  { name: 'Vanika', note: 'remembers what parents told us last week' },
]

const testimonials = [
  {
    name: 'Priya S.',
    role: 'Mumbai · beti, 5',
    initial: 'P',
    initialBg: '#7B2FBE',
    quote: 'Pehli baar meri beti ne khud bola — Mummy, aaj Bolo Buddy wali kahani sunni hai. Yahi toh chahiye tha.',
  },
  {
    name: 'Amit K.',
    role: 'Delhi NCR · beti, 4',
    initial: 'A',
    initialBg: '#FF6B35',
    quote: 'Business trips pe jaata hoon toh guilt hota tha. Ab Niya kehti hai — Papa ne story bheji. Dil bhar aata hai.',
  },
  {
    name: 'Sunita M.',
    role: 'Mumbai · beta, 6',
    initial: 'S',
    initialBg: '#16a34a',
    quote: 'Main Hindi mein kahani sunati thi, English nahi aati. Bolo Buddy ne meri baat samajh li — bilkul dadi ki tarah.',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] text-center mb-3">
      {children}
    </p>
  )
}

export default function AboutPage() {
  return (
    <div className={`${inter.className} min-h-screen overflow-x-hidden bg-[#FFF8F0] text-[#2D2D2D]`}>
      <Navbar variant="light" pill />
      <main className="pt-[104px]">
        {/* Hero — night sky */}
        <section
          className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden pt-24 pb-[120px] px-6"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(123,47,190,0.55) 0%, transparent 62%), linear-gradient(180deg, #0D0520 0%, #1A0533 42%, #3B1F6E 74%, #FFF8F0 100%)',
          }}
        >
          {heroStars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#FFD166] animate-[about-hero-twinkle]"
              style={{
                width: star.w,
                height: star.h,
                top: star.top,
                left: star.left,
                animationDuration: star.d,
                animationDelay: star.dl,
              }}
              aria-hidden
            />
          ))}
          <div
            className="w-20 h-20 rounded-full mx-auto mb-8 animate-[about-moon-pulse]"
            style={{
              background: 'radial-gradient(circle at 38% 38%, #FFF6C0, #FFD166 55%, #C8900A)',
              boxShadow: '0 0 40px rgba(255,209,102,.6), 0 0 100px rgba(255,209,102,.25)',
            }}
          />
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FFD166] mb-4">
            🌙 ✦ Hamari Kahani ✦
          </p>
          <h1 className={`${nunito.className} font-black text-[clamp(38px,7.5vw,68px)] leading-[1.08] text-white mb-3`}>
            Raat ke woh <span className="text-[#FFD166]">9 baje</span>
            <br />
            se shuru hua
          </h1>
          <p className={`${lora.className} italic text-[clamp(15px,2.5vw,19px)] text-white/60`}>
            Ek thake hue papa ki ek choti si zaroorat
          </p>
          <div
            className="absolute bottom-0 left-0 right-0 h-[130px] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #FFF8F0)' }}
          />
        </section>

        {/* Section 1 — Origin story */}
        <section className="bg-[#FFF8F0] pt-20 pb-16 px-6">
          <div className="max-w-[680px] mx-auto">
            <SectionLabel>The Origin Story</SectionLabel>
            <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D] text-center mb-10`}>
              It started with a <span className="text-[#7B2FBE]">tired papa</span>
            </h2>
            <div className="rounded-[28px] bg-white border border-[#2D2D2D]/[0.07] shadow-[0_8px_40px_rgba(123,47,190,0.06)] p-8 sm:p-10">
              <p className={`${lora.className} text-[clamp(16px,2.2vw,18px)] leading-[1.85] text-[#2D2D2D]/85`}>
                I&apos;m Raghvendra — a father in Faridabad who builds things late at night, after the house goes quiet.
                One evening I came home bone-tired from work. My daughter wouldn&apos;t settle. I reached for my phone —
                same reflex as every other parent — and stopped. I was about to put another screen in her hands when
                she just needed a story. A real one.
              </p>
              <p className={`${lora.className} text-[clamp(16px,2.2vw,18px)] leading-[1.85] text-[#2D2D2D]/85 mt-6`}>
                I kept asking myself:{' '}
                <strong className="text-[#2D2D2D] font-semibold not-italic">
                  what if my daughter heard her own name in a bedtime story?
                </strong>{' '}
                In Hindi. About our neighbourhood, our festivals, our grandparents — not Jack and Jill or some robot
                voice from another country. That question kept me awake longer than she did.
              </p>
              <p
                className={`${nunito.className} font-extrabold text-[17px] sm:text-[18px] text-[#FF6B35] mt-8 pt-6 border-t border-[#2D2D2D]/[0.07]`}
              >
                That&apos;s why Growing With Kid built Bolo Buddy.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — GWK connection */}
        <section className="bg-[#FFF8F0] pb-20 px-6">
          <div className="max-w-[740px] mx-auto">
            <SectionLabel>The GWK Connection</SectionLabel>
            <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D] text-center mb-10`}>
              Part of something <span style={{ color: 'var(--gwk-amber)' }}>bigger</span>
            </h2>
            <div
              className="rounded-[32px] overflow-hidden border bg-white"
              style={{
                borderColor: 'color-mix(in srgb, var(--gwk-amber) 25%, transparent)',
                boxShadow: '0 8px 40px color-mix(in srgb, var(--gwk-amber) 12%, transparent)',
              }}
            >
              <div
                className="flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10"
                style={{
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--gwk-amber) 14%, transparent) 0%, rgba(255,248,240,0.9) 55%, #FFF8F0 100%)',
                }}
              >
                <div
                  className="flex-shrink-0 w-[100px] h-[100px] sm:w-[112px] sm:h-[112px] rounded-[28px] flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg, var(--gwk-amber) 0%, #e89410 100%)',
                    boxShadow: '0 8px 32px color-mix(in srgb, var(--gwk-amber) 35%, transparent)',
                  }}
                >
                  <Image
                    src="/GWK - Logo.svg"
                    alt="Growing With Kid"
                    width={48}
                    height={48}
                    className="drop-shadow-sm"
                    unoptimized
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2D2D2D]/75 mb-3">
                    <strong className="text-[#2D2D2D] font-semibold">Growing With Kid</strong> has helped{' '}
                    <strong className="text-[#2D2D2D] font-semibold">3,400+ families</strong> navigate early
                    childhood with honest, Indian-first parenting — newsletters, play ideas, and a community that
                    actually gets it.
                  </p>
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2D2D2D]/75">
                    Bolo Buddy is <strong className="text-[#2D2D2D] font-semibold">our most personal product yet</strong>{' '}
                    — born from one father&apos;s bedtime, built for yours.
                  </p>
                </div>
              </div>
              <div
                className="px-8 sm:px-10 py-6 border-t bg-[#FFF8F0]/80 flex justify-center sm:justify-end"
                style={{ borderColor: 'color-mix(in srgb, var(--gwk-amber) 20%, transparent)' }}
              >
                <a
                  href="https://www.growingwithkid.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${nunito.className} inline-flex items-center gap-2 font-extrabold text-[15px] text-[#2D2D2D] no-underline rounded-full px-6 py-3 border-2 bg-white hover:bg-[color:color-mix(in_srgb,var(--gwk-amber)_10%,white)] transition-colors`}
                  style={{ borderColor: 'var(--gwk-amber)' }}
                >
                  Explore GWK
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Principles */}
        <section className="bg-[#FFF8F0] pb-20 px-6">
          <div className="max-w-[860px] mx-auto text-center">
            <SectionLabel>The Principles</SectionLabel>
            <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D] mb-12`}>
              Three things we <span className="text-[#7B2FBE]">won&apos;t compromise</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-[24px] p-8 text-left border ${p.border} ${p.bg}`}
                >
                  <p
                    className={`${nunito.className} font-black text-[22px] mb-3`}
                    style={{ color: p.accent }}
                  >
                    {p.title}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2D2D2D]/75">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFF8F0] px-6 pb-4">
          <ScreenFreePhilosophyQuote accentHindi />
        </section>

        {/* Section 4 — Team */}
        <section className="bg-[#FFF8F0] py-16 px-6">
          <div className="max-w-[640px] mx-auto">
            <SectionLabel>The Team</SectionLabel>
            <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,36px)] leading-tight text-[#2D2D2D] text-center mb-8`}>
              Small team. <span className="text-[#7B2FBE]">Big bedtime.</span>
            </h2>
            <div className="rounded-[28px] bg-white border border-[#2D2D2D]/10 shadow-[0_8px_40px_rgba(123,47,190,0.08)] overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div
                  className="sm:w-[200px] flex-shrink-0 flex flex-col items-center justify-center py-8 px-6"
                  style={{ background: 'linear-gradient(160deg, #1A0533 0%, #7B2FBE 70%, #FF6B35 100%)' }}
                >
                  <Image
                    src="/founder-photo.png"
                    alt="Raghvendra Singh — Founder, Bolo Buddy"
                    width={96}
                    height={96}
                    className="rounded-full border-2 border-white/40 object-cover mb-4"
                  />
                  <p className={`${nunito.className} font-black text-[18px] text-white`}>Raghvendra</p>
                  <p className="text-[12px] text-white/50 mt-1">Faridabad, India</p>
                </div>
                <div className="flex-1 p-7 sm:p-8 flex flex-col justify-center">
                  <p
                    className={`${lora.className} italic text-[clamp(17px,2.5vw,20px)] leading-snug text-[#7B2FBE] mb-4 pl-4 border-l-4 border-[#FFD166]`}
                  >
                    &quot;Papa pehle. Founder baad mein.&quot;
                  </p>
                  <p className="text-[14px] leading-relaxed text-[#2D2D2D]/65 mb-5">
                    Bolo Buddy is mostly me — a working parent building after bedtime. And yes, there&apos;s a small AI
                    team behind the stories. They&apos;re not corporate mascots. They&apos;re the friends who help me ship
                    every night:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {aiTeam.map((member) => (
                      <li key={member.name} className="text-[14px] text-[#2D2D2D]/75 leading-snug">
                        <span className={`${nunito.className} font-extrabold text-[#FF6B35]`}>{member.name}</span>
                        {' — '}
                        {member.note}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="mailto:growingwithkid@gmail.com"
                    className={`${nunito.className} text-[13px] font-bold text-[#FF6B35] no-underline hover:underline self-start`}
                  >
                    growingwithkid@gmail.com →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission — kept from original */}
        <section
          className="py-20 px-6 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A0533 0%, #7B2FBE 100%)' }}
        >
          <span
            className="absolute text-[300px] opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            aria-hidden
          >
            🌙
          </span>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FFD166]/80 mb-3 relative">
            ✦ Hamara Sapna ✦
          </p>
          <p className={`${lora.className} italic text-[16px] text-white/65 mb-2 relative`}>
            Yeh sirf ek app nahi hai. Yeh ek sapna hai —
          </p>
          <h2 className={`${nunito.className} font-black text-[clamp(26px,5vw,44px)] text-white leading-tight mb-2 relative`}>
            2027 tak <span className="text-[#FFD166]">1 crore</span> Indian bacche
            <br />
            ek achhi kahani sunke soyein
          </h2>
          <p className="text-[14px] text-white/55 max-w-[380px] mx-auto mb-12 leading-relaxed relative">
            Apni bhaasha mein. Apne heroes ke saath.
            <br />
            Apni dadi ki awaaz ki tarah.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[620px] mx-auto relative">
            {[
              { num: '4', label: 'Indian Bhaashaayein' },
              { num: '∞', label: 'Kahaniyaan in Premium' },
              { num: '5–7', label: 'Minute bedtime stories' },
              { num: '₹0', label: 'Pehli 3 stories free' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.09] border border-white/10 rounded-[20px] py-5 px-2.5 text-center min-w-0"
              >
                <p className={`${nunito.className} font-extrabold text-3xl text-white mb-1`}>{stat.num}</p>
                <p className="text-[11px] text-white/60 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials — kept from original */}
        <section className="bg-[#FFF8F0] py-20 px-6">
          <div className="max-w-[860px] mx-auto text-center">
            <SectionLabel>Beta Families</SectionLabel>
            <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D]`}>
              Jo parents ne <span className="text-[#7B2FBE]">khud bataya</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-[20px] bg-white shadow-[0_4px_24px_rgba(123,47,190,0.08)] p-6 flex flex-col gap-3.5"
                >
                  <div className="text-[#FFD166] text-[13px] tracking-[2px]" aria-hidden>
                    ★★★★★
                  </div>
                  <p className={`${lora.className} italic text-[14px] leading-relaxed text-[#2D2D2D]/85 flex-1`}>
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-full text-white font-black text-[14px] flex items-center justify-center flex-shrink-0"
                      style={{ background: t.initialBg }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#2D2D2D]">{t.name}</p>
                      <p className="text-[12px] text-[#2D2D2D]/45">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#2D2D2D]/35 mt-4 text-center">
              Beta families · Feedback collected via WhatsApp
            </p>
          </div>
        </section>

        <BoloFooter />
      </main>
    </div>
  )
}
