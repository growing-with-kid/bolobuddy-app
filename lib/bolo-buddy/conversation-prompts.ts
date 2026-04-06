/** Theme/mood-based conversation prompts for after the story. */
const PROMPTS_BY_MOOD: Record<string, string> = {
  sleepy: 'What would you want to dream about tonight?',
  happy: 'What was your favourite part of the story?',
  curious: 'If you could ask the main character one question, what would it be?',
  sad: 'What would make the character feel better? What would make you feel better?',
}

const DEFAULT_PROMPT =
  'What was your favourite part of the story? If you could change the ending, what would happen?'

export function getConversationPrompt(storyId: string, mood: string): string {
  return PROMPTS_BY_MOOD[mood] ?? DEFAULT_PROMPT
}
