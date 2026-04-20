import Section from '../components/Section'

const sectionFadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true },
}

const lawCourses = [
  'Public Law',
  'Legal System & Method',
  'Contract Law',
  'Criminal Law',
  'European Union Law',
  'Tort Law',
  'Property Law',
  'Administrative Law',
  'Company Law',
  'Jurisprudence',
  'Trust Law',
  'Islamic Law',
]

function CoursesPage() {
  return (
    <main>
      <Section
        id="courses"
        title="Enroll Courses"
        subtitle="Pick your preferred law subjects and complete one professional enrollment form for single or multiple courses."
        details={[
          'Build a clear legal foundation with guided, practical learning designed for exam performance and academic growth.',
          'Every course follows a structured 4-month track with affordable package options for multi-course enrollment.',
        ]}
        courses={lawCourses}
        animation={sectionFadeUp}
        showCourseBackLink
      />
    </main>
  )
}

export default CoursesPage
