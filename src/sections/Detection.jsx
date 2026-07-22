import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import CopyButton from '../components/CopyButton'
import { GITOPS_YAML } from '../lib/config'

const PAYLOAD = `Authorization: Bearer <per-app API key>
Content-Type: application/json

{
  "app": "checkout-service",
  "version": "a1b2c3d",
  "environment": "production",
  "timestamp": "2026-07-19T10:15:00Z"
}`

const CI_YAML = `# after rollout is confirmed healthy
curl -fsS -X POST "$WARDN_URL/api/v1/deployments" \\
  -H "Authorization: Bearer $WARDN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d "{\\"app\\":\\"checkout-service\\",
       \\"version\\":\\"$CI_COMMIT_SHORT_SHA\\",
       \\"environment\\":\\"production\\",
       \\"timestamp\\":\\"$(date -u +%FT%TZ)\\"}"`

export default function Detection() {
  const [tab, setTab] = useState('ci')

  return (
    <section id="detection" className="container" style={{ padding: '60px 40px' }}>
      <Reveal className="eyebrow">Detection</Reveal>
      <Reveal as="h2" className="section-title" style={{ margin: '0 0 14px' }} delay={0.05}>
        One endpoint. However you deploy.
      </Reveal>
      <Reveal as="p" className="detect-lead" delay={0.08}>
        The single source of truth for "a deploy happened" is one call. wardn
        doesn't care who makes it — only that the caller can vouch the version is
        live and healthy. It infers the previous version itself.
      </Reveal>

      <div className="detect-grid">
        <Reveal className="detect-col" delay={0.05}>
          <div className="code-head">
            <span className="file">POST /api/v1/deployments</span>
            <CopyButton text={PAYLOAD} />
          </div>
          <pre className="code-block">{PAYLOAD}</pre>
          <p className="detect-note">
            <span className="hl">previous_version</span> is never sent — wardn
            reads the last marker for that app. Smaller payload, no logic to
            duplicate per caller.
          </p>
        </Reveal>

        <Reveal className="detect-col" delay={0.12}>
          <div className="tabs" role="tablist">
            <button
              className={`tab${tab === 'ci' ? ' active' : ''}`}
              onClick={() => setTab('ci')}
              role="tab"
              aria-selected={tab === 'ci'}
            >
              Direct CI
            </button>
            <button
              className={`tab${tab === 'gitops' ? ' active' : ''}`}
              onClick={() => setTab('gitops')}
              role="tab"
              aria-selected={tab === 'gitops'}
            >
              GitOps · ArgoCD
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 'ci' ? (
                <>
                  <p>
                    CI already has cluster creds and runs the deploy. The only new
                    step is one <span className="hl">curl</span> at the end, gated
                    behind a blocking health check.
                  </p>
                  <div className="code-head">
                    <span className="file">.gitlab-ci.yml · deploy stage</span>
                    <CopyButton text={CI_YAML} />
                  </div>
                  <pre className="code-block" style={{ fontSize: 12.5, lineHeight: 1.7 }}>
                    {CI_YAML}
                  </pre>
                </>
              ) : (
                <>
                  <p>
                    CI's job ends at the commit — ArgoCD sees the real rollout. So
                    ArgoCD's Notifications controller is the caller. Config, not
                    code.
                  </p>
                  <div className="code-head">
                    <span className="file">argocd-notifications-cm.yaml</span>
                    <CopyButton text={GITOPS_YAML} />
                  </div>
                  <pre className="code-block" style={{ fontSize: 12.5, lineHeight: 1.7 }}>
                    {GITOPS_YAML}
                  </pre>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
