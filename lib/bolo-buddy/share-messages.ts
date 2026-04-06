const BASE_URL =
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
    : 'https://growingwithkid.com'

export function getShareUrl(storyId: string): string {
  return `${BASE_URL}/bolo-buddy/shared/${encodeURIComponent(storyId)}?utm_source=whatsapp&utm_medium=share`
}

export function getShareMessage(params: {
  storyTitle: string
  childName: string | null
  language: 'en' | 'hi' | 'hinglish'
  storyId: string
}): string {
  const url = getShareUrl(params.storyId)
  const child = params.childName?.trim() || 'they'

  if (params.language === 'hi') {
    return `आज रात हमने '[${params.storyTitle}]' सुनी और ${child} को बहुत पसंद आई। ये हिंदी में एक शांत ऑडियो कहानी है — बिना स्क्रीन, बिना विज्ञापन। ज़रूर आज़माएं: ${url}`
  }

  if (params.language === 'hinglish') {
    return `Aaj raat we listened to '[${params.storyTitle}]' and ${child} loved it. It's a calm audio story in Hinglish — no screens, no ads. Give it a try: ${url}`
  }

  return `We listened to '${params.storyTitle}' at bedtime tonight and ${child} loved it. It's a calm audio story in English — no screens, no ads. Give it a try: ${url}`
}
