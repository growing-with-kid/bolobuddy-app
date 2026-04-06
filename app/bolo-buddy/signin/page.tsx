import { Suspense } from 'react'
import SigninContentInner from './SigninContent'

function SigninContent() {
  return (
    <Suspense fallback={null}>
      <SigninContentInner />
    </Suspense>
  )
}

export default function SigninPage() {
  return (
    <Suspense fallback={null}>
      <SigninContent />
    </Suspense>
  )
}
