'use client'

import { useEffect, useRef } from 'react'

export function PapaKiAwaazStarfield() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    for (let i = 0; i < 60; i++) {
      const d = document.createElement('div')
      d.className = 'pka-star-dot'
      const sz = Math.random() * 1.5 + 1.5
      d.style.cssText = `
        width:${sz}px; height:${sz}px;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        --pka-dur:${(Math.random() * 3 + 2).toFixed(1)}s;
        --pka-delay:-${(Math.random() * 5).toFixed(1)}s;
      `
      container.appendChild(d)
    }
    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    />
  )
}
