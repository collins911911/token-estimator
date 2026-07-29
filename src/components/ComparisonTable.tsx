const providers = [
  { name: 'GPT-4o', provider: 'OpenAI', input: '$2.50', output: '$10.00', context: '128K', badge: null },
  { name: 'GPT-4o Mini', provider: 'OpenAI', input: '$0.15', output: '$0.60', context: '128K', badge: 'cheapest' },
  { name: 'Claude Sonnet 4', provider: 'Anthropic', input: '$3.00', output: '$15.00', context: '200K', badge: null },
  { name: 'Claude Haiku', provider: 'Anthropic', input: '$0.25', output: '$1.25', context: '200K', badge: null },
  { name: 'Gemini 1.5 Pro', provider: 'Google', input: '$1.25', output: '$5.00', context: '1M', badge: null },
  { name: 'Mistral Large', provider: 'Mistral', input: '$2.00', output: '$6.00', context: '32K', badge: null },
]

function ComparisonTable() {
  return (
    <section id="compare" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Provider <span className="text-gradient">Cost Comparison</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            All prices are per 1 million tokens. Green = cheapest for your use case.
          </p>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-glass-border bg-bg-surface">
            {['Model', 'Provider', 'Input /1M', 'Output /1M', 'Context'].map(col => (
              <div key={col} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {col}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {providers.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-5 gap-4 px-6 py-4 border-b border-glass-border last:border-0 transition-colors hover:bg-glass-hover
                ${row.badge === 'cheapest' ? 'bg-success/5 border-l-2 border-l-success' : ''}
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200">{row.name}</span>
                {row.badge === 'cheapest' && (
                  <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                    Best Value
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-400">{row.provider}</div>
              <div className="text-sm font-mono text-success">{row.input}</div>
              <div className="text-sm font-mono text-danger">{row.output}</div>
              <div className="text-sm text-slate-400">{row.context}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          * Prices are approximate and may change. Always verify on provider pricing pages.
        </p>
      </div>
    </section>
  )
}

export default ComparisonTable