import React from 'react'

interface StatItem {
  value: string
  label: string
}

const statsData: StatItem[] = [
  { value: '10+', label: 'AI Models' },
  { value: '5+', label: 'Providers' },
  { value: '100%', label: 'Free' },
  { value: '<1s', label: 'Instant Results' },
]

function Hero(): React.ReactElement {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm text-primary-300 font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />
          Free forever — No login required
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-slide-up">
          Know Exactly{' '}
          <span className="text-gradient">What Your Prompt</span>
          <br />
          Will Cost You
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up">
          Paste any prompt, pick your AI model, and instantly see the token count
          and exact API cost across OpenAI, Anthropic, Google, Mistral and more.
          Built for developers and freelancers who care about costs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <a
            href="#tool"
            className="btn-primary text-base px-8 py-3 w-full sm:w-auto text-center"
          >
            Calculate Now ⚡
          </a>
          
          <a
  href="#compare"
  className="text-slate-800 hover:text-blue-600 text-base font-semibold flex items-center gap-2 transition-colors duration-200"
>
  Compare Providers
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {statsData.map((stat: StatItem) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-primary-400">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center animate-bounce">
          <a href="#tool" aria-label="Scroll to tool">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero