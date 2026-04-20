import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Who We Are', to: '/#who-we-are' },
  { label: 'Services', to: '/#services' },
  { label: 'Courses', to: '/#courses' },
  { label: 'Policy', to: '/#policy' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact Us', to: '/#contact-us' },
]

function Footer() {
  return (
    <footer className="footer">
      <Motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <p className="footer-brand">
          <img src="/company-logo.jpg" alt="Blackstone Law Academy logo" className="footer-logo" />
          Blackstone Law Academy
        </p>
        <nav aria-label="Footer links">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </Motion.div>
    </footer>
  )
}

export default Footer
