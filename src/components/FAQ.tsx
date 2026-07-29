import React, { useState } from 'react'

interface FAQData {
  q: string
  a: string
}

interface FAQItemProps {
  q: string
  a: string
}

const faqs: FAQData[] = [
  {
    q: 'What is a token in AI models?',
    a: 'A token is roughly 4 characters or 0.75 words in English. AI models like GPT-4 and Claude break text into tokens to process it. The more tokens your prompt uses, the more it costs.',
  },
  {
    q: 'How accurate is this token estimator?',
    a: 'Very accurate for OpenAI models using the tiktoken library. For other providers like Anthropic and Google, estimates are within 1-5% as they use similar but slightly different tokenizers.',
  },
  {
    q: 'Does TokenLens store my prompts?',
    a: 'No. All token counting happens entirely in your browser. Your prompts never leave your device and are never stored anywhere. 100% private.',
  },
  {
    q: 'Which AI providers does TokenLens support?',
    a: 'We currently support OpenAI (GPT-4o, GPT-4o Mini, GPT-3.5), Anthropic (Claude Sonnet, Claude Haiku), Google (Gemini 1.5 Pro), and Mistral. More models are added regularly.',
  },
  {
    q: 'Is TokenLens really free?',
    a: 'Yes, completely free. No login, no subscription, no credit card. TokenLens is supported by non-intrusive display ads that never interfere with the tool.',
  },
  {
    q: 'What is the requests multiplier feature?',
    a: 'It helps you estimate production costs. If you plan to send 1,000 prompts per day using the same template, the multiplier shows your estimated daily and monthly API spend instantly.',
  },
]

function FAQItem({ q, a }: FAQItemProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-glass-hover transition-colors"
      >
        {/* Darker title text (text-slate-900) */}
        <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 transition-transform duration-300 text-slate-700 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        /* Darker answer text (text-slate-700) */
        <div className="px-6 pb-4 text-slate-700 text-sm leading-relaxed border-t border-glass-border pt-4 animate-fade-in font-medium">
          {a}
        </div>
      )}
    </div>
  )
}

function FAQ(): React.ReactElement {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          {/* Darker subtitle text (text-slate-700) */}
          <p className="text-slate-700 font-medium">
            Everything you need to know about token counting and API costs
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq: FAQData) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