import { Nunito, Inter, Lora } from 'next/font/google'
import Image from 'next/image'
import Navbar from '@/components/bolo-buddy/Navbar'
import BoloFooter from '@/components/bolo-buddy/Footer'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'] })

export const metadata = {
  title: 'Hamari Kahani — Bolo Buddy',
  description:
    'Raat ke 9 baje, thake hue papa ki ek choti si zaroorat — aur Bolo Buddy ki shuruwaat.',
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

const originBeats = [
  {
    icon: '🌙',
    iconBg: 'bg-[#7B2FBE]/10',
    label: 'Raat 9 Baje',
    head: 'Beti so nahi rahi thi',
    body: 'Raat ke 9 baj rahe the. Meri beti so nahi rahi thi — aur main ek hi kahani pichle 20 minute se sun raha tha, baar baar. Aankhein band ho rahi thi, par kahani nahi khatam ho rahi thi.',
  },
  {
    icon: '📱',
    iconBg: 'bg-[#FF6B35]/10',
    label: 'Phir Kiya Search',
    head: 'Jo mila, woh "apna" nahi laga',
    body: 'Maine phone uthaya, ek accha bedtime story app dhundha. Jo mila woh ya toh angrezi mein tha, ya Western characters ke saath, ya robot ki tarah padh raha tha. Kuch bhi apna nahi laga.',
  },
  {
    icon: '💡',
    iconBg: 'bg-[#FFD166]/[0.22]',
    label: 'Usi Raat',
    head: '"Agar kisi ne banaya nahi, toh main banaunga"',
    body: 'Tab maine socha — agar yeh kisi ne banaya nahi, toh main banaunga. Apni beti ke liye. Aur un lakho parents ke liye jo roz raat yahi feel karte hain.',
  },
]

const builtCards = [
  {
    icon: '🇮🇳',
    title: 'Sachchi Indian Kahaniyaan',
    desc: 'Arjun, Pari, Meera — nahi koi Jack ya Lily. Hain charpoy, aam ke ped, aur dadi ke ghar ki khushboo.',
    badge: 'Indian Context ✓',
    className: 'bg-gradient-to-br from-[#7B2FBE] to-[#5a1f8a] text-white',
    badgeClass: 'bg-white/20',
  },
  {
    icon: '🗣️',
    title: 'Apni Bhaasha Mein',
    desc: 'Hindi, Hinglish, Tamil, English — aur awaaz bilkul waise jaise koi apna suna raha ho.',
    badge: '4 Bhaashaayein ✓',
    className: 'bg-gradient-to-br from-[#FF6B35] to-[#c94f1e] text-white',
    badgeClass: 'bg-white/20',
  },
  {
    icon: '✨',
    title: 'Sirf Tumhare Bacche Ke Liye',
    desc: 'Arjun ki kahani Arjun ke naam ke saath. Har baccha special hai — uski kahani bhi hogi.',
    badge: 'Personalized ✓',
    className: 'bg-gradient-to-br from-[#B8860B] to-[#FFD166] text-[#2D2D2D]',
    badgeClass: 'bg-black/10',
  },
  {
    icon: '📵',
    title: 'Screen-Free, Neend-Ready',
    desc: 'Sirf awaaz. Koi animation nahi, koi bright light nahi. Bilkul waise jaisa sona chahiye.',
    badge: 'Zero Screen ✓',
    className: 'bg-gradient-to-br from-[#0D0520] to-[#1A0835] text-white',
    badgeClass: 'bg-white/20',
  },
]

const values = [
  { icon: '🇮🇳', title: 'Indian Pehle', desc: 'Sanskriti, bhaasha aur mool — sachche Indian rang mein', border: 'border-[#7B2FBE]/15' },
  { icon: '🔒', title: 'Bilkul Safe', desc: 'Koi ad nahi. Data nahi bechte. Privacy hamesha', border: 'border-[#FF6B35]/15' },
  { icon: '💛', title: 'Ghar Jaisi Warmth', desc: 'Har kahani mein woh pyar jo sirf apne de sakte hain', border: 'border-[#FFD166]/30' },
  { icon: '🌱', title: 'Acche Sanskaar', desc: 'Himmat, dayaluupan aur jigyasa — har story mein', border: 'border-[#16a34a]/20' },
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

      {/* Origin story */}
      <section className="bg-[#FFF8F0] pt-20 px-6">
        <div className="max-w-[740px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] text-center mb-3">
            Shuruwaat
          </p>
          <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D] text-center`}>
            Woh raat jo <span className="text-[#7B2FBE]">sab badal gayi</span>
          </h2>
          <p className="text-[15px] text-[#2D2D2D]/60 leading-relaxed text-center max-w-[480px] mx-auto mt-2.5 mb-0">
            Teen baatein — yahi Bolo Buddy ki neev hain.
          </p>
          <div className="mt-12">
            {originBeats.map((beat, i) => (
              <div
                key={i}
                className="flex gap-5 sm:gap-6 items-start py-8 border-b border-[#2D2D2D]/[0.07] last:border-0"
              >
                <div
                  className={`w-[52px] h-[52px] flex-shrink-0 rounded-full flex items-center justify-center text-[22px] ${beat.iconBg}`}
                >
                  {beat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6B35] mb-1">
                    {beat.label}
                  </p>
                  <p className={`${nunito.className} font-extrabold text-[17px] text-[#2D2D2D] mb-1.5`}>
                    {beat.head}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2D2D2D]/70">
                    {beat.label === 'Raat 9 Baje' && (
                      <>
                        Raat ke 9 baj rahe the. Meri beti so nahi rahi thi — aur main{' '}
                        <strong className="text-[#2D2D2D] font-semibold">ek hi kahani pichle 20 minute se sun raha tha, baar baar.</strong>{' '}
                        Aankhein band ho rahi thi, par kahani nahi khatam ho rahi thi.
                      </>
                    )}
                    {beat.label === 'Phir Kiya Search' && (
                      <>
                        Maine phone uthaya, ek accha bedtime story app dhundha. Jo mila woh ya toh angrezi mein tha, ya Western characters ke saath,{' '}
                        <strong className="text-[#2D2D2D] font-semibold">ya robot ki tarah padh raha tha.</strong>{' '}
                        Kuch bhi apna nahi laga.
                      </>
                    )}
                    {beat.label === 'Usi Raat' && (
                      <>
                        Tab maine socha — agar yeh kisi ne banaya nahi, toh main banaunga.{' '}
                        <strong className="text-[#2D2D2D] font-semibold">Apni beti ke liye. Aur un lakho parents ke liye</strong>{' '}
                        jo roz raat yahi feel karte hain.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder card */}
      <section className="bg-[#FFF8F0] py-14 px-6">
        <div className="max-w-[740px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] text-center mb-2">
            Banane Wala
          </p>
          <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D] text-center mb-8`}>
            Ek <span className="text-[#7B2FBE]">papa</span> ne banaya
          </h2>
          <div className="rounded-[32px] overflow-hidden border border-[#7B2FBE]/15 bg-white shadow-[0_8px_40px_rgba(123,47,190,0.07)]">
            <div className="flex flex-col sm:flex-row">
              <div
                className="w-full sm:w-[220px] sm:flex-shrink-0 min-h-[200px] sm:min-h-[260px] flex flex-col items-center justify-end sm:justify-end pt-6 pb-6 sm:pb-0 px-5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #3B1F6E 0%, #7B2FBE 60%, #FF6B35 100%)',
                }}
              >
                <span className="absolute top-5 left-0 right-0 text-center text-[10px] text-white/25 tracking-[8px]">
                  ✦  ✦  ✦
                </span>
                <Image
                  src="/founder-photo.png"
                  alt="Raghvendra Singh — Founder, Bolo Buddy"
                  width={120}
                  height={120}
                  className="mb-4 rounded-full border-2 border-white/40 object-cover"
                />
              </div>
              <div className="flex-1 py-9 px-6 sm:px-8 flex flex-col justify-center">
                <p className={`${nunito.className} font-black text-[22px] text-[#7B2FBE] mb-0.5`}>
                  Raghvendra
                </p>
                <p className="text-[13px] text-[#2D2D2D]/45 mb-4">
                  Founder, Bolo Buddy · Papa of 2 daughters · Faridabad, India
                </p>
                <p
                  className={`${lora.className} italic text-[clamp(14px,2vw,16px)] leading-[1.75] text-[#2D2D2D] mb-5 pl-4 border-l-4 border-[#FFD166]`}
                >
                  &quot;Har Indian bacche ko apni bhaasha mein, apne heroes ke saath, apni dadi ki awaaz jaisi kahani sunne ka haq hai.&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  {['🌙 Solo Founder', '👧👧 Father of 2 daughters', '🇮🇳 Faridabad', '✍️ Building in Public'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="bg-[#FFF8F0] border border-[#2D2D2D]/10 rounded-full py-1.5 px-3.5 text-[12px] font-semibold text-[#2D2D2D]/70"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-[#2D2D2D]/[0.07]">
              {[
                {
                  icon: '📰',
                  title: 'Growing With Kid',
                  desc: 'Indian parenting newsletter — weekly insights for Indian moms & dads',
                },
                {
                  icon: '🎙️',
                  title: 'Building in Public',
                  desc: 'Sharing the real journey — wins, mistakes, and lessons — on LinkedIn & Twitter',
                },
                {
                  icon: '🌙',
                  title: 'Bolo Buddy',
                  desc: 'AI bedtime stories in Hindi, Hinglish, Tamil — rooted in Indian culture',
                },
              ].map((act) => (
                <div
                  key={act.title}
                  className="p-5 text-center border-r border-[#2D2D2D]/[0.07] last:border-r-0"
                >
                  <div className="text-2xl mb-2">{act.icon}</div>
                  <p className={`${nunito.className} font-extrabold text-[13px] text-[#2D2D2D] mb-0.5`}>
                    {act.title}
                  </p>
                  <p className="text-[12px] text-[#2D2D2D]/55 leading-snug">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we built */}
      <section className="bg-[#FFF8F0] py-20 px-6">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-3">
            Humne Kya Banaya
          </p>
          <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D]`}>
            Sirf ek app nahi — <span className="text-[#7B2FBE]">ek saathi</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {builtCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-[24px] p-8 sm:p-7 text-left relative overflow-hidden ${card.className}`}
              >
                <div className="text-[34px] mb-3">{card.icon}</div>
                <p className={`${nunito.className} font-extrabold text-[16px] mb-2`}>{card.title}</p>
                <p className="text-[14px] leading-relaxed opacity-90 mb-4">{card.desc}</p>
                <span
                  className={`inline-block rounded-full py-1 px-3.5 text-[12px] font-bold ${card.badgeClass}`}
                >
                  {card.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
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
              <p className={`${nunito.className} font-extrabold text-3xl text-white mb-1`}>
                {stat.num}
              </p>
              <p className="text-[11px] text-white/60 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FFF8F0] py-20 px-6">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-3">
            Humara Yakeen
          </p>
          <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D]`}>
            Jo cheezein hum <span className="text-[#7B2FBE]">kabhi nahi bhoolte</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-12">
            {values.map((v) => (
              <div
                key={v.title}
                className={`bg-white rounded-[24px] p-7 sm:p-5 text-center border ${v.border}`}
              >
                <div className="text-[32px] mb-3">{v.icon}</div>
                <p className={`${nunito.className} font-extrabold text-[13px] text-[#2D2D2D] mb-1`}>
                  {v.title}
                </p>
                <p className="text-[12px] text-[#2D2D2D]/55 leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#FFF8F0] py-20 px-6">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-3">
            Beta Families
          </p>
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

      {/* Team */}
      <section className="bg-[#FFF8F0] py-20 px-6 text-center">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-2">
          Team
        </p>
        <h2 className={`${nunito.className} font-black text-[clamp(26px,4.5vw,40px)] leading-tight text-[#2D2D2D] mb-10`}>
          Sirf main hoon. Aur <span className="text-[#7B2FBE]">tumhare bacche ki neend.</span>
        </h2>

        <div className="max-w-[680px] mx-auto bg-white rounded-[28px] border border-[#2D2D2D]/10 shadow-[0_8px_40px_rgba(123,47,190,0.1)] overflow-hidden text-left">
          {/* Top panel — dark */}
          <div
            className="p-10"
            style={{ background: 'linear-gradient(135deg, #1a0a3c 0%, #2D1B6B 100%)' }}
          >
            <Image
              src="/founder-photo.png"
              alt="Raghvendra Singh — Founder, Bolo Buddy"
              width={72}
              height={72}
              className="mb-5 rounded-[20px] object-cover"
            />
            <p className={`${nunito.className} text-[22px] font-black text-white mb-1`}>Raghvendra</p>
            <p className="text-[13px] text-white/45 italic">Papa pehle, founder baad mein · Faridabad</p>
          </div>

          {/* Body panel — white */}
          <div className="p-10">
            <blockquote className="border-l-[3px] border-[#7B2FBE] pl-5 mb-5">
              <p className={`${nunito.className} text-[17px] font-bold text-[#2D2D2D] leading-relaxed`}>
                Bolo Buddy ek akele papa ne banaya hai — raat ko, bacchi ke sone ke baad, laptop pe.
              </p>
            </blockquote>
            <p className="text-[15px] text-[#8A7B6F] leading-relaxed mb-5">
              Koi bada team nahi. Koi VC funding nahi. Sirf ek working parent ki zaroorat — aur yeh yakin ki hazaaron aur parents bhi yahi feel karte hain.
            </p>
            <p className="text-[15px] text-[#8A7B6F] leading-relaxed mb-5">
              Main Growing With Kid community chalata hoon — 1500+ Indian parents ka ghar. Bolo Buddy usi community ki pehli product hai.
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              <span className="bg-[#7B2FBE]/8 text-[#7B2FBE] border border-[#7B2FBE]/15 rounded-full px-3 py-1 text-[12px] font-extrabold">Solo Founder</span>
              <span className="bg-[#7B2FBE]/8 text-[#7B2FBE] border border-[#7B2FBE]/15 rounded-full px-3 py-1 text-[12px] font-extrabold">Growing With Kid</span>
              <span className="bg-[#7B2FBE]/8 text-[#7B2FBE] border border-[#7B2FBE]/15 rounded-full px-3 py-1 text-[12px] font-extrabold">🇮🇳 Faridabad mein bana</span>
              <span className="bg-[#7B2FBE]/8 text-[#7B2FBE] border border-[#7B2FBE]/15 rounded-full px-3 py-1 text-[12px] font-extrabold">Building in Public</span>
            </div>
            <div className="flex justify-between items-center pt-5 border-t border-[#2D2D2D]/10">
              <span className="text-[13px] text-[#8A7B6F]">🇮🇳 Faridabad, Haryana</span>
              <a href="mailto:growingwithkid@gmail.com" className={`${nunito.className} text-[13px] font-bold text-[#FF6B35] no-underline hover:underline`}>
                growingwithkid@gmail.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      <BoloFooter />
      </main>
    </div>
  )
}
