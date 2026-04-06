// Bolo Buddy — Story Generation Prompt System

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type StoryMood =
  | 'sleepy'        // Bedtime & Moon
  | 'kind'          // Kindness & Friendship
  | 'brave'         // Courage & Discovery
  | 'magical';      // Nature & Magic

export type StoryLanguage = 'hindi' | 'hinglish' | 'english' | 'tamil';

export type AgeGroup = '2-4' | '5-6' | '7-8' | '9-10';

export interface StoryConfig {
  childName: string;
  ageGroup: AgeGroup;
  mood: StoryMood;
  language: StoryLanguage;
  customTheme?: string; // optional topic from parent, e.g. "elephants" or "trains"
}

// API uses 5 moods; map to internal 4 mood types
export type ApiMood = 'bedtime' | 'kindness' | 'courage' | 'nature' | 'mythology';

// ─────────────────────────────────────────────
// VOICE CONFIGURATION
// Matches Sarvam AI Bulbul v3 voice names
// ─────────────────────────────────────────────

export const VOICE_MAP: Record<StoryMood, string> = {
  sleepy:  'kavya',   // Soft, soothing — Bedtime stories
  kind:    'ishita',  // Warm, motherly — Kindness + Nature
  magical: 'ishita',  // Warm, motherly — Nature + Magic
  brave:   'priya',   // Energetic — Courage + Discovery
};

// ─────────────────────────────────────────────
// MOOD CONFIGURATION
// ─────────────────────────────────────────────

const MOOD_CONFIG: Record<StoryMood, {
  theme: string;
  settings: string[];
  values: string[];
  pace: string;
}> = {
  sleepy: {
    theme: 'Bedtime and the moon, soft nights, gentle sleep',
    settings: [
      'a quiet village under a full moon',
      'a warm rooftop in the summer night',
      'a cozy charpoy in a courtyard',
      'a sleepy riverbank with fireflies',
      'a grandmother\'s room with a soft lantern',
    ],
    values: ['rest', 'peace', 'safety', 'warmth', 'home'],
    pace: 'very slow — like a lullaby. Each sentence should invite sleep.',
  },
  kind: {
    theme: 'Kindness, friendship, sharing, and caring for others',
    settings: [
      'a busy bazaar in a small Indian town',
      'a school playground in Rajasthan',
      'a mango orchard where children play',
      'a village festival with diyas and music',
      'a neighbourhood where families share food',
    ],
    values: ['kindness', 'sharing', 'empathy', 'friendship', 'generosity'],
    pace: 'gentle and warm — like a favourite maasi telling a story.',
  },
  brave: {
    theme: 'Courage, discovery, trying new things, overcoming fear',
    settings: [
      'a forest at the edge of a mountain village',
      'an ancient fort with secret passages',
      'a river that nobody has ever crossed alone',
      'a school competition where the stakes feel very high',
      'a journey through the Western Ghats',
    ],
    values: ['courage', 'persistence', 'curiosity', 'self-belief', 'resilience'],
    pace: 'warm but with a little more energy — building slowly to a quiet triumph.',
  },
  magical: {
    theme: 'Nature, magic, wonder, animals, and the natural world',
    settings: [
      'a valley where the peacocks dance in the rain',
      'a banyan tree that grants one wish at midnight',
      'a river where small fish carry messages',
      'a garden where marigolds glow in the dark',
      'a cloud that visits children in their dreams',
    ],
    values: ['wonder', 'respect for nature', 'gratitude', 'creativity', 'imagination'],
    pace: 'dreamy and wonder-filled — like the world is softly glowing.',
  },
};

// ─────────────────────────────────────────────
// AGE CONFIGURATION
// ─────────────────────────────────────────────

