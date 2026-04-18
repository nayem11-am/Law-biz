import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
  viewport: { once: true, amount: 0.25 },
}

const aboutCards = [
  {
    title: 'Academy Overview',
    body: 'Blackstone Law Academy combines structured legal curriculum, strategic coaching, and guided practice to help learners excel in academics, exams, and professional growth.',
  },
  {
    title: 'Mission and Vision',
    body: 'Our mission is to make high-quality legal learning practical and accessible. Our vision is to build a generation of legal minds known for clarity, ethics, and impact.',
  },
  {
    title: 'Why Choose Blackstone Law Academy',
    list: [
      'Practice-first legal training beyond theory',
      'Personalized mentorship and performance tracking',
      'Exam strategy frameworks with measurable progress',
      'Professional ethics and communication focus',
    ],
  },
  {
    title: 'Faculty and Mentors',
    body: 'Our faculty includes legal educators, practicing advocates, and domain specialists who guide students with current legal insights and career-focused mentorship.',
  },
  {
    title: 'Student Achievements',
    body: 'Blackstone learners consistently improve legal writing, case analysis, and oral argument quality, with many students reporting stronger exam outcomes and internship readiness.',
  },
]

const cardTopBorders = ['#b38b59', '#8f6f49', '#c9a36a', '#a67c52', '#d1b07b']

function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-[#fbfaff] via-[#f2f6ff] to-[#ebf3ff] pt-28 pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-24 z-0 h-[220px] w-[220px] rounded-full bg-[#e4eeff]/30 blur-3xl sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 z-0 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[#d6e6ff]/26 blur-3xl sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px]"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-white/35" aria-hidden="true" />

      <section className="container pb-2">
        <Motion.div
          {...fadeUp}
          className="relative z-20 mx-auto max-w-3xl rounded-[32px] bg-white/78 p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b4b]">About</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#1f1a17] sm:text-5xl">
            Blackstone Law Academy
          </h1>
          <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-[#51463c]">
            We are a modern legal education academy built to shape confident, ethical, and
            practice-ready legal professionals through focused mentorship and real-world training.
          </p>
        </Motion.div>
      </section>

      <section className="container relative z-20 mt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {aboutCards.map((card, idx) => (
            <Motion.article
              key={card.title}
              {...fadeUp}
              className="h-full min-h-[260px] rounded-[28px] border-t-[3px] bg-white/80 px-7 pb-7 pt-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              style={{ borderTopColor: cardTopBorders[idx % cardTopBorders.length] }}
            >
              <div className="mt-1 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-7 w-7 rounded-full border border-[#ceb089] bg-[#f8f2e8] shadow-[inset_0_0_0_1px_rgba(179,139,89,0.25)]"
                />
                <h2 className="text-2xl font-semibold text-[#1f1a17]">{card.title}</h2>
              </div>

              {card.body ? (
                <p className="mt-4 max-w-[56ch] leading-relaxed text-[#5a4f44]">{card.body}</p>
              ) : (
                <ul className="mt-4 max-w-[56ch] space-y-2 leading-relaxed text-[#5a4f44]">
                  {card.list.map((item, idx) => (
                    <li key={item}>
                      {idx + 1}. {item}
                    </li>
                  ))}
                </ul>
              )}
            </Motion.article>
          ))}
        </div>
      </section>

      <section className="container relative z-20 mt-16">
        <Motion.div
          {...fadeUp}
          className="rounded-[32px] bg-[#1f1a17] p-8 text-white shadow-[0_12px_35px_rgba(0,0,0,0.2)] sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-semibold">Contact and Admission</h2>
            <p className="mt-2 max-w-[62ch] text-[#e8dccf]">
              Ready to start your legal journey with a premium learning path? Connect with our
              admissions team to get guidance on enrollment.
            </p>
          </div>
          <Link
            to="/"
            state={{ scrollTo: 'courses' }}
            className="mt-5 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold !text-black transition-all duration-300 hover:-translate-y-1 hover:!text-black hover:shadow-xl sm:mt-0"
          >
            Explore Courses
          </Link>
        </Motion.div>
      </section>

      <section className="container relative z-20 mt-14">
        <Motion.div {...fadeUp} className="text-center">
          <Link to="/" className="text-sm font-semibold text-[#6d5a48] underline underline-offset-4">
            Back to Home
          </Link>
        </Motion.div>
      </section>
    </main>
  )
}

export default AboutPage
