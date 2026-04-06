import Link from 'next/link'
import { Nunito, Inter, Lora } from 'next/font/google'
import Navbar from '@/components/bolo-buddy/Navbar'
import BoloFooter from '@/components/bolo-buddy/Footer'
import { PapaKiAwaazStarfield } from '@/components/bolo-buddy/PapaKiAwaazStarfield'
import { PapaKiAwaazWaitlistForm } from '@/components/bolo-buddy/PapaKiAwaazWaitlistForm'
import { ClientHydrationWrapper } from '@/components/bolo-buddy/ClientHydrationWrapper'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'] })

export const metadata = {
  title: 'Papa Ki Awaaz — Bolo Buddy',
  description:
    'Ek baar apni awaaz record karo. Bolo Buddy tumhare bacche ko roz raat tumhari hi awaaz mein kahani sunayega — chahe tum ghar ho ya nahi.',
}

const waveformBars = [
  { h: 18, wd: '0s' },
  { h: 32, wd: '0.1s' },
  { h: 46, wd: '0.2s' },
  { h: 54, wd: '0.3s' },
  { h: 46, wd: '0.25s' },
  { h: 54, wd: '0.15s' },
  { h: 38, wd: '0.05s' },
  { h: 24, wd: '0.2s' },
  { h: 14, wd: '0.1s' },
]