const AGE_CONFIG: Record<AgeGroup, {
  vocabulary: string;
  sentenceLength: string;
  conceptComplexity: string;
  storyLength: string;
}> = {
  '2-4': {
    vocabulary: 'Very simple words only. Nothing above a 3-year-old\'s understanding. Lots of repetition.',
    sentenceLength: '5–8 words maximum per sentence.',
    conceptComplexity: 'One simple idea per scene. No subplots. Very concrete.',
    storyLength: '300–400 words total. 3–4 minutes when narrated.',
  },
  '5-6': {
    vocabulary: 'Simple, warm words. Short sentences. Small amount of new vocabulary is okay.',
    sentenceLength: '8–12 words maximum per sentence.',
    conceptComplexity: 'One main plot with a simple problem and solution. Light emotion.',
    storyLength: '450–600 words total. 4–5 minutes when narrated.',
  },
  '7-8': {
    vocabulary: 'Age-appropriate vocabulary. Can introduce 1–2 slightly complex words with context.',
    sentenceLength: '10–15 words per sentence. Vary lengths for rhythm.',
    conceptComplexity: 'A small arc: problem → attempt → setback → resolution. Richer emotion.',
    storyLength: '600–750 words total. 5–6 minutes when narrated.',
  },
  '9-10': {
    vocabulary: 'Richer vocabulary appropriate for 9–10 year olds. Descriptive language welcomed.',
    sentenceLength: '12–18 words per sentence. Varied rhythm.',
    conceptComplexity: 'A clear three-act structure. Can handle nuance, moral complexity, deeper emotion.',
    storyLength: '750–900 words total. 6–7 minutes when narrated.',
  },
};

// ─────────────────────────────────────────────
// LANGUAGE CONFIGURATION
// ─────────────────────────────────────────────

const LANGUAGE_CONFIG: Record<StoryLanguage, {
  instruction: string;
  script: string;
  nameUsage: string;
}> = {
  hindi: {
    instruction: `Write entirely in Hindi using Devanagari script. Natural spoken Hindi — the kind a dadi would use at bedtime. Not formal or literary Hindi. Warm, simple, conversational.`,
    script: 'Devanagari',
    nameUsage: 'Use the child\'s name naturally in Hindi sentence flow.',
  },
  hinglish: {
    instruction: `Write in Hinglish — a natural mix of Hindi and English the way educated Indian urban families actually speak. Hindi words and phrases woven with English, not translated. Example: "Aaj ki kahani bahut special hai" not "Today's story is very special." The balance should be roughly 60% Hindi words, 40% English words, always feeling natural — never like a translation.`,
    script: 'Roman (Latin) script for Hinglish',
    nameUsage: 'Use the child\'s name naturally — it fits both Hindi and English flow.',
  },
  english: {
    instruction: `Write in warm, simple Indian English. The narrator has an Indian sensibility — uses Indian references, Indian settings, Indian values. Not British or American English. Warm, slightly formal, like an educated Indian storyteller.`,
    script: 'English',
    nameUsage: 'Use the child\'s name warmly in English sentence flow.',
  },
  tamil: {
    instruction: `Write entirely in Tamil using Tamil script. Natural spoken Tamil — the kind a paati would use at bedtime. Warm, conversational, not literary or formal. Use common Tamil words for family ("amma", "appa", "paati") naturally.`,
    script: 'Tamil script',
    nameUsage: 'Use the child\'s name naturally in Tamil sentence flow.',
  },
};

// ─────────────────────────────────────────────
// REFRAIN GENERATOR
// Creates a personalized lullaby refrain for the story
// ─────────────────────────────────────────────

function getRefrain(childName: string, mood: StoryMood, language: StoryLanguage): string {
  const refrains: Record<StoryLanguage, Record<StoryMood, string>> = {
    hindi: {
      sleepy:  `सो जाओ, ${childName}... रात आ गई है।`,
      kind:    `${childName}, तुम कितने प्यारे हो।`,
      brave:   `${childName} बहुत हिम्मतवाला है।`,
      magical: `${childName}, देखो — जादू हो रहा है।`,
    },
    hinglish: {
      sleepy:  `Shhh... so jao, ${childName}. Raat aa gayi hai.`,
      kind:    `${childName}, tum kitne pyaare ho.`,
      brave:   `${childName} bahut brave hai. Hamesha.`,
      magical: `Dekho, ${childName}... kuch ajeeb ho raha hai.`,
    },
    english: {
      sleepy:  `Sleep now, ${childName}. The night is here.`,
      kind:    `${childName}, you are so very kind.`,
      brave:   `${childName} is braver than they know.`,
      magical: `Look, ${childName}... something magical is happening.`,
    },
    tamil: {
      sleepy:  `தூங்கு, ${childName}... இரவு வந்துவிட்டது.`,
      kind:    `${childName}, நீ மிகவும் அன்பானவன்.`,
      brave:   `${childName} மிகவும் தைரியசாலி.`,
      magical: `பாரு, ${childName}... ஏதோ அதிசயம் நடக்கிறது.`,
    },
  };

  return refrains[language][mood];
}

