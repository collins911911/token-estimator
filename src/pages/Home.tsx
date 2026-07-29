import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'
import ComparisonTable from '../components/ComparisonTable'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <main>
        <Hero />
        <ToolCard />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default Home