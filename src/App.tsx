import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Preloader from './components/Preloader'
import PageLoader from './components/PageLoader'

function App(): React.ReactElement {
  return (
    <>
      {/* Landing preloader — shows once on first load */}
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