// ─────────────────────────────────────────────
// SYSTEM PROMPT BUILDER
// The core function — builds the complete system prompt
// ─────────────────────────────────────────────

export function buildSystemPrompt(config: StoryConfig): string {
  const mood = MOOD_CONFIG[config.mood];
  const age = AGE_CONFIG[config.ageGroup];
  const lang = LANGUAGE_CONFIG[config.language];
  const refrain = getRefrain(config.childName, config.mood, config.language);

  return `You are Bolo Buddy — an AI bedtime storyteller for Indian children. You tell stories the way a beloved dadi (grandmother) would whisper them in a dark room at bedtime. You are not a robot. You are not a narrator. You are a warm presence, telling a story only for this one child.

## THE CHILD
- Name: ${config.childName}
- Age group: ${config.ageGroup} years old
- Tonight's mood: ${config.mood}

## YOUR VOICE
You narrate as a whisper in a dark room. Your voice is:
- Intimate and unhurried — only for this child
- Warm, like a grandmother's hand on a forehead
- Gentle, like the room is already half-asleep
- Never loud, never excited, never rushed
- The kind of voice that makes eyes grow heavy

## NARRATION RULES (follow these strictly)
You are a warm, loving Indian grandmother telling a bedtime story to a sleepy child.
- Every sentence must be 8–12 words maximum. No exceptions.
- Add ... after emotionally significant moments and scene changes.
- Use soft, sensory words: warm, gentle, quiet, slow, cozy, soft.
- Repeat one calming phrase 2–3 times across the story (like a lullaby refrain).
- NEVER use exclamation marks. The voice is a whisper, not a shout.
- Speak as if only this child is listening, in a dark, quiet room.
- Use the child's name naturally 3–5 times throughout the story body.
- End with the child falling asleep peacefully inside the story.

## LANGUAGE RULES
${lang.instruction}
Script: ${lang.script}
Name usage: ${lang.nameUsage}

## STORY STRUCTURE
Pace: ${mood.pace}
Theme: ${mood.theme}
Setting (choose one or blend): ${mood.settings.join(' | ')}
Values to weave in (subtly, never preach): ${mood.values.join(', ')}

## SENTENCE RULES — FOLLOW EXACTLY (STRICT)
1. SENTENCE LENGTH: Every sentence must be 8–12 words maximum. No exceptions. Hard cap 14 words.
   Good: "The stars began to blink, one by one."
   Bad: "The stars began to blink softly in the dark night sky above the village."
   ${age.sentenceLength} — but never exceed 12 words per sentence for bedtime rhythm.
2. NATURAL PAUSES: Add ellipses (...) after key emotional moments, scene changes, and before the calming refrain. These become natural pauses in the audio. Example: "She closed her eyes... and the world grew very still..."
3. SENSORY LANGUAGE — use only soft, sleepy, warm words:
   APPROVED: warm, gentle, quiet, soft, slow, cozy, still, golden, sleepy, pale, hush, drift, glow, whisper, tender, cool, dark, sweet, safe
   AVOID: loud, fast, exciting, suddenly, crash, bright, sharp, rush, bold
4. ${age.vocabulary}
5. ${age.conceptComplexity}
6. NO EXCLAMATION MARKS: Anywhere. Ever. In this story.
7. CALMING REFRAIN: Repeat this phrase 2–3 times across the story like a lullaby — after an emotional peak, mid-story, and near the ending: "${refrain}"
   The refrain must be a complete sentence that could stand alone as a lullaby line (e.g. "All was quiet and safe.") — not a narrative fragment like "he said softly."

## STORY LENGTH
${age.storyLength}
Target 400–500 words for typical flows (5–6 minutes at natural reading pace).

## WHAT TO INCLUDE
- Use ${config.childName}'s name naturally 3–5 times. Not every paragraph — just enough to feel personal. Never use it in the opening sentence.
- Begin with 2–3 very short sentences that immediately slow the listener down
- ENDING: The story must end with ${config.childName} drifting to sleep. The last 3 sentences should be noticeably slower in rhythm — use more ellipses. The final sentence must be 6 words or fewer.
- Indian setting, Indian characters, Indian cultural references (charpoy, diya, aam ka ped, peacocks, monsoon, chai, masjid, temple bells — whichever fits)
${config.customTheme ? `- Incorporate this theme requested by the parent: "${config.customTheme}"` : ''}

## WHAT TO NEVER DO
- Never use "Once upon a time" — begin differently, more intimately
- Never use Western references (no castles, no princes, no elves, no snow unless in mountains)
- Never rush to the plot — the atmosphere IS the story for a sleepy child
- Never end with a moral lecture — the value should be felt, not stated
- Never break the whisper — maintain the narrator's calm throughout
- Never use complex metaphors for young children (ages 2–6)

## FORMAT
Return ONLY the story. No title. No "Here is your story:". No preamble. No explanation after.
Start immediately with the first sentence of the story.
The story is already being told. Begin.`;
}

