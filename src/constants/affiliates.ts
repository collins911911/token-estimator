export interface AffiliateLink {
  modelProvider: string
  label: string
  url: string
  hasProgram: boolean
  commission?: string
  note?: string
}

// Research as of July 2025
// Update these URLs with your actual affiliate/referral links when you sign up
export const AFFILIATE_LINKS: Record<string, AffiliateLink> = {
  OpenAI: {
    modelProvider: 'OpenAI',
    label: 'Get API Key',
    url: 'https://platform.openai.com/signup',
    hasProgram: false,
    note: 'No formal affiliate program yet — direct signup link',
  },
  Anthropic: {
    modelProvider: 'Anthropic',
    label: 'Get API Key',
    url: 'https://console.anthropic.com/login',
    hasProgram: false,
    note: 'No formal affiliate program yet — direct signup link',
  },
  Google: {
    modelProvider: 'Google',
    label: 'Get API Key',
    url: 'https://aistudio.google.com/app/apikey',
    hasProgram: false,
    note: 'Google AI Studio — free tier available',
  },
  Mistral: {
    modelProvider: 'Mistral',
    label: 'Get API Key',
    url: 'https://console.mistral.ai/',
    hasProgram: false,
    note: 'No formal affiliate program yet — direct signup link',
  },
  'Meta (via Groq)': {
    modelProvider: 'Meta (via Groq)',
    label: 'Try on Groq',
    url: 'https://console.groq.com/login',
    hasProgram: false,
    note: 'Groq offers free tier for Llama models',
  },
}

// When affiliate programs launch, update the url to your affiliate link
// and set hasProgram: true with your commission rate
// Example:
// OpenAI: {
//   url: 'https://platform.openai.com/signup?ref=tokenlens',
//   hasProgram: true,
//   commission: '$X per signup',
// }