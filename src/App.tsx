import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card glass-card-hover p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gradient mb-2">
          Token Estimator 🚀
        </h1>
        <p className="text-slate-400">
          Phase 1 Complete — Router is working! ✅
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App