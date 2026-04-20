import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Who We Are', to: '/#who-we-are' },
  { label: 'Services', to: '/#services' },
  { label: 'Courses', to: '/#courses' },
  { label: 'Policy', to: '/#policy' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact Us', to: '/#contact-us' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar" id="top">
      <div className="container navbar-inner">
        <Link className="logo" to="/">
          <img src="/company-logo.jpg" alt="Blackstone Law Academy logo" className="logo-image" />
          Blackstone Law Academy
        </Link>

        <div className="discount-marquee" aria-label="Course discount announcement">
          <div className="discount-marquee-track">
            <span>
              Course Discount Running Now - Enroll 3 Courses for 16.7% Discount - Enroll 4 Courses for 25% Discount
            </span>
          </div>
        </div>

        <div className="menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle page shortcuts menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="menu-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          {isMenuOpen ? (
            <nav className="nav-links" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={closeMenu}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Navbar
