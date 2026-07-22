import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import { useMagnetic } from '../hooks/useMagnetic'
import { GITHUB_URL } from '../lib/config'

export default function CTA() {
  const navigate = useNavigate()
  const docsBtn = useMagnetic(0.2)

  return (
    <section className="container cta">
      <Reveal className="cta-box">
        <Logo size={46} />
        <h2>Stop guessing at customer experience.</h2>
        <p>One endpoint to wire up. Before/after on every deploy, from the first one.</p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 6 }}>
          <motion.button
            ref={docsBtn.ref}
            style={docsBtn.style}
            onMouseMove={docsBtn.onMouseMove}
            onMouseLeave={docsBtn.onMouseLeave}
            className="btn btn-primary"
            onClick={() => {
              navigate('/docs')
              window.scrollTo({ top: 0 })
            }}
          >
            Read the docs
          </motion.button>
          <a className="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}
