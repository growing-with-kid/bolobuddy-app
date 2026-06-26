'use client'

type StoryGateProps = {
  mode: 'last-free' | 'limit-reached'
  razorpayLink: string
}

export default function StoryGate({ mode, razorpayLink }: StoryGateProps) {
  if (mode === 'last-free') {
    return (
      <div
        style={{
          background: 'var(--purple-lt)',
          border: '1px solid #C4A8F0',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '32px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            color: 'var(--purple-dark)',
            marginBottom: '8px',
          }}
        >
          Yeh tha aapka teesra kahani 🌙
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '15px',
            color: 'var(--ink-mid)',
            marginBottom: '20px',
            lineHeight: '1.6',
          }}
        >
          You&apos;ve used all 3 free stories this month. Unlock unlimited stories for
          your child - every night, every language.
        </p>
        <a
          href={razorpayLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'var(--purple)',
            color: '#fff',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            fontSize: '15px',
            padding: '12px 28px',
            borderRadius: '10px',
            textDecoration: 'none',
          }}
        >
          Unlock unlimited - ₹299/month
        </a>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            color: 'var(--ink-soft)',
            marginTop: '12px',
          }}
        >
          Stories reset on the 1st of every month.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '24px',
          color: 'var(--ink)',
          marginBottom: '8px',
        }}
      >
        Aapke teen kahaniyaan ho gayi 🌛
      </p>
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '15px',
          color: 'var(--ink-mid)',
          marginBottom: '20px',
          lineHeight: '1.6',
        }}
      >
        This month&apos;s 3 free stories are done. Your child loved them - and there are
        many more waiting.
      </p>
      <a
        href={razorpayLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'var(--turmeric)',
          color: 'var(--ink)',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 700,
          fontSize: '15px',
          padding: '12px 28px',
          borderRadius: '10px',
          textDecoration: 'none',
          marginBottom: '12px',
        }}
      >
        Unlock unlimited - ₹299/month
      </a>
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          color: 'var(--ink-soft)',
        }}
      >
        Free stories come back on the 1st of the month.
      </p>
    </div>
  )
}
