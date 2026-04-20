import { useEffect, useRef } from 'react'
import { motion as Motion } from 'framer-motion'

const desktopHeroVideo = 'https://videos.pexels.com/video-files/3209298/3209298-hd_1920_1080_25fps.mp4'
const mobileHeroVideo = '/hero-mobile.mp4'

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    // Start fetching and attempt playback as early as possible on mobile and desktop.
    videoRef.current.load()
    videoRef.current.play().catch(() => {})
  }, [])

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    if (videoRef.current.currentTime >= 12) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  return (
    <section className="section hero" id="hero">
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
        >
          <source media="(max-width: 767px)" src={mobileHeroVideo} type="video/mp4" />
          <source src={desktopHeroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <Motion.div
        className="container hero-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Motion.div
          className="hero-stack"
          variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Motion.p className="eyebrow" variants={itemVariants}>
            Legal Learning for the Next Generation
          </Motion.p>

          <Motion.h1 variants={itemVariants} className="font-bold">
            Build legal mastery with practical, modern guidance.
          </Motion.h1>

          <Motion.p className="subheading" variants={itemVariants}>
            From legal fundamentals to career-ready strategy, we help students and professionals
            become confident, capable, and future-ready.
          </Motion.p>

          <Motion.a
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="#services"
            className="btn-primary"
          >
            Explore Services
          </Motion.a>
        </Motion.div>
      </Motion.div>
    </section>
  )
}

export default Hero
