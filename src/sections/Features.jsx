import Reveal from '../components/Reveal'

const FEATURES = [
  {
    title: 'Auto-detect deploys',
    text: 'The moment a new version is live and healthy — raw CI or GitOps, same endpoint.',
  },
  {
    title: 'Before / after graphs',
    text: 'Purpose-built comparison per metric, plus every version plotted on one labeled timeline.',
  },
  {
    title: 'AI explains why',
    text: 'When a real regression is found, reason over logs and traces to point at a likely cause.',
  },
  {
    title: 'Flexible alerting',
    text: 'Slack, custom webhook, email — configurable per metric. More integrations to come.',
  },
  {
    title: 'Backend-agnostic',
    text: 'SigNoz first; Prometheus & OpenObserve as extensions behind one PromQL interface.',
  },
  {
    title: 'Observes itself',
    text: 'wardn emits its own OTel traces and logs into the same stack it’s watching.',
  },
]

export default function Features() {
  return (
    <section className="container" style={{ padding: '74px 40px' }}>
      <Reveal className="eyebrow">What it does</Reveal>
      <Reveal as="h2" className="section-title" style={{ margin: '0 0 34px' }} delay={0.05}>
        Everything, from the moment a version goes live.
      </Reveal>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <Reveal className="card card-hover feature-card" key={f.title} delay={(i % 3) * 0.07}>
            <div className="feature-title">{f.title}</div>
            <div className="feature-text">{f.text}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
