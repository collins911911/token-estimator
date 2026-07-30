import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'
import ComparisonTable from '../components/ComparisonTable'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'
import AffiliateDisclosure from '../components/AffiliateDisclosure'
import { AdBannerMiddle, AdBannerBottom } from '../components/AdBanner'

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
          <Hero />
          <ToolCard />
          <AdBannerMiddle />

          {/* Affiliate disclosure shown above comparison table */}
          <AffiliateDisclosure />

          <ComparisonTable />
          <FAQ />
          <AdBannerBottom />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home