import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import PageLoader from './components/PageLoader'

// Lazy load Home page — only loads when needed
const Home = lazy(() => import('./pages/Home'))

function App(): React.ReactElement {
  return (
    <>
      <Preloader />
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App