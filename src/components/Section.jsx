import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

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

const enrollmentPackages = [
  { count: 1, fee: 2000, note: 'Single course plan' },
  { count: 2, fee: 4000, note: 'Best for focused progression' },
  { count: 3, fee: 5000, note: 'Save 1000 BDT' },
  { count: 4, fee: 6000, note: 'Save 2000 BDT' },
]

const yearLabels = ['1st Year', '2nd Year', '3rd Year']
const contactItems = [
  {
    key: 'phone',
    label: 'Phone',
    value: '+8801XXXXXXXXX',
    href: 'tel:+8801XXXXXXXXX',
  },
  {
    key: 'email',
    label: 'Email',
    value: 'support@blackstonelawacademy.com',
    href: 'mailto:support@blackstonelawacademy.com',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    value: 'facebook.com/blackstonelawacademy',
    href: 'https://facebook.com/blackstonelawacademy',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    value: 'instagram.com/blackstonelawacademy',
    href: 'https://instagram.com/blackstonelawacademy',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/company/blackstonelawacademy',
    href: 'https://linkedin.com/company/blackstonelawacademy',
  },
]

function ContactIcon({ type }) {
  const common = 'h-5 w-5 text-[#1f3b67]'

  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.37c1.2.4 2.5.62 3.8.62A1.3 1.3 0 0 1 22 16.8V21a1.3 1.3 0 0 1-1.3 1.3C10.1 22.3 1.7 13.9 1.7 3.3A1.3 1.3 0 0 1 3 2h4.2A1.3 1.3 0 0 1 8.5 3.3c0 1.3.22 2.6.62 3.8a1.5 1.5 0 0 1-.37 1.5l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13.6 20V12.8h2.4l.36-2.8H13.6V8.24c0-.8.22-1.36 1.36-1.36h1.56V4.36c-.76-.08-1.52-.12-2.28-.12-2.24 0-3.78 1.36-3.78 3.88V10H8v2.8h2.52V20h3.08Z" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 10.5v6M12 8v8.5M15.5 12.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

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

const compressImageToJpeg = (file, maxWidth = 900, quality = 0.74) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const ratio = Math.min(1, maxWidth / img.width)
        const width = Math.round(img.width * ratio)
        const height = Math.round(img.height * ratio)

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Image processing not supported in this browser.'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to optimize image.'))
              return
            }
            resolve(blob)
          },
          'image/jpeg',
          quality
        )
      }

      img.onerror = () => reject(new Error('Invalid image file.'))
      img.src = reader.result
    }

    reader.onerror = () => reject(new Error('Failed to read image.'))
    reader.readAsDataURL(file)
  })