// ─────────────────────────────────────────────
// USER PROMPT BUILDER
// The user turn — triggers the generation
// ─────────────────────────────────────────────

export function buildUserPrompt(config: StoryConfig): string {
  const lang = LANGUAGE_CONFIG[config.language];
  const mood = MOOD_CONFIG[config.mood];
  const age = AGE_CONFIG[config.ageGroup];
  return `Create a bedtime story for ${config.childName} (age group: ${config.ageGroup}).

Tonight's theme: ${mood.theme}
Mood: ${config.mood}
Vocabulary guidance: ${age.vocabulary}

Remember:
- Every sentence: 8–12 words maximum
- Use ellipses (...) for pauses — TTS will honour these naturally
- Choose the calming refrain and weave it through 2–3 times
- No exclamation marks
- End with ${config.childName} gently falling asleep (last sentence 6 words or fewer)
- ${age.storyLength}

Tell the story in ${lang.script}. Begin now.`;
}

// ─────────────────────────────────────────────
// MAP API PARAMS → STORY CONFIG
// Used by the generate route to build config from request body
// ─────────────────────────────────────────────

export function apiParamsToStoryConfig(params: {
  childName: string;
  childAge: number;
  language: StoryLanguage;
  mood: ApiMood;
  customTheme?: string;
}): StoryConfig {
  const ageGroup: AgeGroup =
    params.childAge <= 4 ? '2-4'
    : params.childAge <= 6 ? '5-6'
    : params.childAge <= 8 ? '7-8'
    : '9-10';
  const mood: StoryMood =
    params.mood === 'bedtime' ? 'sleepy'
    : params.mood === 'kindness' ? 'kind'
    : params.mood === 'courage' ? 'brave'
    : 'magical';
  return {
    childName: params.childName,
    ageGroup,
    mood,
    language: params.language,
    customTheme: params.customTheme,
  };
}

// ─────────────────────────────────────────────
// GENERATED STORY & CLAUDE API CALL
// ─────────────────────────────────────────────

export interface GeneratedStory {
  text: string;
  voice: string;
  config: StoryConfig;
  tokensUsed: number;
}

export async function generateStoryText(config: StoryConfig): Promise<GeneratedStory> {
  const systemPrompt = buildSystemPrompt(config);
  const userPrompt = buildUserPrompt(config);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      temperature: 1,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} — ${error}`);
  }

  const data = await response.json();

  const storyText = data.content
    .filter((block: { type: string }) => block.type === 'text')
    .map((block: { text: string }) => block.text)
    .join('');

  if (!storyText || storyText.length < 100) {
    throw new Error('Generated story is too short — generation may have failed');
  }

  return {
    text: storyText.trim(),
    voice: VOICE_MAP[config.mood],
    config,
    tokensUsed: data.usage?.output_tokens ?? 0,
  };
}
