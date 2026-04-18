import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const textItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
const MotionLink = Motion(Link)

const buildCourseImageUrl = (courseName) => {
  const prompt = [
    `Concept illustration for ${courseName}`,
    'modern minimal law academy visual',
    'legal books, scales of justice, courtroom motifs',
    'clean academic style, soft blue and ivory color palette',
    'digital illustration, no people, no text, no watermark',
  ].join(', ')

  const seed = courseName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=960&height=640&model=flux&seed=${seed}&nologo=true`
}

const buildCoursePlaceholder = (courseName) => {
  const safeTitle = courseName.replace(/&/g, 'and')
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#eef3ff"/>
          <stop offset="100%" stop-color="#dce7fb"/>
        </linearGradient>
      </defs>
      <rect width="960" height="640" fill="url(#g)"/>
      <rect x="72" y="72" width="816" height="496" rx="28" fill="#ffffff" fill-opacity="0.72"/>
      <text x="480" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="38" fill="#1f1a17" font-weight="700">Law Course</text>
      <text x="480" y="352" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#4f596f">${safeTitle}</text>
    </svg>`
  )}`
}

function CourseImage({ courseName }) {
  const placeholder = buildCoursePlaceholder(courseName)
  const aiUrl = buildCourseImageUrl(courseName)
  const [src, setSrc] = useState(placeholder)

  useEffect(() => {
    let isMounted = true
    const probe = new Image()

    probe.onload = () => {
      if (isMounted) setSrc(aiUrl)
    }
    probe.onerror = () => {
      if (isMounted) setSrc(placeholder)
    }
    probe.src = aiUrl

    return () => {
      isMounted = false
    }
  }, [aiUrl, placeholder])

  return (
    <img
      src={src}
      alt={`${courseName} course concept illustration`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )
}

function Section({ id, title, subtitle, details, courses, policySections, animation, cta, className = '', hideDetails = false }) {
  const isServices = id === 'services'
  const isCourses = id === 'courses'
  const isPolicy = id === 'policy'
  const isFeaturedSection = isServices || isCourses || isPolicy
  const serviceDetails = (details && details.length > 0 ? details : [subtitle]).slice(0, 3)
  const sectionRef = useRef(null)
  const [servicesVisibleCount, setServicesVisibleCount] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isServices) return

    const nextCount = latest < 0.18 ? 0 : latest < 0.46 ? 1 : latest < 0.74 ? 2 : 3
    setServicesVisibleCount((prev) => (nextCount > prev ? nextCount : prev))
  })

  const serviceProgress = `${(servicesVisibleCount / 3) * 100}%`
  const isInternalCta = Boolean(cta?.href?.startsWith('/'))

  return (
    <section
      ref={sectionRef}
      className={`section relative overflow-hidden bg-gradient-to-br from-[#fafbf8] via-[#f4f6f2] to-[#ecefe9] ${isServices ? 'min-h-[230vh] md:min-h-[255vh]' : ''} ${className}`.trim()}
      id={id}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-10 z-0 h-[180px] w-[180px] rounded-full bg-[#e6ebe3]/36 blur-3xl sm:left-12 sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 z-0 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-[#dde4db]/30 blur-3xl sm:right-12 sm:h-[260px] sm:w-[260px] md:h-[320px] md:w-[320px]"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-white/52" aria-hidden="true" />

      {isFeaturedSection ? (
        <div className={`container relative z-20 ${isServices ? 'sticky top-24 md:top-28' : ''}`}>
          <Motion.div
            className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-xl md:text-left"
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Motion.h2
              variants={textItem}
              className={`${isServices ? '-mt-1 sm:-mt-1.5' : 'mt-1'} text-4xl font-bold tracking-tight text-[#1f1a17] sm:text-5xl`}
            >
              {title}
            </Motion.h2>
          </Motion.div>

          {!hideDetails ? (
            <Motion.div
              className="mt-7 w-full max-w-none"
              variants={textContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {isPolicy && policySections?.length ? (
              <Motion.div
                variants={textItem}
                className="mx-auto max-w-5xl rounded-2xl border border-[#d8dfef] bg-white/82 shadow-[0_10px_30px_rgba(24,33,54,0.07)]"
              >
                {policySections.map((section, idx) => (
                  <div
                    key={section.title}
                    className={`px-6 py-6 md:px-8 md:py-7 ${idx === 0 ? '' : 'border-t border-[#e4e9f5]'}`}
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-[#1f1a17]">{section.title}</h3>
                    {section.paragraphs?.map((paragraph, pIdx) => (
                      <p
                        key={`${section.title}-p-${pIdx}`}
                        className={`text-left leading-relaxed text-[#4f596f] ${pIdx === 0 ? 'mt-3' : 'mt-3'}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.points?.length ? (
                      <ul className="mt-3 space-y-2 text-left leading-relaxed text-[#4f596f]">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#415476]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.closing ? (
                      <p className="mt-3 text-left leading-relaxed text-[#4f596f]">{section.closing}</p>
                    ) : null}
                  </div>
                ))}
              </Motion.div>
              ) : isServices ? (
              <div className="mx-auto mt-2 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                {serviceDetails.map((line, idx) => (
                  <Motion.article
                    key={`${id}-card-${idx}`}
                    initial={false}
                    animate={servicesVisibleCount >= idx + 1 ? 'show' : 'hidden'}
                    variants={{
                      hidden: { opacity: 0.16, y: 34, scale: 0.985 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative h-full overflow-hidden rounded-[20px] border border-[#d7ddd1] bg-[linear-gradient(145deg,#ffffff_0%,#f8faf6_52%,#edf2ea_100%)] px-6 py-6 shadow-[0_16px_36px_rgba(25,34,26,0.12)]"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b7c8aa] via-[#8da781] to-[#657f5d]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-[#e6eddc]/70 blur-2xl"
                    />
                    <p className="relative text-left text-[1.02rem] leading-relaxed text-[#2f3b2d]">{line}</p>
                  </Motion.article>
                ))}

                <div className="lg:col-span-3">
                  <div className="mt-2 w-full" aria-hidden="true">
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#d9e2d1]">
                      <Motion.div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#b5c8a7] via-[#8aa67a] to-[#607958]"
                        animate={{ width: serviceProgress }}
                        transition={{ duration: 0.42, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              ) : (
              (details && details.length > 0 ? details : [subtitle]).map((line, idx) => (
                <Motion.p
                  key={`${id}-detail-${idx}`}
                  variants={textItem}
                  className={`!m-0 !mt-0 !max-w-none w-full !text-justify [text-align-last:left] text-lg leading-relaxed text-[#5c5148] ${idx === 0 ? '' : '!mt-5'}`}
                >
                  {line}
                </Motion.p>
              ))
              )}
            </Motion.div>
          ) : null}

          {cta ? (
            <Motion.div
              variants={textContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-7 text-left"
            >
              {isInternalCta ? (
                <MotionLink
                  variants={textItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  to={cta.href}
                  className="btn-secondary !mt-0"
                >
                  {cta.label}
                </MotionLink>
              ) : (
                <Motion.a
                  variants={textItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href={cta.href}
                  className="btn-secondary !mt-0"
                >
                  {cta.label}
                </Motion.a>
              )}
            </Motion.div>
          ) : null}

          {isCourses && courses?.length ? (
            <Motion.div
              variants={textContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {courses.map((courseName) => (
                <Motion.article
                  key={courseName}
                  variants={textItem}
                  className="group overflow-hidden rounded-[18px] border border-[#d6ddd4] bg-white/92 shadow-[0_12px_30px_rgba(26,34,28,0.09)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c4d0c0] hover:shadow-[0_18px_38px_rgba(26,34,28,0.14)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <CourseImage courseName={courseName} />
                  </div>
                  <div className="px-5 py-5">
                    <h3 className="text-[1.02rem] font-semibold tracking-tight text-[#1f2822]">{courseName}</h3>
                    <Motion.a
                      href="/#contact-us"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 inline-flex items-center rounded-full border border-[#1f2822]/10 bg-[#2f3c33] px-4 py-2 text-sm font-semibold !text-white transition-colors duration-200 hover:bg-[#243028]"
                    >
                      Enroll
                    </Motion.a>
                  </div>
                </Motion.article>
              ))}
            </Motion.div>
          ) : null}
        </div>
      ) : (
        <Motion.div className="section-inner relative z-20" {...animation}>
          <Motion.div
            className="section-stack"
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Motion.h2 variants={textItem}>{title}</Motion.h2>
            <Motion.p variants={textItem}>{subtitle}</Motion.p>
            {cta ? (
              <Motion.a
                variants={textItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href={cta.href}
                className="btn-secondary"
              >
                {cta.label}
              </Motion.a>
            ) : null}
          </Motion.div>
        </Motion.div>
      )}
    </section>
  )
}

export default Section
