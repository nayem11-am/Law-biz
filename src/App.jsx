import { useCallback, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = useCallback((id, smooth = true) => {
    const attempt = (retries) => {
      const target = document.getElementById(id)

      if (target) {
        const navbarOffset = 96
        const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset
        window.scrollTo({ top, left: 0, behavior: smooth ? 'smooth' : 'auto' })
        return
      }

      if (retries > 0) {
        requestAnimationFrame(() => attempt(retries - 1))
      }
    }

    attempt(8)
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const markReload = () => {
      sessionStorage.setItem('force_home_on_reload', '1')
    }

    window.addEventListener('beforeunload', markReload)
    return () => window.removeEventListener('beforeunload', markReload)
  }, [])

  useEffect(() => {
    const shouldForceHome = sessionStorage.getItem('force_home_on_reload') === '1'
    if (!shouldForceHome) return

    sessionStorage.removeItem('force_home_on_reload')

    if (location.pathname !== '/' || location.hash || location.state) {
      navigate('/', { replace: true, state: null })
    }
  }, [location.pathname, location.hash, location.state, navigate])

  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo, true)

      navigate(`${location.pathname}${location.hash}`, { replace: true, state: null })
      return
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      scrollToSection(targetId, true)
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash, location.state, navigate, scrollToSection])

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
