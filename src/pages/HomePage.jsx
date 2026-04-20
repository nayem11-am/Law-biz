import Hero from '../components/Hero'
import Section from '../components/Section'
import WhoWeAre from '../components/WhoWeAre'
import Reviews from '../components/Reviews'

const sectionFadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true },
}

const policySections = [
  {
    title: 'Educational Disclaimer',
    paragraphs: ['Blackstone Law Academy provides educational content for learning and guidance purposes only. We do not offer official legal advice, and our materials should not be relied upon as a substitute for professional legal consultation or formal university instruction.'],
  },
  {
    title: 'Academic Integrity',
    paragraphs: ['We are committed to maintaining high academic standards.'],
    points: [
      'Use our materials for learning purposes only',
      'Avoid plagiarism or academic misconduct',
      'Do not submit our content as your own in university assessments',
    ],
    note: 'Blackstone Law Academy does not support or promote any form of academic dishonesty.',
  },
  {
    title: 'Payment & Refund Policy',
    points: [
      'All course fees must be paid in advance',
      'Fees are non-refundable once access to materials or classes has been granted',
      'Exceptions may apply in special circumstances at our discretion',
    ],
  },
  {
    title: 'Privacy Policy',
    paragraphs: ['We respect the privacy of our students and users.'],
    points: [
      'Personal information such as name, email, or contact details will be kept confidential',
      'Information will not be shared with third parties without consent',
      'Information will only be used for educational and communication purposes',
    ],
  },
  {
    title: 'Policy Updates',
    paragraphs: ['We reserve the right to update or modify these policies at any time. Users are encouraged to review this section periodically.'],
  },
]

function HomePage() {
  return (
    <main>
      <Hero />

      <WhoWeAre />

      <Section
        id="services"
        title="Services"
        subtitle="We offer a comprehensive Crash Course for University of London (UK) Law, designed to build a strong academic foundation and guide you toward becoming a future barrister. Our program emphasizes clarity, strategy, and exam success, ensuring that students not only understand legal principles but can also apply them effectively in exams. We provide regular mock tests to track progress, strengthen exam techniques, and build confidence under timed conditions. In addition, our selective chapter-based preparation helps students focus on the most important and high-yield topics, making study time more efficient and results-driven. Most importantly, our concept-focused learning approach ensures a deep and practical understanding of each subject, rather than relying on memorization. This balanced method of structured guidance, targeted practice, and clear conceptual learning makes our course an ideal choice for students aiming to excel in their law exams and move confidently toward a successful legal career."
        details={[
          'We offer a comprehensive Crash Course for University of London (UK) Law, designed to build a strong academic foundation and guide you toward becoming a future barrister. Our program emphasizes clarity, strategy, and exam success, ensuring that students not only understand legal principles but can also apply them effectively in exams.',
          'We provide regular mock tests to track progress, strengthen exam techniques, and build confidence under timed conditions. In addition, our selective chapter-based preparation helps students focus on the most important and high-yield topics, making study time more efficient and results-driven.',
          'Most importantly, our concept-focused learning approach ensures a deep and practical understanding of each subject, rather than relying on memorization. This balanced method of structured guidance, targeted practice, and clear conceptual learning makes our course an ideal choice for students aiming to excel in their law exams and move confidently toward a successful legal career.',
        ]}
        animation={sectionFadeUp}
      />

      <Section
        id="courses"
        title="Courses"
        subtitle="This program is structured to guide students through a progressive journey of legal education. It begins by introducing the essential building blocks of legal study, helping learners develop a clear understanding of how legal systems function and how legal reasoning is formed from the ground up. As students advance, they begin to engage with more complex and structured areas of law, gaining insight into how legal principles operate in broader and more applied contexts. In the final stage, the focus shifts toward advanced legal understanding, encouraging deeper analysis, critical thinking, and preparation for professional legal practice and higher-level legal reasoning."
        details={[
          'This program is structured to guide students through a progressive journey of legal education. It begins by introducing the essential building blocks of legal study, helping learners develop a clear understanding of how legal systems function and how legal reasoning is formed from the ground up.',
          'As students advance, they begin to engage with more complex and structured areas of law, gaining insight into how legal principles operate in broader and more applied contexts.',
          'In the final stage, the focus shifts toward advanced legal understanding, encouraging deeper analysis, critical thinking, and preparation for professional legal practice and higher-level legal reasoning.',
        ]}
        cta={{ label: 'View Courses', href: '/courses' }}
        animation={sectionFadeUp}
      />

      <Section
        id="policy"
        title="Policies & Guidelines"
        subtitle="Please review our policies carefully to understand how Blackstone Law Academy operates and what students can expect."
        policySections={policySections}
        animation={sectionFadeUp}
      />

      <Reviews />

      <Section
        id="contact-us"
        title="Contact Us"
        subtitle="Have questions about admissions, classes, or mentorship? Reach out to Blackstone Law Academy and our team will get back to you shortly with the right guidance."
        animation={sectionFadeUp}
        cta={{ label: 'Email Our Team', href: 'mailto:contact@blackstonelawacademy.com' }}
      />
    </main>
  )
}

export default HomePage
