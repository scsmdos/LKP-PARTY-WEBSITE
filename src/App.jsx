import React, { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/Preloader'
import StickyCTA from './components/StickyCTA'

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Vision = lazy(() => import('./pages/Vision'))
const Leadership = lazy(() => import('./pages/Leadership'))
const Campaigns = lazy(() => import('./pages/Campaigns'))
const News = lazy(() => import('./pages/News'))
const Media = lazy(() => import('./pages/Media'))
const Gallery = lazy(() => import('./pages/Gallery'))
const JoinUs = lazy(() => import('./pages/JoinUs'))
const Donate = lazy(() => import('./pages/Donate'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))

// Loading Fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin"></div>
  </div>
)

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/news" element={<News />} />
            <Route path="/media" element={<Media />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
      <StickyCTA />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Preloader />

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