export default function PapaKiAwaazPage() {
  return (
    <div className={`${inter.className} min-h-screen overflow-x-hidden bg-[#FFF8F0] text-[#2D2D2D]`} suppressHydrationWarning>
      <ClientHydrationWrapper>
        <PapaKiAwaazStarfield />
        <Navbar variant="light" pill />

      {/* HERO */}
      <section
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6"
        style={{
          paddingTop: '104px',
          paddingBottom: '80px',
          background: 'linear-gradient(180deg, #1a0a3c 0%, #2D1B6B 100%)',
        }}
      >
        <div className="relative w-[100px] h-[100px] mx-auto mb-10">
          <div
            className="absolute inset-[-40px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(123,47,190,0.2) 0%, transparent 70%)',
              animation: 'moonpulse 5s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0 w-[100px] h-[100px] rounded-full mx-auto"
            style={{
              background: 'radial-gradient(circle at 38% 38%, #FFF3C4, #FFD166 60%, #D4960A)',
              boxShadow:
                '0 0 0 12px rgba(123,47,190,0.12), 0 0 0 28px rgba(45,27,107,0.15), 0 0 60px rgba(123,47,190,0.25)',
              animation: 'pka-moonpulse 5s ease-in-out infinite',
            }}
          />
        </div>

        <div
          className={`${nunito.className} inline-flex items-center gap-2 bg-white/7 border border-[#FFD166]/25 rounded-[100px] py-[7px] px-[18px] text-xs font-semibold tracking-[0.12em] uppercase text-[#FFD166] mb-6`}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#FFD166]" style={{ animation: 'blink 2s ease-in-out infinite' }} />
          Jald Aa Raha Hai &nbsp;·&nbsp; Waitlist Open
        </div>

        <h1 className={`${nunito.className} font-black text-white leading-[1.05] mb-2 text-[clamp(44px,10vw,80px)]`} style={{ animation: 'pka-fadein 0.8s ease-out both' }}>
          Papa Ki <span className="text-[#FFD166]">Awaaz</span>
        </h1>
        <p className={`${lora.className} italic text-[clamp(17px,3vw,22px)] text-white/55 mb-7`} style={{ animation: 'pka-fadein 0.8s ease-out 0.1s both' }}>
          — tumhari awaaz, hamesha ke liye —
        </p>
        <p className="text-[clamp(15px,2.5vw,18px)] text-white/70 leading-[1.75] max-w-[520px] mx-auto mb-12" style={{ animation: 'pka-fadein 0.8s ease-out 0.2s both' }}>
          Ek baar apni awaaz record karo.<br />
          Bolo Buddy tumhare bacche ko roz raat tumhari hi awaaz mein kahani sunayega —<br />
          <em className="text-[#FFD166] not-italic font-semibold">chahe tum ghar ho ya nahi.</em>
        </p>

        <div className="flex items-center gap-[5px] h-14 mb-12" style={{ animation: 'pka-fadein 0.8s ease-out 0.3s both' }}>
          {waveformBars.map((b, i) => (
            <div
              key={i}
              className="w-[5px] rounded-[100px] bg-gradient-to-t from-[#7B2FBE] to-[#FFD166]"
              style={{
                height: b.h,
                animation: 'waveanim 1.4s ease-in-out infinite',
                animationDelay: b.wd,
              }}
            />
          ))}
        </div>

        <Link
          href="#waitlist"
          className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-extrabold text-base py-4 px-9 rounded-[100px] no-underline shadow-[0_8px_32px_rgba(255,107,53,0.4)] transition-transform hover:-translate-y-0.5 font-[Nunito,sans-serif]"
        >
          🌙 Mujhe Pehle Batao
        </Link>
        <p className="text-[13px] text-white/40 mt-3.5">Koi spam nahi · Sirf launch pe ek message</p>

        {/* Gradient bridge: hero purple → aligns with letter section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #2D1B6B)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </section>

      {/* LETTER SECTION */}
      <section className="relative z-10 bg-[#FFF8F0] py-[100px] px-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '140px',
            background: 'linear-gradient(to bottom, #2D1B6B 0%, #3d2a7a 25%, #b5a898 65%, #FFF8F0 100%)',
          }}
        />
        <div className="max-w-[800px] mx-auto relative">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-4 text-center">Yeh Kyun Banaya</p>
          <h2 className={`${nunito.className} font-black text-[clamp(28px,5vw,44px)] leading-[1.15] text-[#2D2D2D] mb-4 text-center`}>
            Ek khat jo <span className="text-[#7B2FBE]">hamesha zinda</span> rahega
          </h2>
          <p className="text-base text-[#2D2D2D]/65 leading-[1.75] text-center max-w-[560px] mx-auto mb-14">
            Maine ek video dekhi. Ek dada apne nawajaate pote ke liye letter likh raha tha. Baccha tab kuch samajh nahi sakta tha. Par dada ne likha — kyunki woh chahte the ki{' '}
            <em className="text-[#7B2FBE] not-italic font-semibold">kuch reh jaaye.</em>
          </p>

          <div
            className="bg-white rounded-[32px] p-12 max-w-[640px] mx-auto relative overflow-hidden border border-[#d4b482]/40 shadow-[0_4px_0_#e8d5b0,0_8px_40px_rgba(123,47,190,0.08)]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(180,140,80,0.04) 0px, rgba(180,140,80,0.04) 1px, transparent 1px, transparent 32px)',
            }}
          >
            <div className="absolute top-0 bottom-0 left-20 w-px bg-[#FF6B35]/15" />
            <p className={`${lora.className} text-[13px] font-semibold text-[#2D2D2D]/50 tracking-wide mb-2`}>Ek Dada Ka Khat — Apne Nawajaate Pote Ke Liye</p>
            <p className={`${lora.className} text-[22px] font-semibold text-[#7B2FBE] mb-7`}>Dear Munna,</p>
            <div className={`${lora.className} text-[clamp(16px,2vw,18px)] leading-[2] text-[#3a3a3a] pl-8`}>
              <p className="mb-5">Welcome to this world. This is a very beautiful, unique and lovely place. And you have been sent to make it even more beautiful and unique.</p>
              <p className="mb-5">No one has ever known who has sent you. And maybe you will not get anything by knowing. That&apos;s why you don&apos;t waste your time on such questions.</p>
              <p className="mb-5">We all have a limited time. And no matter how much, there is a shortage. There is so much to see, know and understand in this world that you don&apos;t have even a little time to waste.</p>
              <p className="mb-5">You can do anything. You can become anything. You can change this world. That&apos;s why you have to do something new every day. See something new. Learn something new.</p>
              <p className="mb-5">
                Still, if you have a dilemma about some work, then always remember —{' '}
                <span className="bg-gradient-to-br from-[#FFD166]/40 to-[#FFD166]/15 rounded px-1 italic font-semibold">it is better to do something in life than to do nothing and regret.</span> Because if you don&apos;t get anything else, you will get experience.
              </p>
              <p className="mb-0">Experience will teach you to differentiate between right and wrong. It will save you from making mistakes. But <strong>don&apos;t be afraid to make mistakes</strong> — because in life, only those who do something make mistakes.</p>
            </div>
            <div className="mt-9 pt-6 border-t border-dashed border-[#2D2D2D]/15">
              <p className={`${lora.className} italic text-[15px] text-[#2D2D2D]/50`}>Tumhara,<br /><strong className="text-[#2D2D2D] text-[18px] not-italic block mt-1">Dada</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* PIVOT — Kitne dadon ki awaaz */}
      <section className="relative z-10 bg-white px-6 py-[100px]">
        <div className="max-w-[800px] mx-auto text-center">
          <p className={`${nunito.className} font-black text-[clamp(22px,4vw,36px)] leading-[1.3] text-[#2D2D2D] mb-5`}>
            Kitne dadon ki awaaz<br />
            <span className="text-[#FF6B35]">hum record nahi kar paaye?</span>
          </p>
          <p className="text-base text-[#2D2D2D]/65 leading-[1.8] mb-12">
            Kitne papas hain jo roz raat ghar nahi hote — lekin chahte hain ki unka baccha unhe feel kare?<br />
            Kitne parents hain jo sochte hain — <em>&quot;Kaash main wahan hota.&quot;</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(123,47,190,0.08)] border border-[#2D2D2D]/10">
              <p className="text-2xl mb-3">👴</p>
              <p className={`${nunito.className} font-extrabold text-[15px] text-[#2D2D2D] mb-2`}>Dada ji — Lucknow</p>
              <p className={`${lora.className} italic text-[15px] leading-[1.7] text-[#2D2D2D]/80`}>
                &quot;Pehle unhone kahani sunai… ab sirf yaad hai unki awaaz ki.&quot;
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(123,47,190,0.08)] border border-[#2D2D2D]/10">
              <p className="text-2xl mb-3">👵</p>
              <p className={`${nunito.className} font-extrabold text-[15px] text-[#2D2D2D] mb-2`}>Naani — Chennai</p>
              <p className={`${lora.className} italic text-[15px] leading-[1.7] text-[#2D2D2D]/80`}>
                &quot;Unki awaaz mein Tamil lori thi. Woh lori ab kisi ne nahi sunai.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="relative z-10 bg-[#FFF8F0] py-20 px-6 text-center overflow-hidden">
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[300px] leading-none text-[#2D2D2D]/[0.06] pointer-events-none">&quot;</span>
        <p className={`${lora.className} italic text-[clamp(20px,4vw,32px)] leading-[1.6] text-[#2D2D2D] max-w-[700px] mx-auto mb-6 relative`}>
          &quot;Chahe tum tour pe ho. Chahe raat ko late aao.<br />
          Chahe tum is duniya mein ho ya nahi —<br />
          <span className="text-[#7B2FBE] not-italic font-semibold">tumhari awaaz wahan hogi.</span>&quot;
        </p>
        <p className="text-[13px] text-[#2D2D2D]/55 tracking-wide relative">— Papa Ki Awaaz · Bolo Buddy</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 bg-white py-[100px] px-6">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-4">Kaise Kaam Karega</p>
          <h2 className={`${nunito.className} font-black text-[clamp(28px,5vw,44px)] leading-[1.15] text-[#2D2D2D] mb-4`}>
            Teen kadam. <span className="text-[#7B2FBE]">Hamesha ki yaad.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14">
            {[
              { num: 1, emoji: '🎙️', title: 'Apni awaaz record karo', desc: 'Sirf 2 minute. App mein seedha. Kuch specific bolna nahi — bas naturally bolo jaise bacche se baat karte ho.' },
              { num: 2, emoji: '✨', title: 'Bolo Buddy seekh leta hai', desc: 'Hamara AI tumhari awaaz ko capture karta hai — tone, warmth, rhythm — sab kuch. Wahi jo tumhe tumhara banata hai.' },
              { num: 3, emoji: '🌙', title: 'Har raat, tumhari awaaz', desc: 'Baccha jab bhi story sunta hai — tumhari hi awaaz mein nai kahaniyan. Roz. Hamesha ke liye.' },
            ].map((step) => (
              <div key={step.num} className="relative bg-white rounded-[24px] p-9 text-center border border-[#FFD166]/20 shadow-[0_4px_24px_rgba(123,47,190,0.06)]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#7B2FBE] text-white flex items-center justify-center text-xs font-black">
                  {step.num}
                </div>
                <div className="text-4xl mb-4">{step.emoji}</div>
                <p className={`${nunito.className} font-extrabold text-base text-[#2D2D2D] mb-2`}>{step.title}</p>
                <p className="text-sm text-[#2D2D2D]/60 leading-[1.65]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — Beta users kehte hain */}
      <section className="relative z-10 bg-[#FFF8F0] py-[100px] px-6">
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-4">Beta users kehte hain</p>
          <h2 className={`${nunito.className} font-black text-[clamp(28px,5vw,44px)] leading-[1.15] text-[#2D2D2D] mb-0`}>
            Pehle 50 families ne <span className="text-[#7B2FBE]">try kiya</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {[
              { name: 'Deepak V.', city: 'Pune', child: 'Arush, 5 saal', quote: 'Bhai seedha bolunga — pehle mujhe lagaa ye AI wali kahani bakwaas hogi. Par Arush ne khud bol diya \'Papa wali awaaz hai\'. Ab roz maangta hai.', initial: 'D', initialBg: 'bg-[#7B2FBE]' },
              { name: 'Priya S.', city: 'Delhi', child: 'Sia, 4 saal', quote: 'Main late shift pe thi. Ghar pe dadi ne chalaya. Meri beti Sia neend gayi bina kuch pooche. Dadi ne mujhe call karke bataya — main ro padi.', initial: 'P', initialBg: 'bg-[#FF6B35]' },
              { name: 'Rahul & Neha K.', city: 'Bangalore', child: 'Kabir, 6 saal', quote: 'Hum dono IT mein hain. 9 baje ke baad koi energy nahi hoti. Ye app ne literally raat bachaa li. Aur Hindi mein hai — toh naani bhi chalaa leti hai.', initial: 'R', initialBg: 'bg-[#7B2FBE]' },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#2D2D2D]/10 rounded-[24px] p-6 text-left shadow-[0_4px_24px_rgba(123,47,190,0.06)]">
                <div className="text-[#FFD166] text-[13px] mb-3">★★★★★</div>
                <p className={`${lora.className} italic text-[14px] leading-[1.7] text-[#2D2D2D]/85 mb-5`}>
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.initialBg} flex items-center justify-center font-extrabold text-[15px] text-white flex-shrink-0`}>{t.initial}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#2D2D2D]">{t.name}</p>
                    <p className="text-xs text-[#2D2D2D]/55">{t.city} · {t.child}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative z-10 bg-white py-[100px] px-6">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-4">Yeh Kaisa Lagega</p>
          <h2 className={`${nunito.className} font-black text-[clamp(28px,5vw,44px)] leading-[1.15] text-[#2D2D2D] mb-4`}>
            Sirf ek app nahi — <span className="text-[#7B2FBE]">tumhari presence</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            {[
              { emoji: '🧳', title: 'Tour pe bhi saath', desc: 'Business trip pe ho, fir bhi bacche ko tumhari awaaz milegi. Roz. Har raat.', c: 'bg-[#FF6B35]/7 border-[#FF6B35]/15' },
              { emoji: '🌙', title: 'Late night shifts', desc: 'Office late hua, par bacche ka bedtime routine nahi tuta. Tumhari awaaz wahan thi.', c: 'bg-[#7B2FBE]/7 border-[#7B2FBE]/15' },
              { emoji: '👴', title: 'Dada-Dadi ki awaaz', desc: 'Doosre sheher mein rehte hain — ab unki kahaniyan bhi ghar pahunch sakti hain.', c: 'bg-[#FFD166]/10 border-[#FFD166]/25' },
              { emoji: '💛', title: 'Hamesha ke liye', desc: 'Awaaz record ho jaaye toh woh hamesha mahfooz hai. Ek gift jo khatam nahi hoga.', c: 'bg-[#22c55e]/7 border-[#22c55e]/15' },
            ].map((uc) => (
              <div key={uc.title} className={`rounded-[24px] p-8 text-left border ${uc.c}`}>
                <div className="text-4xl mb-3.5">{uc.emoji}</div>
                <p className={`${nunito.className} font-extrabold text-base text-[#2D2D2D] mb-2`}>{uc.title}</p>
                <p className="text-sm text-[#2D2D2D]/65 leading-[1.65]">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER — Kaun hoon main */}
      <section className="relative z-10 bg-[#FFF8F0] py-[100px] px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B35] mb-4">Kaun hoon main</p>
          <h2 className={`${nunito.className} font-extrabold text-[#2D2D2D] text-[clamp(24px,4vw,36px)] leading-[1.25] mb-8`}>
            Ek thaka hua papa, ek <span className="text-[#7B2FBE]">guilty founder</span>
          </h2>
          <div className="text-left space-y-5 text-[15px] leading-[1.8] text-[#2D2D2D]/90">
            <p>Raat 9 baje ghar pahuncha. Beti so chuki thi.</p>
            <p>Yeh baar baar hota tha. Aur har baar ek hi sawaal — kya main sirf weekend ka papa hoon?</p>
            <p>Maine Bolo Buddy isliye nahi banaya kyunki mujhe startup banana tha. Maine banaya kyunki ek raat meri beti ne kaha — &apos;Papa, aaj tumne kahani nahi sunai.&apos;</p>
            <p>Main Growing With Kid community ka hissa hoon — 1500+ Indian parents jo yeh same guilt feel karte hain. Woh sab yahan hain. Aur Bolo Buddy unhi ke liye hai.</p>
          </div>
          <p className={`${nunito.className} font-bold text-[#2D2D2D] opacity-60 text-sm mt-8`}>
            — Raghvendra · Papa pehle, founder baad mein · Faridabad
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="relative z-10 bg-gradient-to-br from-[#1a0a3c] to-[#2D1B6B] py-[100px] px-6 text-center">
        <div className="max-w-[560px] mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-[100px] py-2 px-[18px] mb-7">
            <div className="flex -space-x-1.5">
              <span className="w-[26px] h-[26px] rounded-full bg-[#7B2FBE] text-white text-[11px] font-extrabold flex items-center justify-center border-2 border-white/30">A</span>
              <span className="w-[26px] h-[26px] rounded-full bg-[#FF6B35] text-white text-[11px] font-extrabold flex items-center justify-center border-2 border-white/30">V</span>
              <span className="w-[26px] h-[26px] rounded-full bg-[#D4A017] text-[#2D2D2D] text-[11px] font-extrabold flex items-center justify-center border-2 border-white/30">R</span>
            </div>
            <span className="text-[13px] font-semibold text-white/90">340+ parents waitlist pe hain</span>
          </div>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FFD166]/90 mb-2">Waitlist</p>
          <h2 className={`${nunito.className} font-black text-[clamp(28px,5vw,44px)] leading-[1.15] text-white mb-2`}>
            Pehle jaanne walon mein <span className="text-[#FFD166]">apna naam daalo</span>
          </h2>
          <p className="text-[15px] text-white/75 leading-[1.75] mt-2">
            Jab Papa Ki Awaaz launch hogi, tum pehle try karoge.<br />
            Koi spam nahi. Bas ek message — launch ke din.
          </p>
          <PapaKiAwaazWaitlistForm variant="dark" />
        </div>
      </section>

      <BoloFooter />
      </ClientHydrationWrapper>
    </div>
  )
}
