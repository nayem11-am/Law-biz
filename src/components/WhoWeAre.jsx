import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-gradient-to-br from-[#fbfaff] via-[#f2f6ff] to-[#ebf3ff] py-16 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-10 z-0 h-[200px] w-[200px] rounded-full bg-[#e4eeff]/30 blur-3xl sm:left-10 sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 z-0 h-[230px] w-[230px] -translate-y-1/2 rounded-full bg-[#d6e6ff]/26 blur-3xl sm:right-14 sm:h-[280px] sm:w-[280px] md:right-20 md:h-[350px] md:w-[350px]"
      />

      <img
        src="/who-we-are-backdrop.jpeg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 z-0 w-[300px] -translate-y-1/2 object-contain opacity-[0.1] grayscale blur-[0.25px] mix-blend-multiply sm:w-[380px] md:w-[500px] lg:w-[560px]"
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-white/35" aria-hidden="true" />

      <div className="container relative z-20">
        <Motion.div
          className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-xl md:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Motion.h2 className="mt-1 text-4xl font-bold tracking-tight text-[#1f1a17] sm:text-5xl">
            Who We Are
          </Motion.h2>

          <Motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-[#5c5148]">
            Blackstone Law Academy is a premium legal education institute focused on building sharp,
            ethical, and practice-ready legal minds through modern learning experiences.
          </Motion.p>

          <Motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-[#5c5148]">
            We combine academic depth with real-world legal strategy, helping students and aspiring
            professionals grow with confidence, clarity, and distinction.
          </Motion.p>

          <Motion.div variants={fadeUp}>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center rounded-full bg-[#1f1a17] px-6 py-3 text-sm font-semibold tracking-wide !text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:!text-white hover:shadow-xl"
            >
              Learn More
            </Link>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  )
}

export default WhoWeAre
