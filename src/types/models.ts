export interface ModelPricing {
  inputPricePer1M: number
  outputPricePer1M: number
}

export interface AIModel {
  id: string
  name: string
  provider: string
  contextWindow: string
  pricing: ModelPricing
  badge?: 'cheapest' | 'popular' | 'powerful' | null
}

export interface TokenResult {
  totalTokens: number
  inputTokens: number
  outputTokens: number
  characters: number
}

export interface CostResult {
  singleRequestCost: number
  dailyCost: number
  monthlyCost: number
}

export interface CalculatorState {
  prompt: string
  selectedModelId: string
  requestsPerDay: number
  tokenResult: TokenResult | null
  costResult: CostResult | null
  isCalculating: boolean
}