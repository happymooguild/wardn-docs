import Reveal from '../components/Reveal'
import Logo from '../components/Logo'

export default function Architecture() {
  return (
    <section id="architecture" className="band" style={{ padding: '74px 0' }}>
      <div className="container container-narrow">
        <Reveal className="eyebrow">Architecture</Reveal>
        <Reveal as="h2" className="section-title" style={{ margin: '0 0 34px' }} delay={0.05}>
          One chart, a few moving parts.
        </Reveal>

        <Reveal className="arch" delay={0.05}>
          {/* triggers */}
          <div className="arch-triggers">
            <span className="label">DEPLOY TRIGGERS · PICK ONE PER TEAM</span>
            <div className="arch-trigger-row">
              <div className="arch-node">
                <div className="t">CI pipeline</div>
                <div className="s">direct kubectl / helm</div>
              </div>
              <div className="arch-node">
                <div className="t">ArgoCD Notifications</div>
                <div className="s">GitOps · on Synced + Healthy</div>
              </div>
            </div>
          </div>
          <div className="arch-arrow">↓</div>
          <span className="arch-caption">POST /api/v1/deployments</span>

          {/* wardn box */}
          <div className="arch-wardn">
            <div className="arch-wardn-head">
              <Logo size={20} />
              <span>wardn</span>
            </div>
            <div className="arch-flow">
              <div className="arch-node">
                <div className="t">Marker API</div>
                <div className="s">auth · idempotency</div>
              </div>
              <div className="arch-inline-arrow">→</div>
              <div className="arch-node">
                <div className="t">Analyzer</div>
                <div className="s">before/after query</div>
              </div>
              <div className="arch-inline-arrow">→</div>
              <div className="arch-node">
                <div className="t">Dashboard / API</div>
                <div className="s">Ingress + Auth</div>
              </div>
            </div>
          </div>
          <div className="arch-arrow">↓</div>

          {/* integrations */}
          <div className="arch-integrations">
            <div className="arch-node">
              <div className="t">Metrics backend</div>
              <div className="s">SigNoz / Prom / OO</div>
            </div>
            <div className="arch-node">
              <div className="t">Logs &amp; traces</div>
              <div className="s">SigNoz</div>
            </div>
            <div className="arch-node accent">
              <div className="t">LLM root-cause</div>
              <div className="s">opt-in per app</div>
            </div>
            <div className="arch-node">
              <div className="t">Alerting</div>
              <div className="s">Slack · webhook · email</div>
            </div>
          </div>
          <div className="arch-arrow">↕</div>

          {/* postgres */}
          <div className="card arch-postgres">
            <div className="t" style={{ color: 'var(--text)', fontSize: 14, fontWeight: 600 }}>
              Postgres
            </div>
            <div className="s mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              deploy events · metric snapshots · analyses · RBAC · alert configs
            </div>
          </div>

          <div className="pill arch-note">
            wardn never has direct cluster access — it only reads.
          </div>
        </Reveal>
      </div>
    </section>
  )
}
