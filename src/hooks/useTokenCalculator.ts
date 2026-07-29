import { useState, useEffect, useCallback, useRef } from 'react'
import type { CalculatorState, TokenResult, CostResult } from '../types/models'
import { AI_MODELS, DEFAULT_MODEL_ID } from '../constants/models'
import { estimateTokens, estimateOutputTokens } from '../utils/tokenizer'
import { calculateCost } from '../utils/calculator'
import { decodeStateFromURL } from '../utils/share'

const DEBOUNCE_MS = 300

export function useTokenCalculator() {
  const urlState = decodeStateFromURL()

  const [state, setState] = useState<CalculatorState>({
    prompt: urlState?.prompt ?? '',
    selectedModelId: urlState?.modelId ?? DEFAULT_MODEL_ID,
    requestsPerDay: urlState?.requestsPerDay ?? 1000,
    tokenResult: null,
    costResult: null,
    isCalculating: false,
  })

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const calculate = useCallback((
    prompt: string,
    modelId: string,
    requestsPerDay: number
  ) => {
    if (!prompt.trim()) {
      setState(prev => ({
        ...prev,
        tokenResult: null,
        costResult: null,
        isCalculating: false,
      }))
      return
    }

    const model = AI_MODELS.find(m => m.id === modelId)
    if (!model) return

    const inputTokens = estimateTokens(prompt)
    const outputTokens = estimateOutputTokens(inputTokens)

    const tokenResult: TokenResult = {
      totalTokens: inputTokens + outputTokens,
      inputTokens,
      outputTokens,
      characters: prompt.length,
    }

    const costResult: CostResult = calculateCost(
      inputTokens,
      outputTokens,
      model,
      requestsPerDay
    )

    setState(prev => ({
      ...prev,
      tokenResult,
      costResult,
      isCalculating: false,
    }))
  }, [])

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (!state.prompt.trim()) {
      setState(prev => ({ ...prev, tokenResult: null, costResult: null }))
      return
    }

    setState(prev => ({ ...prev, isCalculating: true }))

    debounceTimer.current = setTimeout(() => {
      calculate(state.prompt, state.selectedModelId, state.requestsPerDay)
    }, DEBOUNCE_MS)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [state.prompt, state.selectedModelId, state.requestsPerDay, calculate])

  useEffect(() => {
    if (urlState?.prompt) {
      calculate(urlState.prompt, urlState.modelId, urlState.requestsPerDay)
    }
  }, [])

  const setPrompt = useCallback((prompt: string) => {
    setState(prev => ({ ...prev, prompt }))
  }, [])

  const setSelectedModelId = useCallback((selectedModelId: string) => {
    setState(prev => ({ ...prev, selectedModelId }))
  }, [])

  const setRequestsPerDay = useCallback((requestsPerDay: number) => {
    setState(prev => ({ ...prev, requestsPerDay }))
  }, [])

  const clearPrompt = useCallback(() => {
    setState(prev => ({
      ...prev,
      prompt: '',
      tokenResult: null,
      costResult: null,
    }))
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  const selectedModel = AI_MODELS.find(m => m.id === state.selectedModelId) ?? AI_MODELS[0]

  return {
    state,
    selectedModel,
    setPrompt,
    setSelectedModelId,
    setRequestsPerDay,
    clearPrompt,
  }
}