import React, { useState, useMemo } from 'react'
import { useTokenCalculator } from '../hooks/useTokenCalculator'
import { AI_MODELS, PROVIDERS } from '../constants/models'
import { formatCost } from '../utils/tokenizer'
import { calculateCost, getCheapestModel, getMostExpensiveModel } from '../utils/calculator'
import { encodeStateToURL, copyToClipboard } from '../utils/share'
import type { AIModel } from '../types/models'

type SortKey = 'total' | 'input' | 'output' | 'context'
type SortDir = 'asc' | 'desc'

const CONTEXT_TO_NUM: Record<string, number> = {
  '16K': 16000,
  '32K': 32000,
  '128K': 128000,
  '200K': 200000,
  '1M': 1000000,
}

function ComparisonTable(): React.ReactElement {
  const { state, selectedModel } = useTokenCalculator()

  const [sortKey, setSortKey] = useState<SortKey>('total')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [activeProvider, setActiveProvider] = useState<string>('All')
  const [copied, setCopied] = useState<boolean>(false)

  const inputTokens = state.tokenResult?.inputTokens ?? 500
  const outputTokens = state.tokenResult?.outputTokens ?? 150

  const cheapestId = getCheapestModel(AI_MODELS, inputTokens, outputTokens)
  const expensiveId = getMostExpensiveModel(AI_MODELS, inputTokens, outputTokens)

  const filteredAndSorted = useMemo<AIModel[]>(() => {
    const models = activeProvider === 'All'
      ? [...AI_MODELS]
      : AI_MODELS.filter(m => m.provider === activeProvider)

    models.sort((a, b) => {
      let valA = 0
      let valB = 0

      if (sortKey === 'input') {
        valA = a.pricing.inputPricePer1M
        valB = b.pricing.inputPricePer1M
      } else if (sortKey === 'output') {
        valA = a.pricing.outputPricePer1M
        valB = b.pricing.outputPricePer1M
      } else if (sortKey === 'context') {
        valA = CONTEXT_TO_NUM[a.contextWindow] ?? 0
        valB = CONTEXT_TO_NUM[b.contextWindow] ?? 0
      } else {
        valA = calculateCost(inputTokens, outputTokens, a, 1).singleRequestCost
        valB = calculateCost(inputTokens, outputTokens, b, 1).singleRequestCost
      }

      return sortDir === 'asc' ? valA - valB : valB - valA
    })

    return models
  }, [sortKey, sortDir, activeProvider, inputTokens, outputTokens])

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  async function handleShare() {
    const url = encodeStateToURL({
      prompt: state.prompt,
      modelId: selectedModel.id,
      requestsPerDay: state.requestsPerDay,
    })
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-slate-400 text-xs ml-1">↕</span>
    return <span className="text-primary-500 text-xs ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <section id="compare" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Provider <span className="text-gradient">Cost Comparison</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto font-medium">
            {state.tokenResult
              ? `Based on your prompt — ${inputTokens} input + ${outputTokens} output tokens`
              : 'Based on sample 500 input + 150 output tokens. Paste a prompt above for your exact costs.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {['All', ...PROVIDERS].map(provider => (
              <button
                key={provider}
                onClick={() => setActiveProvider(provider)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  activeProvider === provider
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'bg-white border border-blue-200 text-slate-600 hover:border-primary-400'
                }`}
              >
                {provider}
              </button>
            ))}
          </div>

          <button
            onClick={handleShare}
            className={`flex items-center gap-2 text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              copied
                ? 'bg-success text-white'
                : 'bg-white border border-blue-200 text-slate-600 hover:border-primary-400 hover:text-primary-600'
            }`}
          >
            {copied ? (
              <>✅ Link Copied!</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 1H13V5M13 1L6 8M5 3H2C1.45 3 1 3.45 1 4V12C1 12.55 1.45 13 2 13H10C10.55 13 11 12.55 11 12V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Share Results
              </>
            )}
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-6 gap-2 px-6 py-4 border-b border-blue-100 bg-blue-50/60">
            {[
              { label: 'Model', key: null },
              { label: 'Provider', key: null },
              { label: 'Input /1M', key: 'input' as SortKey },
              { label: 'Output /1M', key: 'output' as SortKey },
              { label: 'Context', key: 'context' as SortKey },
              { label: 'Your Cost', key: 'total' as SortKey },
            ].map(col => (
              <div
                key={col.label}
                onClick={() => col.key && handleSort(col.key)}
                className={`text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center ${
                  col.key ? 'cursor-pointer hover:text-primary-600 transition-colors select-none' : ''
                }`}
              >
                {col.label}
                {col.key && <SortIcon col={col.key} />}
              </div>
            ))}
          </div>

          {filteredAndSorted.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400 font-medium">
              No models found for this provider.
            </div>
          ) : (
            filteredAndSorted.map(row => {
              const sampleCost = calculateCost(inputTokens, outputTokens, row, 1).singleRequestCost
              const isCheapest = row.id === cheapestId
              const isExpensive = row.id === expensiveId
              const isSelected = row.id === selectedModel.id

              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-6 gap-2 px-6 py-4 border-b border-blue-50 last:border-0 transition-all duration-200 hover:bg-blue-50/40
                    ${isCheapest ? 'border-l-4 border-l-success bg-green-50/30' : ''}
                    ${isExpensive ? 'border-l-4 border-l-danger bg-red-50/20' : ''}
                    ${isSelected && !isCheapest && !isExpensive ? 'border-l-4 border-l-primary-400 bg-blue-50/30' : ''}
                  `}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-800 leading-tight">{row.name}</span>
                    <div className="flex flex-wrap gap-1">
                      {isCheapest && (
                        <span className="text-xs bg-success/20 text-success px-1.5 py-0.5 rounded-full font-bold">💚 Best</span>
                      )}
                      {isExpensive && (
                        <span className="text-xs bg-danger/20 text-danger px-1.5 py-0.5 rounded-full font-bold">🔴 Priciest</span>
                      )}
                      {isSelected && (
                        <span className="text-xs bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded-full font-bold">⚡ Selected</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 font-medium flex items-center">{row.provider}</div>
                  <div className="text-sm font-mono font-bold text-success flex items-center">${row.pricing.inputPricePer1M}</div>
                  <div className="text-sm font-mono font-bold text-danger flex items-center">${row.pricing.outputPricePer1M}</div>
                  <div className="text-sm text-slate-500 font-medium flex items-center">{row.contextWindow}</div>
                  <div className={`text-sm font-mono font-bold flex items-center ${
                    isCheapest ? 'text-success' : isExpensive ? 'text-danger' : 'text-primary-600'
                  }`}>
                    {formatCost(sampleCost)}
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded-full bg-success inline-block" /> Cheapest
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded-full bg-danger inline-block" /> Most expensive
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded-full bg-primary-400 inline-block" /> Selected
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            * Click column headers to sort. Verify prices on provider pages.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable