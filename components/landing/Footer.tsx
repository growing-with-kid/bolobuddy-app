import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-8 text-white/90">
      <div className="mx-auto max-w-4xl text-center">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          <Link href="#sample-stories" className="hover:text-white transition-colors">
            Try Story
          </Link>
          <span aria-hidden className="text-white/50">·</span>
          <a
            href="mailto:hello@growingwithkid.com"
            className="hover:text-white transition-colors"
          >
            Send Feedback
          </a>
          <span aria-hidden className="text-white/50">·</span>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Support
          </Link>
        </nav>
        <p className="text-white/70 text-xs">© 2026 Growing with Kid</p>
      </div>
    </footer>
  )
}
