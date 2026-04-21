import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig, MotionGlobalConfig } from 'framer-motion'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'

const smoothScrollTo = (top) => {
  const startY = window.scrollY
  const distance = top - startY
  const duration = Math.min(420, Math.max(220, Math.abs(distance) * 0.22))
  let start = null

  const step = (timestamp) => {
    if (start === null) start = timestamp

    const progress = Math.min((timestamp - start) / duration, 1)
    const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
    window.scrollTo(0, startY + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const hasHandledInitialReload = useRef(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px), (pointer: coarse)').matches)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const onChange = (event) => setIsMobile(event.matches)

    setIsMobile(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    MotionGlobalConfig.skipAnimations = isMobile
    return () => {
      MotionGlobalConfig.skipAnimations = false
    }
  }, [isMobile])

  const scrollToSection = useCallback((id, smooth = true) => {
    const attempt = (retries) => {
      const target = document.getElementById(id)

      if (target) {
        const navbarOffset = 96
        const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset

        if (!smooth) {
          window.scrollTo({ top, left: 0, behavior: 'auto' })
          return
        }

        if (isMobile) {
          window.scrollTo({ top, left: 0, behavior: 'auto' })
          return
        }

        smoothScrollTo(top)
        return
      }

      if (retries > 0) {
        requestAnimationFrame(() => attempt(retries - 1))
      }
    }

    attempt(8)
  }, [isMobile])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hasHandledInitialReload.current) return
    hasHandledInitialReload.current = true

    const navEntry = performance.getEntriesByType('navigation')[0]
    const isReload = navEntry?.type === 'reload'
    if (!isReload) return

    if (window.location.pathname !== '/' || window.location.hash) {
      navigate('/', { replace: true, state: null })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [navigate])

  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo, false)

      navigate(`${location.pathname}${location.hash}`, { replace: true, state: null })
      return
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      scrollToSection(targetId, false)
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash, location.state, navigate, scrollToSection])

  return (
    <MotionConfig
      reducedMotion={isMobile ? 'always' : 'never'}
      transition={isMobile ? { duration: 0, delay: 0 } : undefined}
    >
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </MotionConfig>
  )
}

export default App
