import React, { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'

// Lazy load below-fold components — they dont need to load immediately
const ComparisonTable = lazy(() => import('../components/ComparisonTable'))
const FAQ = lazy(() => import('../components/FAQ'))
const Footer = lazy(() => import('../components/Footer'))
const AffiliateDisclosure = lazy(() => import('../components/AffiliateDisclosure'))
const AdBannerMiddle = lazy(() =>
  import('../components/AdBanner').then(m => ({ default: m.AdBannerMiddle }))
)
const AdBannerBottom = lazy(() =>
  import('../components/AdBanner').then(m => ({ default: m.AdBannerBottom }))
)

// Lightweight fallback for lazy sections
function SectionSkeleton(): React.ReactElement {
  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 bg-blue-100 rounded-xl w-1/3 mx-auto" />
        <div className="h-4 bg-blue-50 rounded-xl w-1/2 mx-auto" />
        <div className="h-64 bg-blue-50 rounded-2xl w-full mt-8" />
      </div>
    </div>
  )
}

function Home(): React.ReactElement {
  return (
    <>
      <SEO
        title="TokenLens — Free AI Token Counter & API Cost Estimator"
        description="Instantly count tokens and calculate exact API costs for GPT-4o, Claude Sonnet, Gemini, Mistral and more. Free AI token counter built for developers and freelancers. No login required."
        keywords="token counter, AI API cost calculator, GPT-4o token count, Claude token estimator, LLM cost calculator, prompt token counter, OpenAI pricing calculator, API cost estimator, how many tokens is my prompt, GPT-4 pricing calculator"
        canonical="https://tokenlens.dev"
      />
      <JsonLd />

      <div className="min-h-screen bg-bg-base">
        <Navbar />
        <main>
          {/* Above fold — loads immediately */}
          <Hero />
          <ToolCard />

          {/* Below fold — lazy loaded */}
          <Suspense fallback={<div className="h-24" />}>
            <AdBannerMiddle />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <AffiliateDisclosure />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <ComparisonTable />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <FAQ />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <AdBannerBottom />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-32" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default Home