import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Who We Are', to: '/#who-we-are' },
  { label: 'Services', to: '/#services' },
  { label: 'Courses', to: '/courses' },
  { label: 'Policy', to: '/#policy' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact Us', to: '/#contact-us' },
]

function Navbar() {
  return (
    <header className="navbar" id="top">
      <div className="container navbar-inner">
        <Link className="logo" to="/">
          Blackstone Law Academy
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
