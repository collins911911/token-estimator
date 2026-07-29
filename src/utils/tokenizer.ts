// Lightweight token estimator that works for all models
// Uses the standard approximation: ~4 chars per token for English text
// This avoids loading heavy WASM bundles which would slow the site

export function estimateTokens(text: string): number {
  if (!text || text.trim() === '') return 0

  // Split on whitespace and punctuation — more accurate than pure char division
  const words = text.trim().split(/\s+/).filter(w => w.length > 0)

  let tokenCount = 0

  for (const word of words) {
    // Each word is roughly 1-2 tokens depending on length
    if (word.length <= 3) {
      tokenCount += 1
    } else if (word.length <= 7) {
      tokenCount += 1
    } else if (word.length <= 12) {
      tokenCount += 2
    } else {
      tokenCount += Math.ceil(word.length / 4)
    }

    // Punctuation attached to words adds tokens
    const punctMatches = word.match(/[^a-zA-Z0-9]/g)
    if (punctMatches) {
      tokenCount += Math.floor(punctMatches.length / 2)
    }
  }

  // Add tokens for newlines and special whitespace
  const newlineCount = (text.match(/\n/g) || []).length
  tokenCount += Math.ceil(newlineCount / 2)

  return Math.max(1, tokenCount)
}

// Estimate output tokens as ~30% of input by default
// Users can override with actual expected output length
export function estimateOutputTokens(inputTokens: number): number {
  return Math.ceil(inputTokens * 0.3)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export function formatCost(cost: number): string {
  if (cost === 0) return '$0.00'
  if (cost < 0.000001) return '< $0.000001'
  if (cost < 0.001) return `$${cost.toFixed(6)}`
  if (cost < 0.01) return `$${cost.toFixed(5)}`
  if (cost < 1) return `$${cost.toFixed(4)}`
  if (cost < 100) return `$${cost.toFixed(3)}`
  return `$${cost.toFixed(2)}`
}