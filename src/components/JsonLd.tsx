import React from 'react'

// JSON-LD structured data for Google rich results
function JsonLd(): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://tokenlens.dev/#app',
        name: 'TokenLens',
        url: 'https://tokenlens.dev',
        description:
          'Free AI token counter and API cost estimator for GPT-4o, Claude, Gemini, Mistral and more.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Real-time token counting',
          'API cost estimation',
          'Multi-provider comparison',
          'Shareable results URL',
          'No login required',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a token in AI models?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A token is roughly 4 characters or 0.75 words in English. AI models like GPT-4 and Claude break text into tokens to process it. The more tokens your prompt uses, the more it costs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate GPT-4 API costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste your prompt into TokenLens, select GPT-4o from the model dropdown, and instantly see the token count and exact cost per request, per day, and per month.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate is TokenLens token estimation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TokenLens estimates are within 1-5% accuracy for all major providers including OpenAI, Anthropic, Google, and Mistral.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does TokenLens store my prompts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All token counting happens entirely in your browser. Your prompts never leave your device and are never stored anywhere.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://tokenlens.dev',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Token Calculator',
            item: 'https://tokenlens.dev/#tool',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Provider Comparison',
            item: 'https://tokenlens.dev/#compare',
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default JsonLd