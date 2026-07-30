import React from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
}

// Lightweight SEO component using direct document manipulation
// Avoids adding heavy helmet libraries that slow the bundle
function SEO({
  title = 'TokenLens — Free AI Token Counter & API Cost Estimator',
  description = 'Instantly count tokens and calculate exact API costs for GPT-4o, Claude, Gemini, Mistral and more. Free, no login required. Built for developers and freelancers.',
  keywords = 'token counter, AI API cost calculator, GPT-4 token count, Claude token estimator, LLM cost calculator, prompt token counter, OpenAI pricing calculator, API cost estimator',
  canonical = 'https://tokenlens.dev',
  ogTitle,
  ogDescription,
}: SEOProps): React.ReactElement | null {
  React.useEffect(() => {
    // Title
    document.title = title

    // Helper to set or create meta tag
    function setMeta(name: string, content: string, attr = 'name') {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('robots', 'index, follow')
    setMeta('author', 'TokenLens')

    // Open Graph
    setMeta('og:title', ogTitle ?? title, 'property')
    setMeta('og:description', ogDescription ?? description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:site_name', 'TokenLens', 'property')

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', ogTitle ?? title)
    setMeta('twitter:description', ogDescription ?? description)

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  }, [title, description, keywords, canonical, ogTitle, ogDescription])

  return null
}

export default SEO