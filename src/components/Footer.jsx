import { motion as Motion } from 'framer-motion'

const links = ['Company', 'Services', 'Policy', 'Contact']

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
        <p>Blackstone Law Academy</p>
        <nav aria-label="Footer links">
          {links.map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </nav>
      </Motion.div>
    </footer>
  )
}

export default Footer
