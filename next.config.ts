import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bolo-buddy',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/bolo-buddy/signup',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
