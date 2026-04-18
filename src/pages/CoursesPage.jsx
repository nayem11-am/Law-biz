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
        subtitle=""
        courses={lawCourses}
        hideDetails
        animation={sectionFadeUp}
      />
    </main>
  )
}

export default CoursesPage
