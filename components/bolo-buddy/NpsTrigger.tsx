'use client'

import { useState } from 'react'
import { NpsSurveyModal } from './NpsSurveyModal'

export function NpsTrigger({
  show,
  accessToken,
}: {
  show: boolean
  accessToken: string
}) {
  const [open, setOpen] = useState(show)
  if (!open) return null
  return (
    <NpsSurveyModal
      accessToken={accessToken}
      onClose={() => setOpen(false)}
    />
  )
}
