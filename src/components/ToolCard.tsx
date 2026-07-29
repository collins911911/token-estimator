import React, { useState } from 'react'
import { useTokenCalculator } from '../hooks/useTokenCalculator'
import { AI_MODELS, PROVIDERS } from '../constants/models'
import { formatNumber, formatCost } from '../utils/tokenizer'

function ToolCard(): React.ReactElement {
  const {
    state,
    selectedModel,
    setPrompt,
    setSelectedModelId,
    setRequestsPerDay,
    clearPrompt,
  } = useTokenCalculator()

  const [activeProvider, setActiveProvider] = useState<string>('All')

  const filteredModels =
    activeProvider === 'All'
      ? AI_MODELS
      : AI_MODELS.filter(m => m.provider === activeProvider)

  const hasResult = state.tokenResult !== null && state.costResult !== null

  return (
    <section id="tool" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The <span className="text-gradient">Token Calculator</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto font-medium">
            Paste your prompt below and watch the token count and cost update in real time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Input Panel */}
          <div className="glass-card p-6 flex flex-col gap-4">
            {/* Prompt Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Your Prompt</h3>
              {state.prompt && (
                <button
                  onClick={clearPrompt}
                  className="text-xs text-danger font-medium hover:opacity-70 transition-opacity"
                >
                  Clear ✕
                </button>
              )}
            </div>

            {/* Textarea */}
            <div className="relative flex-1">
              <textarea
                value={state.prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full h-52 bg-white border-2 border-blue-100 rounded-xl p-4 text-slate-800 text-sm font-mono resize-none focus:outline-none focus:border-primary-400 transition-colors placeholder-slate-400 shadow-sm"
                placeholder={"Paste your prompt here...\n\nExample: You are a helpful assistant. Please analyze the following data and provide detailed insights about the trends you observe..."}
              />
              {/* Live char count */}
              <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full border border-blue-100">
                {state.prompt.length} chars
              </div>
            </div>

            {/* Provider Filter */}
            <div>
              <label className="text-xs text-slate-500 mb-2 block font-semibold uppercase tracking-wide">
                Filter by Provider
              </label>
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
            </div>

            {/* Model Selector */}
            <div>
              <label className="text-xs text-slate-500 mb-2 block font-semibold uppercase tracking-wide">
                Select AI Model
              </label>
              <select
                value={state.selectedModelId}
                onChange={e => setSelectedModelId(e.target.value)}
                className="w-full bg-white border-2 border-blue-100 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium focus:outline-none focus:border-primary-400 transition-colors cursor-pointer"
              >
                {filteredModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name} — {model.provider} ({model.contextWindow} ctx)
                  </option>
                ))}
              </select>
            </div>

            {/* Requests Multiplier */}
            <div>
              <label className="text-xs text-slate-500 mb-2 block font-semibold uppercase tracking-wide">
                Daily Requests Multiplier
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={10000000}
                  value={state.requestsPerDay}
                  onChange={e => setRequestsPerDay(Number(e.target.value))}
                  className="flex-1 bg-white border-2 border-blue-100 rounded-xl px-4 py-3 text-slate-800 text-sm font-mono focus:outline-none focus:border-primary-400 transition-colors"
                />
                <div className="glass-card px-4 py-3 text-primary-600 text-sm font-bold font-mono whitespace-nowrap">
                  {hasResult ? formatCost(state.costResult!.monthlyCost) : '$0.00'}/mo
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Results Panel */}
          <div className="flex flex-col gap-4">
            {/* Token Analysis */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Token Analysis</h3>
                {state.isCalculating && (
                  <span className="text-xs text-primary-500 font-medium animate-pulse">
                    Calculating...
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: 'Total Tokens',
                    value: hasResult ? formatNumber(state.tokenResult!.totalTokens) : '—',
                    color: 'text-primary-600',
                    bg: 'bg-blue-50',
                  },
                  {
                    label: 'Input Tokens',
                    value: hasResult ? formatNumber(state.tokenResult!.inputTokens) : '—',
                    color: 'text-blue-500',
                    bg: 'bg-blue-50',
                  },
                  {
                    label: 'Output Tokens',
                    value: hasResult ? formatNumber(state.tokenResult!.outputTokens) : '—',
                    color: 'text-purple-500',
                    bg: 'bg-purple-50',
                  },
                  {
                    label: 'Characters',
                    value: hasResult ? formatNumber(state.tokenResult!.characters) : '—',
                    color: 'text-slate-700',
                    bg: 'bg-slate-50',
                  },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className={`${stat.bg} rounded-xl p-4 border border-blue-100 transition-all duration-300`}
                  >
                    <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Cost Estimate</h3>
                <span className="text-xs glass-card px-3 py-1 text-slate-500 font-medium">
                  {selectedModel.name}
                </span>
              </div>
              <div className="space-y-1">
                {[
                  {
                    label: 'Single Request',
                    sub: 'input + output tokens',
                    value: hasResult ? formatCost(state.costResult!.singleRequestCost) : '$—',
                    color: 'text-slate-800',
                  },
                  {
                    label: `${state.requestsPerDay.toLocaleString()} Requests`,
                    sub: 'per day',
                    value: hasResult ? formatCost(state.costResult!.dailyCost) : '$—',
                    color: 'text-primary-600',
                  },
                  {
                    label: 'Monthly Estimate',
                    sub: '30 days × daily cost',
                    value: hasResult ? formatCost(state.costResult!.monthlyCost) : '$—',
                    color: 'text-primary-700',
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-blue-100 last:border-0"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{item.label}</div>
                      <div className="text-xs text-slate-400">{item.sub}</div>
                    </div>
                    <div className={`text-lg font-bold font-mono ${item.color}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Model Info */}
            <div className="glass-card p-4 border-l-4 border-primary-400">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">
                    📊 {selectedModel.name} Pricing
                  </p>
                  <p className="text-xs text-slate-500">
                    Input: <span className="text-success font-bold">${selectedModel.pricing.inputPricePer1M}/1M tokens</span>
                    {' · '}
                    Output: <span className="text-danger font-bold">${selectedModel.pricing.outputPricePer1M}/1M tokens</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Context window: {selectedModel.contextWindow}
                  </p>
                </div>
                {selectedModel.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap ${
                    selectedModel.badge === 'cheapest'
                      ? 'bg-success/20 text-success'
                      : selectedModel.badge === 'popular'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {selectedModel.badge === 'cheapest' ? '💚 Best Value' : selectedModel.badge === 'popular' ? '⭐ Popular' : '🚀 Powerful'}
                  </span>
                )}
              </div>
            </div>

            {/* Empty state tip */}
            {!hasResult && (
              <div className="glass-card p-4 border-l-4 border-blue-300">
                <p className="text-xs text-slate-500 leading-relaxed">
                  💡 <span className="text-slate-700 font-bold">How to use:</span> Paste any prompt in the text area on the left.
                  Token count and costs will appear here instantly as you type.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToolCard