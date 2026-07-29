function ToolCard() {
  return (
    <section id="tool" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            The <span className="text-gradient">Token Calculator</span>
          </h2>
          <p className="text-slate-700 font-medium max-w-xl mx-auto">
            Paste your prompt below and watch the token count and cost update in real time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left — Prompt Input */}
          <div className="glass-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Your Prompt</h3>
              <span className="text-xs text-slate-700 font-medium glass-card px-3 py-1 rounded-full">
                Paste or type here
              </span>
            </div>

            {/* Textarea Placeholder */}
            <div className="relative flex-1">
              <textarea
                className="w-full h-64 bg-bg-surface border border-glass-border rounded-xl p-4 text-slate-800 text-sm font-mono resize-none focus:outline-none focus:border-primary-500 transition-colors placeholder-slate-500"
                placeholder="Paste your prompt here...&#10;&#10;Example: You are a helpful assistant. Please analyze the following data and provide insights..."
                disabled
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-500 font-medium">
                Logic coming in Phase 4 ⚡
              </div>
            </div>

            {/* Model Selector Placeholder */}
            <div>
              <label className="text-xs text-slate-700 font-medium mb-2 block">Select AI Model</label>
              <div className="w-full bg-bg-surface border border-glass-border rounded-xl px-4 py-3 text-slate-800 text-sm flex items-center justify-between font-medium">
                <span>GPT-4o — OpenAI</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Multiplier Placeholder */}
            <div>
              <label className="text-xs text-slate-700 font-medium mb-2 block">Daily Requests Multiplier</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-bg-surface border border-glass-border rounded-xl px-4 py-3 text-slate-800 text-sm font-medium">
                  1,000 requests/day
                </div>
                <div className="glass-card px-4 py-3 text-primary-600 text-sm font-mono font-bold">
                  = $0.00/mo
                </div>
              </div>
            </div>
          </div>

          {/* Right — Results Panel */}
          <div className="flex flex-col gap-4">
            {/* Token Count Card */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Token Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Tokens', value: '—', color: 'text-primary-600' },
                  { label: 'Input Tokens', value: '—', color: 'text-blue-600' },
                  { label: 'Output Tokens', value: '—', color: 'text-purple-600' },
                  { label: 'Characters', value: '—', color: 'text-slate-800' },
                ].map(stat => (
                  <div key={stat.label} className="bg-bg-surface rounded-xl p-4 border border-glass-border">
                    <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-700 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Estimate Card */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Cost Estimate</h3>
              <div className="space-y-3">
                {[
                  { label: 'Single Request', value: '$—', sub: 'input + output' },
                  { label: '1,000 Requests', value: '$—', sub: 'per day' },
                  { label: 'Monthly (30 days)', value: '$—', sub: 'estimated total' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-glass-border last:border-0">
                    <div>
                      <div className="text-sm font-medium text-slate-800">{item.label}</div>
                      <div className="text-xs text-slate-600">{item.sub}</div>
                    </div>
                    <div className="text-lg font-bold font-mono text-primary-600">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tip */}
            <div className="glass-card p-4 border-l-4 border-primary-500">
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                💡 <span className="text-slate-900 font-bold">Pro Tip:</span> Token counts vary slightly between models.
                GPT-4 and Claude use similar tokenizers but open-source models may differ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToolCard