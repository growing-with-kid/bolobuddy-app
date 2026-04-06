export const SAMPLE_STORIES = {
  'nanis-moonlight-garden': {
    title: "Nani's Moonlight Garden",
    subtitle: "A grandmother's secret garden that only blooms at night",
    language: 'Hindi',
    voice: 'Roopa',
    ageRange: '4–7',
    duration: '1:52',
    audioSrc: '/audio/samples/nanis-moonlight-garden.mp3',
    langCode: 'hi-IN',
    preview:
      'रात के अंधेरे में, जब सारा गाँव सो जाता था, नानी चुपके से उठती थीं। वो अपनी पुरानी शॉल ओढ़कर पिछले दरवाज़े से बाहर निकलती थीं...',
  },
  'cloud-forgot-rain': {
    title: 'The Cloud Who Forgot to Rain',
    subtitle: 'A worried little cloud learns to let go.',
    language: 'English',
    voice: 'Ishita',
    ageRange: '4–7',
    duration: '2:10',
    audioSrc: '/audio/samples/cloud-forgot-rain.mp3',
    langCode: 'en-IN',
    preview:
      'High above the hills of Coorg, there lived a little cloud named Nimbu. All the other clouds knew exactly what to do — but Nimbu kept forgetting...',
  },
  'ammas-jasmine-song': {
    title: "Amma's Jasmine Song",
    subtitle: 'How a jasmine flower helped find the way home',
    language: 'Tamil',
    voice: 'Kavitha',
    ageRange: '4–7',
    duration: '1:48',
    audioSrc: '/audio/samples/ammas-jasmine-song.mp3',
    langCode: 'ta-IN',
    preview:
      'சின்னி வீட்டிற்கு வழி தெரியாமல் தொலைந்து விட்டாள். கோயில் திருவிழாவில் அம்மாவின் கையை விட்டுவிட்டாள்...',
  },
  'dadajis-train-story': {
    title: "Dadaji's Train Story",
    subtitle: 'A magical train ride through sleepy villages',
    language: 'Hinglish',
    voice: 'Soham',
    ageRange: '4–7',
    duration: '2:05',
    audioSrc: '/audio/samples/dadajis-train-story.mp3',
    langCode: 'hi-IN',
    preview:
      '"Dadaji, ek kahani sunao," Riya ne raat ko kaha. Dadaji muskurae. Unki aankhon mein ek purani chamak aayi...',
  },
} as const

export type SampleStoryId = keyof typeof SAMPLE_STORIES
