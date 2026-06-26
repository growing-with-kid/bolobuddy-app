type GwkLogoMarkProps = {
  size?: number
  className?: string
}

/** GWK puzzle-piece logomark tinted with --gwk-amber */
export function GwkLogoMark({ size = 14, className = '' }: GwkLogoMarkProps) {
  return (
    <span
      className={`gwk-logo-mark ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-hidden
    />
  )
}
