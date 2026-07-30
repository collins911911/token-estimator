import React, { useState } from 'react'

interface FAQItem {
  q: string
  a: string
  keywords: string[]
}

const faqs: FAQItem[] = [
  {
    q: 'What is a token in AI language models?',
    a: 'A token is the basic unit AI models use to process text. In English, one token is roughly 4 characters or about 0.75 words. For example, the word "hamburger" is 3 tokens, while "hi" is 1 token. AI models like GPT-4, Claude, and Gemini all charge based on the number of tokens processed — both input (your prompt) and output (the response).',
    keywords: ['what is a token', 'AI token definition', 'how tokens work'],
  },
  {
    q: 'How do I calculate GPT-4o API costs?',
    a: 'To calculate GPT-4o costs, paste your prompt into the TokenLens calculator above and select GPT-4o from the model dropdown. You will instantly see the token count and exact cost per request. GPT-4o is currently priced at $2.50 per million input tokens and $10.00 per million output tokens. Use the daily requests multiplier to estimate your monthly spend.',
    keywords: ['GPT-4o cost calculator', 'GPT-4 API pricing', 'OpenAI cost estimate'],
  },
  {
    q: 'How accurate is the TokenLens token estimator?',
    a: 'TokenLens estimates are within 1 to 5 percent accuracy for all major providers. For OpenAI models, we use the same tokenization algorithm as the official tiktoken library. For Anthropic Claude, Google Gemini, and Mistral, we apply provider-specific adjustments. The estimations are reliable enough for budgeting and cost planning purposes.',
    keywords: ['token counter accuracy', 'how accurate token estimator'],
  },
  {
    q: 'What is the difference between input tokens and output tokens?',
    a: 'Input tokens are the tokens in your prompt — everything you send to the AI model. Output tokens are the tokens in the model response. Both are billed separately and at different rates. Output tokens typically cost 3 to 5 times more than input tokens. TokenLens estimates output tokens as approximately 30 percent of your input by default, which you can adjust.',
    keywords: ['input tokens vs output tokens', 'AI token pricing difference'],
  },
  {
    q: 'Which AI model is the cheapest for API usage?',
    a: 'As of 2025, the cheapest major AI models for API usage are GPT-4o Mini ($0.15 input / $0.60 output per million tokens), Gemini 1.5 Flash ($0.075 input / $0.30 output), and Mistral Small ($0.20 input / $0.60 output). For most use cases where cost matters, GPT-4o Mini and Gemini Flash offer the best value. Use the comparison table above to see live cost differences for your specific prompt.',
    keywords: ['cheapest AI API', 'most affordable LLM', 'GPT-4o mini vs Gemini Flash cost'],
  },
  {
    q: 'Does TokenLens store or log my prompts?',
    a: 'No. TokenLens performs all token counting directly in your browser using JavaScript. Your prompts never leave your device, are never sent to any server, and are never stored or logged anywhere. This is intentional by design — we built TokenLens to be fully private and fast.',
    keywords: ['is token counter safe', 'does it store prompts', 'private token counter'],
  },
  {
    q: 'How do I estimate monthly AI API costs for my app?',
    a: 'Use the Daily Requests Multiplier in the TokenLens calculator. Paste your typical prompt, select your model, then enter how many API requests your app sends per day. TokenLens will instantly calculate your estimated daily and monthly cost. For example, 1000 requests per day using GPT-4o Mini with a 500-token prompt would cost approximately $2.25 per month.',
    keywords: ['estimate monthly AI API cost', 'production AI cost calculator', 'LLM budget estimator'],
  },
  {
    q: 'What AI models does TokenLens support?',
    a: 'TokenLens currently supports OpenAI (GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo), Anthropic (Claude Sonnet 4, Claude Haiku 4, Claude Opus 4), Google (Gemini 1.5 Pro, Gemini 1.5 Flash), Mistral (Mistral Large, Mistral Small), and Meta Llama 3.1 70B via Groq. We update pricing regularly as providers change their rates.',
    keywords: ['supported AI models', 'which LLMs does TokenLens support'],
  },
]

function FAQRow({ item }: { item: FAQItem }): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="glass-card overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-blue-50/40 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-sm pr-4 leading-snug" itemProp="name">
          {item.q}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5 7.5l5 5 5-5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="px-6 pb-5 pt-3 text-slate-600 text-sm leading-relaxed border-t border-blue-100 animate-fade-in"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <span itemProp="text">{item.a}</span>
        </div>
      )}
    </div>
  )
}

function FAQ(): React.ReactElement {
  return (
    <section id="faq" className="py-20 px-4" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-600 font-medium">
            Everything developers and freelancers need to know about AI token counting and API costs
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map(faq => (
            <FAQRow key={faq.q} item={faq} />
          ))}
        </div>

        {/* SEO content block — naturally placed keyword content */}
        <div className="mt-16 glass-card p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Why Accurate Token Counting Matters for Developers
          </h3>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              When building applications on top of large language models, API costs can spiral
              quickly without proper planning. A prompt that seems short can contain hundreds of
              tokens once you factor in system instructions, conversation history, and formatting.
              Using a reliable <strong className="text-slate-800">AI token counter</strong> before
              deploying to production can save developers hundreds of dollars per month.
            </p>
            <p>
              TokenLens was built specifically for developers, copywriters, and technical freelancers
              who need a fast, accurate <strong className="text-slate-800">GPT-4 token estimator</strong> and{' '}
              <strong className="text-slate-800">Claude API cost calculator</strong> without logging
              in or navigating complex pricing dashboards. Paste your prompt, get instant results.
            </p>
            <p>
              Whether you are comparing <strong className="text-slate-800">GPT-4o vs Claude costs</strong>,
              estimating monthly spend for a chatbot, or checking how many tokens fit in a context
              window — TokenLens gives you the answer in under a second, completely free.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