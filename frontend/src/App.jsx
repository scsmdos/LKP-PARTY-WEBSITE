import React, { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// ── Auth Providers ────────────────────────────────────────────────────────────
import { AuthProvider }      from './contexts/AuthContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'

// ── Route Guards ──────────────────────────────────────────────────────────────
import { MemberRoute, AdminRoute } from './components/ProtectedRoute'

// ── Public Site Layout ────────────────────────────────────────────────────────
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Preloader  from './components/Preloader'
import logo       from './assets/logo.png'

// ── Public Pages (Lazy) ───────────────────────────────────────────────────────
const Home       = lazy(() => import('./pages/Home'))
const About      = lazy(() => import('./pages/About'))
const Vision     = lazy(() => import('./pages/Vision'))
const Leadership = lazy(() => import('./pages/Leadership'))
const Campaigns  = lazy(() => import('./pages/Campaigns'))
const News       = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Media      = lazy(() => import('./pages/Media'))
const Gallery    = lazy(() => import('./pages/Gallery'))
const JoinUs     = lazy(() => import('./pages/JoinUs'))
const Donate     = lazy(() => import('./pages/Donate'))
const Contact    = lazy(() => import('./pages/Contact'))
const FAQ        = lazy(() => import('./pages/FAQ'))

// ── Member Portal (Lazy) ──────────────────────────────────────────────────────
const MemberLayout   = lazy(() => import('./member/components/MemberLayout'))
const MemberLogin    = lazy(() => import('./member/pages/Login'))
const MemberDashboard = lazy(() => import('./member/pages/Dashboard'))
const MemberProfile  = lazy(() => import('./member/pages/Profile'))
const MemberLocation = lazy(() => import('./member/pages/Location'))
const MemberFamily   = lazy(() => import('./member/pages/Family'))
const MemberSocial   = lazy(() => import('./member/pages/Social'))
const MemberCard     = lazy(() => import('./member/pages/MemberCard'))
const MemberRefer    = lazy(() => import('./member/pages/Refer'))

// ── Admin Panel (Lazy) ────────────────────────────────────────────────────────
const AdminLayout    = lazy(() => import('./admin/components/AdminLayout'))
const AdminLogin     = lazy(() => import('./admin/pages/Login'))
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'))
const AdminMembers   = lazy(() => import('./admin/pages/Members'))
const MemberDetail   = lazy(() => import('./admin/pages/MemberDetail'))
const AdminProfile   = lazy(() => import('./admin/pages/AdminProfile'))

// ── Loading Fallback ──────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fcfcfc] gap-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin" />
      <img src={logo} alt="LKP" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 object-contain" />
    </div>
    <p className="font-heading font-black text-[10px] text-maroon-800 uppercase tracking-[3px] animate-pulse">Lok Kalyan Party</p>
  </div>
)

function ReferRedirect() {
  const { refCode } = useParams()
  return <Navigate to={`/member/login?ref=${refCode}`} replace />
}

// ── Public Site Routes (with Navbar + Footer) ─────────────────────────────────
function PublicSite() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/vision"     element={<Vision />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/campaigns"  element={<Campaigns />} />
            <Route path="/news"       element={<News />} />
            <Route path="/news/:id"   element={<NewsDetail />} />
            <Route path="/media"      element={<Media />} />
            <Route path="/gallery"    element={<Gallery />} />
            <Route path="/join-us"    element={<JoinUs />} />
            <Route path="/donate"     element={<Donate />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/faq"        element={<FAQ />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </>
  )
}

// ── App Router ────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* ── Member Portal ─────────────────────────────────────────────────── */}
      <Route path="/member/login" element={<Suspense fallback={<PageLoader />}><MemberLogin /></Suspense>} />
      
      {/* ── Referral Redirect ──────────────────────────────────────────────── */}
      <Route 
        path="/ref/:refCode" 
        element={<ReferRedirect />} 
      />

      <Route
        path="/member"
        element={
          <MemberRoute>
            <Suspense fallback={<PageLoader />}>
              <MemberLayout />
            </Suspense>
          </MemberRoute>
        }
      >
        <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><MemberDashboard /></Suspense>} />
        <Route path="profile"   element={<Suspense fallback={<PageLoader />}><MemberProfile /></Suspense>} />
        <Route path="location"  element={<Suspense fallback={<PageLoader />}><MemberLocation /></Suspense>} />
        <Route path="family"    element={<Suspense fallback={<PageLoader />}><MemberFamily /></Suspense>} />
        <Route path="social"    element={<Suspense fallback={<PageLoader />}><MemberSocial /></Suspense>} />
        <Route path="card"      element={<Suspense fallback={<PageLoader />}><MemberCard /></Suspense>} />
        <Route path="refer"     element={<Suspense fallback={<PageLoader />}><MemberRefer /></Suspense>} />
      </Route>

      {/* ── Admin Panel ───────────────────────────────────────────────────── */}
      <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Suspense fallback={<PageLoader />}>
              <AdminLayout />
            </Suspense>
          </AdminRoute>
        }
      >
        <Route path="dashboard"      element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
        <Route path="members"        element={<Suspense fallback={<PageLoader />}><AdminMembers /></Suspense>} />
        <Route path="members/:id"    element={<Suspense fallback={<PageLoader />}><MemberDetail /></Suspense>} />
        <Route path="profile"        element={<Suspense fallback={<PageLoader />}><AdminProfile /></Suspense>} />
      </Route>

      {/* ── Public Website (catch all) ────────────────────────────────────── */}
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  )
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <Preloader />

  return (
    <Router>
      <AdminAuthProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                borderRadius: '4px',
              },
              success: { iconTheme: { primary: '#8B0000', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </AdminAuthProvider>
    </Router>
  )
}

export default App
