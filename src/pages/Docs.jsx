import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CopyButton from '../components/CopyButton'
import { scrollToId } from '../lib/scroll'
import { GITOPS_YAML } from '../lib/config'

const NAV = [
  ['doc-overview', 'Overview'],
  ['doc-quickstart', 'Quickstart'],
  ['doc-marker', 'Marker API'],
  ['doc-deploy', 'Deploy integrations'],
  ['doc-metrics', 'Metrics abstraction'],
  ['doc-ai', 'AI reasoning'],
  ['doc-auth', 'Auth & RBAC'],
  ['doc-data', 'Data model'],
  ['doc-rollback', 'Rollback'],
]

const MARKER_PAYLOAD = `Authorization: Bearer <per-app API key>

{
  "app": "checkout-service",
  "version": "a1b2c3d",
  "environment": "production",
  "timestamp": "2026-07-19T10:15:00Z"
}`

const GO_INTERFACE = `type MetricsProvider interface {
    Query(ctx context.Context, promql string,
          start, end time.Time) (Series, error)
}`

const DATA_MODEL = [
  ['deploy_events', 'One row per marker: app, version, previous_version, source'],
  ['metric_snapshots', 'Before/after query results per event (JSONB)'],
  ['analyses', 'LLM prompt + response per regression'],
  ['metric_definitions', 'Admin-managed PromQL query templates, per backend'],
  ['users · roles', 'Auth and RBAC (admin / member)'],
]

