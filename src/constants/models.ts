import type { AIModel } from '../types/models'

export const AI_MODELS: AIModel[] = [
  // OpenAI
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: '128K',
    badge: 'popular',
    pricing: { inputPricePer1M: 2.50, outputPricePer1M: 10.00 },
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    contextWindow: '128K',
    badge: 'cheapest',
    pricing: { inputPricePer1M: 0.15, outputPricePer1M: 0.60 },
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    contextWindow: '128K',
    badge: null,
    pricing: { inputPricePer1M: 10.00, outputPricePer1M: 30.00 },
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    contextWindow: '16K',
    badge: null,
    pricing: { inputPricePer1M: 0.50, outputPricePer1M: 1.50 },
  },
  // Anthropic
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    contextWindow: '200K',
    badge: 'powerful',
    pricing: { inputPricePer1M: 3.00, outputPricePer1M: 15.00 },
  },
  {
    id: 'claude-haiku-4',
    name: 'Claude Haiku 4',
    provider: 'Anthropic',
    contextWindow: '200K',
    badge: null,
    pricing: { inputPricePer1M: 0.25, outputPricePer1M: 1.25 },
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    contextWindow: '200K',
    badge: null,
    pricing: { inputPricePer1M: 15.00, outputPricePer1M: 75.00 },
  },
  // Google
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    contextWindow: '1M',
    badge: null,
    pricing: { inputPricePer1M: 1.25, outputPricePer1M: 5.00 },
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    contextWindow: '1M',
    badge: null,
    pricing: { inputPricePer1M: 0.075, outputPricePer1M: 0.30 },
  },
  // Mistral
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral',
    contextWindow: '32K',
    badge: null,
    pricing: { inputPricePer1M: 2.00, outputPricePer1M: 6.00 },
  },
  {
    id: 'mistral-small',
    name: 'Mistral Small',
    provider: 'Mistral',
    contextWindow: '32K',
    badge: null,
    pricing: { inputPricePer1M: 0.20, outputPricePer1M: 0.60 },
  },
  // Meta
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta (via Groq)',
    contextWindow: '128K',
    badge: null,
    pricing: { inputPricePer1M: 0.59, outputPricePer1M: 0.79 },
  },
]

export const PROVIDERS = [...new Set(AI_MODELS.map(m => m.provider))]

export const DEFAULT_MODEL_ID = 'gpt-4o'