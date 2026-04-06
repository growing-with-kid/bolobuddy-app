export default function StreakBadge({ streak }: { streak: number }) {
  if (streak <= 1) return null

  const text =
    streak >= 30 ? '🔥 30+ din ka streak!' : `🔥 ${streak} din ka streak!`

  return (
    <p
      className="mt-3 font-bold"
      style={{ color: '#FF6B35' }}
    >
      {text}
    </p>
  )
}
