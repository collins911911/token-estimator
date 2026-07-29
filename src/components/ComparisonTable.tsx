import React, { useState } from 'react'
import { AI_MODELS } from '../constants/models'
import { formatCost } from '../utils/tokenizer'
import { calculateCost, getCheapestModel, getMostExpensiveModel } from '../utils/calculator'

const SAMPLE_INPUT_TOKENS = 500
const SAMPLE_OUTPUT_TOKENS = 150

function ComparisonTable(): React.ReactElement {
  const [sortBy, setSortBy] = useState<'input' | 'output' | 'total'>('total')

  const cheapestId = getCheapestModel(AI_MODELS, SAMPLE_INPUT_TOKENS, SAMPLE_OUTPUT_TOKENS)
  const expensiveId = getMostExpensiveModel(AI_MODELS, SAMPLE_INPUT_TOKENS, SAMPLE_OUTPUT_TOKENS)

  const sortedModels = [...AI_MODELS].sort((a, b) => {
    if (sortBy === 'input') return a.pricing.inputPricePer1M - b.pricing.inputPricePer1M
    if (sortBy === 'output') return a.pricing.outputPricePer1M - b.pricing.outputPricePer1M
    const costA = calculateCost(SAMPLE_INPUT_TOKENS, SAMPLE_OUTPUT_TOKENS, a, 1).singleRequestCost
    const costB = calculateCost(SAMPLE_INPUT_TOKENS, SAMPLE_OUTPUT_TOKENS, b, 1).singleRequestCost
    return costA - costB
  })

  return (
    <section id="compare" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Provider <span className="text-gradient">Cost Comparison</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto font-medium">
            Based on a sample prompt of {SAMPLE_INPUT_TOKENS} input + {SAMPLE_OUTPUT_TOKENS} output tokens.
            🟢 Cheapest · 🔴 Most Expensive
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 mb-4 justify-end">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Sort by:</span>
          {(['total', 'input', 'output'] as const).map(option => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                sortBy === option
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-blue-200 text-slate-600 hover:border-primary-400'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)} Cost
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-2 px-6 py-4 border-b border-blue-100 bg-blue-50/50">
            {['Model', 'Provider', 'Input /1M', 'Output /1M', 'Context', 'Sample Cost'].map(col => (
              <div key={col} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {col}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {sortedModels.map(row => {
            const sampleCost = calculateCost(
              SAMPLE_INPUT_TOKENS,
              SAMPLE_OUTPUT_TOKENS,
              row,
              1
            ).singleRequestCost

            const isCheapest = row.id === cheapestId
            const isExpensive = row.id === expensiveId

            return (
              <div
                key={row.id}
                className={`grid grid-cols-6 gap-2 px-6 py-4 border-b border-blue-50 last:border-0 transition-colors hover:bg-blue-50/40 ${
                  isCheapest ? 'border-l-4 border-l-success bg-green-50/30' : ''
                } ${isExpensive ? 'border-l-4 border-l-danger bg-red-50/20' : ''}`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-800">{row.name}</span>
                  {isCheapest && (
                    <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full font-bold">
                      Best
                    </span>
                  )}
                  {isExpensive && (
                    <span className="text-xs bg-danger/20 text-danger px-2 py-0.5 rounded-full font-bold">
                      Priciest
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-500 font-medium">{row.provider}</div>
                <div className="text-sm font-mono font-bold text-success">
                  ${row.pricing.inputPricePer1M}
                </div>
                <div className="text-sm font-mono font-bold text-danger">
                  ${row.pricing.outputPricePer1M}
                </div>
                <div className="text-sm text-slate-500 font-medium">{row.contextWindow}</div>
                <div className={`text-sm font-mono font-bold ${isCheapest ? 'text-success' : isExpensive ? 'text-danger' : 'text-primary-600'}`}>
                  {formatCost(sampleCost)}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4 font-medium">
          * Prices per million tokens. Always verify on provider pricing pages as rates change.
        </p>
      </div>
    </section>
  )
}

export default ComparisonTable