export default function Docs() {
  const navigate = useNavigate()
  const [active, setActive] = useState('doc-overview')

  // Scroll-spy: highlight the sidebar link for the section in view.
  useEffect(() => {
    const ids = NAV.map(([id]) => id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <motion.main
      data-screen="docs"
      className="docs"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <aside className="docs-aside">
        <button
          className="nav-link"
          onClick={() => {
            navigate('/')
            window.scrollTo({ top: 0 })
          }}
          style={{ fontSize: 13, marginBottom: 12, paddingLeft: 12, textAlign: 'left' }}
        >
          ← Back to site
        </button>
        <span className="kicker">DOCUMENTATION</span>
        {NAV.map(([id, label]) => (
          <button
            key={id}
            className={`doclink${active === id ? ' active' : ''}`}
            onClick={() => scrollToId(id)}
          >
            {label}
          </button>
        ))}
      </aside>

      <div className="docs-body">
        <div id="doc-overview">
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Overview
          </div>
          <h1>wardn</h1>
          <p>
            wardn answers one question every alerting stack leaves open:{' '}
            <span style={{ color: 'var(--text)' }}>did this deploy make things worse?</span> It
            detects when a new version goes live, compares the metrics that matter from
            immediately before and after, and — if a real regression appears — can explain why.
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            It works regardless of how you deploy, doesn't require cluster access, and treats the
            metrics backend as the source of truth — storing only sparse before/after snapshots
            itself.
          </p>
        </div>

        <div id="doc-quickstart">
          <h2>Quickstart</h2>
          <ol>
            <li>
              An admin registers your app in the dashboard — this generates an API key, shown
              once, bound to that app + environment.
            </li>
            <li>
              Drop the key where your deploy path needs it: a CI secret, or a Kubernetes{' '}
              <span className="mono" style={{ color: 'var(--accent)' }}>Secret</span> for ArgoCD.
            </li>
            <li>
              Send one{' '}
              <span className="mono" style={{ color: 'var(--accent)' }}>
                POST /api/v1/deployments
              </span>{' '}
              the moment a version is confirmed healthy.
            </li>
            <li>Open the dashboard — before/after graphs appear from the second deploy onward.</li>
          </ol>
        </div>

        <div id="doc-marker">
          <h2>Marker API</h2>
          <p>
            The single source of truth for "a deploy happened." wardn infers{' '}
            <span className="mono">previous_version</span> from the last recorded marker — the
            caller never sends it.
          </p>
          <div className="code-head">
            <span className="file">POST /api/v1/deployments</span>
            <CopyButton text={MARKER_PAYLOAD} />
          </div>
          <pre className="code-block">{MARKER_PAYLOAD}</pre>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['auth', <>Per-app key, checked <em>and scoped</em> — the key's bound app must match the <span className="mono">app</span> in the body, or 403.</>],
              ['idem', <>Dedupe on <span className="mono">(app, version, timestamp)</span> — ArgoCD retries won't create duplicate events.</>],
              ['valid', <>Malformed payloads fail loud with a 4xx; caller timestamps are sanity-checked against server time.</>],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12 }}>
                <span className="mono" style={{ color: 'var(--accent)', fontSize: 13, flexShrink: 0 }}>
                  {k}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="doc-deploy">
          <h2>Deploy integrations</h2>
          <p>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>Direct CI.</span> One curl at
            the end of your pipeline, gated behind a blocking health check. CI already has the
            credentials and runs the deploy.
          </p>
          <p>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>GitOps.</span> CI's job ends at
            the commit — ArgoCD sees the rollout. Its Notifications controller becomes the caller
            via a <span className="mono" style={{ color: 'var(--accent)' }}>ConfigMap</span>. Flux
            follows the same pattern via its notification-controller.
          </p>
          <div className="code-head">
            <span className="file">argocd-notifications-cm.yaml</span>
            <CopyButton text={GITOPS_YAML} />
          </div>
          <pre className="code-block" style={{ fontSize: 12.5, lineHeight: 1.7 }}>
            {GITOPS_YAML}
          </pre>
        </div>

        <div id="doc-metrics">
          <h2>Metrics abstraction</h2>
          <p>
            One PromQL-over-HTTP implementation, pointed at whichever backend the app config names.
            SigNoz first; Prometheus and OpenObserve slot in behind the same interface.
          </p>
          <pre className="code-block" style={{ borderRadius: 12, lineHeight: 1.7 }}>
            {GO_INTERFACE}
          </pre>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 14 }}>
            Assumption to verify before building on it: confirm SigNoz's query API is genuinely
            PromQL-compatible — don't assume, check.
          </p>
        </div>

        <div id="doc-ai">
          <h2>AI reasoning</h2>
          <p style={{ marginBottom: 0 }}>
            Triggered only when the before/after diff crosses a configured threshold — not on every
            deploy, to keep calls cheap and relevant. Given the metrics, logs, and traces for the
            same windows, the model points at a likely cause rather than restating the delta. Scoped
            to SigNoz-sourced logs and traces for now, and opt-in per app.
          </p>
        </div>

        <div id="doc-auth">
          <h2>Auth &amp; RBAC</h2>
          <p>
            An Ingress-fronted dashboard, GitHub OAuth or basic email/password for the demo, with
            the interface designed so OIDC (Keycloak / Okta / Google) is a swap-in later, not a
            rewrite.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              ['admin', 'Manage users, define metric sources, build org-wide dashboards.'],
              ['member', 'View, and build personal dashboards from the metric library.'],
            ].map(([role, desc]) => (
              <div
                key={role}
                className="card"
                style={{ flex: 1, minWidth: 220, borderRadius: 12, padding: 18 }}
              >
                <div className="mono" style={{ color: 'var(--accent)', fontSize: 12, marginBottom: 6 }}>
                  {role}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.6 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="doc-data">
          <h2>Data model</h2>
          <p>
            Postgres — not SQLite (outgrown once auth + RBAC entered scope) and not ClickHouse
            (wardn stores sparse snapshots, not raw time series).
          </p>
          <div className="dm-table">
            {DATA_MODEL.map(([key, val]) => (
              <div className="dm-row" key={key}>
                <div className="dm-key mono">{key}</div>
                <div className="dm-val">{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="doc-rollback">
          <h2>
            Rollback <span className="tag-todo">TODO</span>
          </h2>
          <p>
            Not yet designed — deliberately. One thing is settled:{' '}
            <span style={{ color: 'var(--text)' }}>wardn will never have direct cluster access</span>,
            however this ends up working.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 15.5, marginBottom: 0 }}>
            Ruled out so far: assuming every team has a CI rollback job (not universal), and plain{' '}
            <span className="mono">git revert</span> for GitOps (breaks on later commits, still
            needs a merged PR). Directions worth exploring: redeploy-forward with{' '}
            <span className="mono">previous_version</span>, direct image-tag overwrite, and possibly
            two honest tiers — fully-auto where an auto-merge path exists, PR-with-a-ping where it
            doesn't. Comes back for its own discussion before anyone builds it.
          </p>
        </div>
      </div>
    </motion.main>
  )
}
