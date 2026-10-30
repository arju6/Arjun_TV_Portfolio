import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Qualifications', '#qualifications'],
  ['Projects', '#projects'],
  ['Certificates', '#certificates'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const sectionIds = ['home', 'about', 'qualifications', 'projects', 'certificates', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140

      // If at or near the bottom of the page, activate Contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveId('contact')
        return
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
      window.history.pushState(null, '', href)
    }
  }

  return (
    <>
      <header className="site-nav">
        <a className="brand" href="#home" onClick={(e) => handleNavClick(e, '#home')}>
          ARJUN T V
        </a>
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
          {links.map(([label, href]) => {
            const id = href.replace('#', '')
            const isActive = activeId === id
            return (
              <a
                key={href}
                className={isActive ? 'active' : ''}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            )
          })}
        </nav>
      </header>
      {open && (
        <div
          className="nav-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
