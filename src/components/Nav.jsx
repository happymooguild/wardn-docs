import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToId } from '../lib/scroll'
import { GITHUB_URL } from '../lib/config'

const SECTIONS = [
  { id: 'detection', label: 'How it works' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'architecture', label: 'Architecture' },
]

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const gh = useMagnetic(0.2)

  const onHome = location.pathname === '/'

  function goSection(id) {
    setOpen(false)
    if (onHome) {
      scrollToId(id)
    } else {
      // Jump home, then let Home scroll once it has mounted the section.
      navigate('/', { state: { scrollTo: id } })
    }
  }

  function goHome() {
    setOpen(false)
    navigate('/')
    window.scrollTo({ top: 0 })
  }

  return (
    <nav className="nav">
      <button className="nav-brand" onClick={goHome} aria-label="wardn home">
        <Logo size={30} />
        <span className="wordmark">wardn</span>
      </button>

      <button
        className="nav-menu-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? '✕' : '☰'}
      </button>

      <div className={`nav-links${open ? ' open' : ''}`}>
        {SECTIONS.map((s) => (
          <button key={s.id} className="nav-link" onClick={() => goSection(s.id)}>
            {s.label}
          </button>
        ))}
        <button
          className="nav-link"
          onClick={() => {
            setOpen(false)
            navigate('/docs')
            window.scrollTo({ top: 0 })
          }}
        >
          Docs
        </button>
        <motion.a
          ref={gh.ref}
          style={gh.style}
          onMouseMove={gh.onMouseMove}
          onMouseLeave={gh.onMouseLeave}
          className="btn nav-cta"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </motion.a>
      </div>
    </nav>
  )
}
