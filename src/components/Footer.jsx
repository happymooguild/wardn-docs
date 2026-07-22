import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { scrollToId } from '../lib/scroll'
import { GITHUB_URL } from '../lib/config'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function goArchitecture() {
    if (location.pathname === '/') scrollToId('architecture')
    else navigate('/', { state: { scrollTo: 'architecture' } })
  }

  return (
    <footer className="footer">
      <div className="brand">
        <Logo size={24} />
        <span>wardn</span>
      </div>
      <div className="links">
        <button className="nav-link" onClick={() => navigate('/docs')}>
          Docs
        </button>
        <button className="nav-link" onClick={goArchitecture}>
          Architecture
        </button>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ color: 'var(--text-dim)' }}>
          GitHub
        </a>
      </div>
      <span className="built">Built for the hackathon · 2026</span>
    </footer>
  )
}
