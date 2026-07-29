import type { AIModel, CostResult } from '../types/models'

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: AIModel,
  requestsPerDay: number
): CostResult {
  const inputCostPer1M = model.pricing.inputPricePer1M
  const outputCostPer1M = model.pricing.outputPricePer1M

  // Cost per single request
  const inputCost = (inputTokens / 1_000_000) * inputCostPer1M
  const outputCost = (outputTokens / 1_000_000) * outputCostPer1M
  const singleRequestCost = inputCost + outputCost

  // Daily and monthly cost
  const dailyCost = singleRequestCost * requestsPerDay
  const monthlyCost = dailyCost * 30

  return {
    singleRequestCost,
    dailyCost,
    monthlyCost,
  }
}

export function getCheapestModel(
  models: AIModel[],
  inputTokens: number,
  outputTokens: number
): string {
  let cheapestId = models[0].id
  let cheapestCost = Infinity

  for (const model of models) {
    const cost =
      (inputTokens / 1_000_000) * model.pricing.inputPricePer1M +
      (outputTokens / 1_000_000) * model.pricing.outputPricePer1M

    if (cost < cheapestCost) {
      cheapestCost = cost
      cheapestId = model.id
    }
  }

  return cheapestId
}

export function getMostExpensiveModel(
  models: AIModel[],
  inputTokens: number,
  outputTokens: number
): string {
  let expensiveId = models[0].id
  let expensiveCost = -Infinity

  for (const model of models) {
    const cost =
      (inputTokens / 1_000_000) * model.pricing.inputPricePer1M +
      (outputTokens / 1_000_000) * model.pricing.outputPricePer1M

    if (cost > expensiveCost) {
      expensiveCost = cost
      expensiveId = model.id
    }
  }

  return expensiveId
}