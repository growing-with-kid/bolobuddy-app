export const SCREEN_FREE_PHILOSOPHY_COPY = {
  line1: "Less screen, more stories — that's our quiet family promise.",
  line2Before: 'Growing With Kid brings hands-on play; Bolo Buddy brings bedtime tales in voice alone — ',
  hindiPhrase: 'बस आवाज़, बस कहानी।',
} as const

type ScreenFreePhilosophyQuoteProps = {
  /** Highlight the Hindi phrase in Bolo Buddy orange on the About page */
  accentHindi?: boolean
}

export function ScreenFreePhilosophyQuote({ accentHindi = false }: ScreenFreePhilosophyQuoteProps) {
  const { line1, line2Before, hindiPhrase } = SCREEN_FREE_PHILOSOPHY_COPY

  return (
    <blockquote
      className="text-center italic leading-relaxed"
      style={{
        fontFamily: 'var(--font-playfair-display)',
        fontSize: '18px',
        color: '#1A0A00',
        maxWidth: '480px',
        margin: '40px auto',
      }}
    >
      <p>{line1}</p>
      <p className="mt-2">
        {line2Before}
        <span className={accentHindi ? 'text-[#FF6B35] not-italic font-semibold' : undefined}>
          {hindiPhrase}
        </span>
      </p>
    </blockquote>
  )
}