function Section({
  id,
  title,
  subtitle,
  details,
  courses,
  policySections,
  animation,
  cta,
  className = '',
  hideDetails = false,
  showCourseBackLink = false,
}) {
  const isServices = id === 'services'
  const isCourses = id === 'courses'
  const isPolicy = id === 'policy'
  const isContactUs = id === 'contact-us'
  const hasCourseCatalog = isCourses && courses?.length
  const isFeaturedSection = isServices || isCourses || isPolicy
  const serviceDetails = (details && details.length > 0 ? details : [subtitle]).slice(0, 3)

  const sectionRef = useRef(null)
  const navigate = useNavigate()
  const [servicesVisibleCount, setServicesVisibleCount] = useState(0)

  const [selectedCourses, setSelectedCourses] = useState([])
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [formValues, setFormValues] = useState({
    fullName: '',
    address: '',
    mobile: '',
    email: '',
  })
  const [optimizedImageBlob, setOptimizedImageBlob] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [imageMeta, setImageMeta] = useState('')
  const [formStatus, setFormStatus] = useState('')
  const [isCompressingImage, setIsCompressingImage] = useState(false)

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
  const sectionBackgroundClass = 'bg-gradient-to-br from-[#f1f4ee] via-[#eaeee7] to-[#e3e8df]'

  const groupedCourseData = useMemo(() => {
    if (!hasCourseCatalog) return []

    return [0, 1, 2].map((index) => ({
      title: yearLabels[index],
      courses: courses.slice(index * 4, index * 4 + 4),
    }))
  }, [courses, hasCourseCatalog])

  const policyEntries = useMemo(() => {
    if (!isPolicy || !policySections?.length) return []

    return policySections.map((section) => ({
      ...section,
      anchor: `policy-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    }))
  }, [isPolicy, policySections])

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  useEffect(() => {
    if (!hasCourseCatalog || selectedCourses.length === 0) return
    setSelectedCourses((prev) => prev.filter((course) => courses.includes(course)))
  }, [courses, hasCourseCatalog, selectedCourses.length])

  const toggleCourseSelection = (courseName) => {
    setSelectedCourses((prev) =>
      prev.includes(courseName) ? prev.filter((name) => name !== courseName) : [...prev, courseName]
    )
  }

  const closeEnrollmentModal = () => {
    setIsEnrollModalOpen(false)
    setFormStatus('')
  }

  const openEnrollmentModal = () => {
    if (selectedCourses.length === 0) {
      setFormStatus('Please select at least one course before enrolling.')
      return
    }

    setFormStatus('')
    setIsEnrollModalOpen(true)
  }

  const handleSingleEnroll = (courseName) => {
    setSelectedCourses([courseName])
    setFormStatus('')
    setIsEnrollModalOpen(true)
  }

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/#courses')
  }

  const handleFormInput = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsCompressingImage(true)
    setFormStatus('')

    try {
      const optimizedBlob = await compressImageToJpeg(file)

      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }

      const preview = URL.createObjectURL(optimizedBlob)
      setOptimizedImageBlob(optimizedBlob)
      setImagePreviewUrl(preview)

      const originalKb = Math.max(1, Math.round(file.size / 1024))
      const optimizedKb = Math.max(1, Math.round(optimizedBlob.size / 1024))
      setImageMeta(`Image optimized: ${originalKb}KB to ${optimizedKb}KB`)
    } catch {
      setOptimizedImageBlob(null)
      setImageMeta('Could not optimize image. Please try another file.')
    } finally {
      setIsCompressingImage(false)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (!optimizedImageBlob) {
      setFormStatus('Please add a student image to complete enrollment.')
      return
    }

    setFormStatus('Enrollment submitted successfully. Our team will contact you shortly.')

    setFormValues({
      fullName: '',
      address: '',
      mobile: '',
      email: '',
    })
    setOptimizedImageBlob(null)
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl)
      setImagePreviewUrl('')
    }
    setImageMeta('')
    setSelectedCourses([])
  }

  return (
    <section
      ref={sectionRef}
      className={`section relative overflow-hidden ${sectionBackgroundClass} ${isServices ? 'min-h-[230vh] md:min-h-[255vh]' : ''} ${className}`.trim()}
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

      {isContactUs ? (
        <div className="container relative z-20">
          <Motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto w-full max-w-6xl rounded-[30px] border border-[#dbe3ef] bg-white px-6 py-7 shadow-[0_20px_45px_rgba(15,23,42,0.08)] md:px-8 md:py-8"
          >
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,1fr)] lg:items-start">
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl border border-[#e5ebf3] bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-7"
              >
                <span className="inline-flex items-center rounded-full border border-[#ead8b5] bg-[#fff8ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6b35]">
                  Need Help?
                </span>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[#16253d] sm:text-4xl">Still Have Questions?</h3>
                <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-[#475569]">
                  If you need clarification regarding any of our policies, feel free to contact our team.
                </p>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-3xl border border-[#e2e9f3] bg-[#fcfdff] p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-5"
              >
                {contactItems.map((item, idx) => (
                  <Motion.a
                    key={item.key}
                    href={item.href}
                    target={item.key === 'phone' || item.key === 'email' ? undefined : '_blank'}
                    rel={item.key === 'phone' || item.key === 'email' ? undefined : 'noreferrer'}
                    whileHover={{ y: -2 }}
                    className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] ${idx === 0 ? '' : 'border-t border-[#e9eef5]'}`}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dce6f3] bg-[#f3f7fd]">
                      <ContactIcon type={item.key} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#93a1b4]">{item.label}</p>
                      <p className="mt-1 truncate text-sm font-semibold text-[#1f2d3d] transition-colors group-hover:text-[#1f3b67] sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </Motion.a>
                ))}
              </Motion.div>
            </div>
          </Motion.div>
        </div>
      ) : isFeaturedSection ? (
        <div className={`container relative z-20 ${isServices ? 'sticky top-24 md:top-28' : ''}`}>
          <Motion.div
            className="mx-auto max-w-5xl text-center md:mx-0 md:max-w-5xl md:text-left"
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {showCourseBackLink && hasCourseCatalog ? (
              <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
                <Motion.h2
                  variants={textItem}
                  className="text-5xl font-extrabold tracking-tight text-[#1f1a17] sm:text-6xl"
                >
                  {title}
                </Motion.h2>
                <Motion.button
                  variants={textItem}
                  type="button"
                  onClick={handleBackNavigation}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center rounded-full border border-[#4d5d2f] bg-[#667c3c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5a6e35]"
                >
                  Back
                </Motion.button>
              </div>
            ) : (
              <Motion.h2
                variants={textItem}
                className={`${isServices ? '-mt-1 sm:-mt-1.5' : 'mt-1'} text-5xl font-extrabold tracking-tight text-[#1f1a17] sm:text-6xl`}
              >
                {title}
              </Motion.h2>
            )}
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
                  className="mx-auto w-full max-w-6xl"
                >
                  <Motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="mb-7 rounded-3xl border border-[#dfe5ef] bg-[#f9fbfd] px-6 py-6 shadow-[0_16px_35px_rgba(16,24,40,0.06)] md:px-8"
                  >
                    <p className="text-left text-base leading-relaxed text-[#334155]">
                      Please review our policies carefully to understand how Blackstone Law Academy operates and what students can expect.
                    </p>
                    <p className="mt-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#8b98aa]">
                      Last Updated: April 20, 2026
                    </p>
                  </Motion.div>

                  <div className="space-y-5">
                    {policyEntries.map((section, idx) => (
                      <Motion.article
                        key={section.anchor}
                        id={section.anchor}
                        initial={{ opacity: 0, y: 30, scale: 0.985 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.06 }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{ y: -4 }}
                        className="group relative overflow-hidden rounded-[28px] border border-[#dde5f0] bg-white px-6 py-6 shadow-[0_14px_35px_rgba(15,23,42,0.07)] transition-all duration-300 hover:border-[#d2deec] hover:shadow-[0_22px_42px_rgba(15,23,42,0.12)] md:px-7 md:py-7"
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c7a86b] via-[#223f69] to-[#7f98b9]"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#eff4fb] blur-2xl transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="relative flex items-start gap-3">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8e2ef] bg-[#f8fbff] text-xs font-bold text-[#223f69]">
                            {idx + 1}
                          </span>
                          <div className="w-full">
                            <h3 className="text-2xl font-semibold tracking-tight text-[#111827]">{section.title}</h3>

                            {section.paragraphs?.map((paragraph, pIdx) => (
                              <p key={`${section.title}-p-${pIdx}`} className="mt-3 text-left leading-relaxed text-[#475569]">
                                {paragraph}
                              </p>
                            ))}

                            {section.points?.length ? (
                              section.title === 'Payment & Refund Policy' ? (
                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                  {section.points.map((point) => (
                                    <div key={point} className="rounded-2xl border border-[#e1e8f2] bg-[#f9fbfe] px-4 py-3 text-sm leading-relaxed text-[#334155]">
                                      {point}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <ul className="mt-4 space-y-2 text-left leading-relaxed text-[#475569]">
                                  {section.points.map((point) => (
                                    <li key={point} className="flex items-start gap-2">
                                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1f3b67]" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              )
                            ) : null}

                            {section.note ? (
                              <div className="mt-4 rounded-2xl border border-[#f0ddbb] bg-[#fff8ec] px-4 py-3 text-sm font-medium leading-relaxed text-[#7a5a2a]">
                                {section.note}
                              </div>
                            ) : null}

                            {section.closing ? <p className="mt-3 text-left leading-relaxed text-[#475569]">{section.closing}</p> : null}
                          </div>
                        </div>
                      </Motion.article>
                    ))}
                  </div>
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

          {hasCourseCatalog ? (
            <div className="mt-8 space-y-8">
              <Motion.article
                variants={textItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-[24px] border border-[#d3ddd2] bg-white/90 p-6 shadow-[0_14px_35px_rgba(27,39,31,0.08)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d7c6f]">Enrollment Overview</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#1f2822]">Choose single or multiple courses</h3>
                    <p className="mt-2 max-w-[66ch] text-[#4a5a4f]">
                      Course duration is fixed at <span className="font-semibold text-[#1f2822]">4 months</span>. You can enroll in one course or combine multiple courses in one submission.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {enrollmentPackages.map((pkg) => (
                    <div key={pkg.count} className="rounded-2xl border border-[#dbe3dc] bg-[#f9fbf8] p-4">
                      <p className="text-sm font-semibold text-[#4d5b50]">{pkg.count} Course{pkg.count > 1 ? 's' : ''}</p>
                      <p className="mt-1 text-2xl font-bold text-[#1f2822]">{pkg.fee} BDT</p>
                      <p className="mt-1 text-xs text-[#6f7d72]">{pkg.note}</p>
                    </div>
                  ))}
                </div>

                {formStatus && !isEnrollModalOpen ? (
                  <p className="mt-4 rounded-xl bg-[#eef5ef] px-4 py-2 text-sm font-medium text-[#2f4a35]">{formStatus}</p>
                ) : null}
              </Motion.article>

              {groupedCourseData.map((group) => (
                <Motion.div
                  key={group.title}
                  variants={textContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="mb-4 text-2xl font-semibold tracking-tight text-[#1f2822]">{group.title}</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.courses.map((courseName) => {
                      const selected = selectedCourses.includes(courseName)
                      return (
                        <Motion.article
                          key={courseName}
                          variants={textItem}
                          className="group overflow-hidden rounded-[18px] border border-[#d6ddd4] bg-white/92 shadow-[0_12px_30px_rgba(26,34,28,0.09)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c4d0c0] hover:shadow-[0_18px_38px_rgba(26,34,28,0.14)]"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <CourseImage courseName={courseName} />
                          </div>
                          <div className="px-5 py-5">
                            <h4 className="text-[1.02rem] font-semibold tracking-tight text-[#1f2822]">{courseName}</h4>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleCourseSelection(courseName)}
                                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${selected ? 'border-[#2b4733] bg-[#2b4733] text-white' : 'border-[#2b4733]/20 bg-white text-[#2b4733] hover:bg-[#f1f6f2]'}`}
                              >
                                {selected ? 'Selected' : 'Add to Selection'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleSingleEnroll(courseName)}
                                className="inline-flex items-center rounded-full bg-[#2f3c33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#243028]"
                              >
                                Enroll
                              </button>
                            </div>

                            <p className="mt-4 text-right text-xs font-semibold tracking-wide text-[#6b7a6f]">2000BDT/month</p>
                          </div>
                        </Motion.article>
                      )
                    })}
                  </div>
                </Motion.div>
              ))}
            </div>
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

      {isEnrollModalOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#0f1612]/60 backdrop-blur-[2px]"
            aria-label="Close enrollment form"
            onClick={closeEnrollmentModal}
          />

          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-[#d8e1da] bg-white p-6 shadow-[0_24px_60px_rgba(13,26,20,0.25)] md:p-8"
          >
            <button
              type="button"
              onClick={closeEnrollmentModal}
              className="absolute right-4 top-4 rounded-full border border-black bg-black px-3 py-1 text-xs font-semibold text-white"
            >
              Close
            </button>

            <h3 className="text-center text-3xl font-semibold tracking-tight text-[#1d2721]">Course Enrollment Form</h3>
            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#5a6a5e]">Duration: 4 Months</p>
            <p className="mt-4 text-center text-sm leading-relaxed text-[#5f6d62]">
              Complete the form below to confirm your seat. You can submit for single or multiple selected courses in one request.
            </p>

            <div className="mt-5 rounded-2xl border border-[#dee7e0] bg-[#f7faf8] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5f6d62]">Selected Courses</p>
              <p className="mt-2 text-sm text-[#2b392f]">{selectedCourses.join(' | ')}</p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-[#2f3d33]">
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formValues.fullName}
                    onChange={handleFormInput}
                    className="mt-1 w-full rounded-xl border border-[#d4ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6b8f76] focus:ring-2 focus:ring-[#dce9df]"
                    placeholder="Enter student full name"
                  />
                </label>

                <label className="text-sm font-semibold text-[#2f3d33]">
                  Mobile No
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formValues.mobile}
                    onChange={handleFormInput}
                    className="mt-1 w-full rounded-xl border border-[#d4ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6b8f76] focus:ring-2 focus:ring-[#dce9df]"
                    placeholder="e.g. 01XXXXXXXXX"
                  />
                </label>
              </div>

              <label className="block text-sm font-semibold text-[#2f3d33]">
                Address
                <input
                  type="text"
                  name="address"
                  required
                  value={formValues.address}
                  onChange={handleFormInput}
                  className="mt-1 w-full rounded-xl border border-[#d4ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6b8f76] focus:ring-2 focus:ring-[#dce9df]"
                  placeholder="Enter full address"
                />
              </label>

              <label className="block text-sm font-semibold text-[#2f3d33]">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={formValues.email}
                  onChange={handleFormInput}
                  className="mt-1 w-full rounded-xl border border-[#d4ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6b8f76] focus:ring-2 focus:ring-[#dce9df]"
                  placeholder="name@email.com"
                />
              </label>

              <label className="block text-sm font-semibold text-[#2f3d33]">
                Add Student Image
                <input
                  type="file"
                  name="studentImage"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="mt-1 block w-full rounded-xl border border-[#d4ddd6] bg-white px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#2f3c33] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
                />
                {isCompressingImage ? <p className="mt-1 text-xs text-[#4e6a57]">Optimizing image...</p> : null}
                {imageMeta ? <p className="mt-1 text-xs text-[#4e6a57]">{imageMeta}</p> : null}
              </label>

              {imagePreviewUrl ? (
                <div className="rounded-2xl border border-[#dbe3dd] bg-[#fbfdfb] p-3">
                  <img src={imagePreviewUrl} alt="Student preview" className="mx-auto max-h-48 rounded-xl object-cover" />
                </div>
              ) : null}

              {formStatus ? (
                <p className="rounded-xl bg-[#eef6f0] px-4 py-2 text-sm font-medium text-[#2f4a35]">{formStatus}</p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#1f2822] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#151d18]"
              >
                Submit Enrollment
              </button>
            </form>
          </Motion.div>
        </div>
      ) : null}

      {hasCourseCatalog ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-[110] sm:bottom-6 sm:right-6">
          <Motion.button
            type="button"
            onClick={openEnrollmentModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#41522a] bg-[#5f7538] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(32,43,20,0.32)] transition-colors hover:bg-[#536730] disabled:cursor-not-allowed disabled:border-[#8f9c7b] disabled:bg-[#9aa99d]"
            disabled={selectedCourses.length === 0}
          >
            Enroll Selected ({selectedCourses.length})
          </Motion.button>
        </div>
      ) : null}
    </section>
  )
}

export default Section
