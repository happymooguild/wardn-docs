import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HeroChart } from '../components/charts'
import { useMagnetic } from '../hooks/useMagnetic'
import { GITHUB_URL } from '../lib/config'

const FACTS = [
  { k: 'CI & GitOps', v: 'works however you deploy' },
  { k: 'Before / after', v: 'every version, every metric' },
  { k: 'AI root-cause', v: 'why, not just what' },
  { k: 'No cluster access', v: 'it only reads, never touches' },
]

// Staggered entrance for the hero copy - each line lifts in just after the
// one above it, so the headline reads as a deliberate reveal, not a dump.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const navigate = useNavigate()
  const docsBtn = useMagnetic(0.18)

  return (
    <section id="product" className="container container-wide hero">
      <div className="hero-grid">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
          <motion.span className="pill" variants={item}>
            Deploy-aware observability
          </motion.span>
          <motion.h1 className="hero-h1" variants={item}>
            Did that deploy make things <span className="accent">worse</span>?
          </motion.h1>
          <motion.p className="hero-sub" variants={item}>
            Alerts fire when things are already broken. wardn catches the quiet
            regression - 10ms slower, 1% more errors - by comparing every version
            against the one before it, automatically.
          </motion.p>
          <motion.div className="hero-actions" variants={item}>
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
              View on GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="hero-card-head">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className="svc">checkout-service</span>
              <span className="sha">7f3a1c → a1b2c3d</span>
            </div>
            <span className="badge-regression">REGRESSION</span>
          </div>
          <HeroChart />
          <div className="stat-grid">
            <div className="stat-tile">
              <span className="stat-label">P99 LATENCY</span>
              <div className="stat-value-row">
                <span className="stat-value" style={{ fontSize: 22 }}>
                  218ms
                </span>
                <span className="stat-delta up">▲ 34%</span>
              </div>
            </div>
            <div className="stat-tile">
              <span className="stat-label">ERROR RATE</span>
              <div className="stat-value-row">
                <span className="stat-value" style={{ fontSize: 22 }}>
                  1.8%
                </span>
                <span className="stat-delta up">▲ 0.9pt</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-facts">
        {FACTS.map((f) => (
          <div className="fact" key={f.k}>
            <span className="k">{f.k}</span>
            <span className="v">{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
