import Reveal from '../components/Reveal'
import { Sparkline, TimelineChart } from '../components/charts'

const METRICS = [
  {
    label: 'P99 LATENCY',
    delta: '▲ 34%',
    deltaClass: 'up',
    value: '218ms',
    was: 'was 163ms',
    before: '0,42 36,40 72,44 110,42',
    after: '110,42 148,32 184,26 220,16',
    afterColor: 'var(--danger)',
  },
  {
    label: 'ERROR RATE',
    delta: '▲ 0.9pt',
    deltaClass: 'up',
    value: '1.8%',
    was: 'was 0.9%',
    before: '0,46 36,45 72,47 110,46',
    after: '110,46 148,40 184,30 220,22',
    afterColor: 'var(--danger)',
  },
  {
    label: 'THROUGHPUT',
    delta: 'steady',
    deltaClass: 'steady',
    value: '1.24k',
    was: 'req/s',
    before: '0,34 36,36 72,32 110,34',
    after: '110,34 148,33 184,35 220,32',
    afterColor: 'var(--accent)',
  },
]

export default function Dashboard() {
  return (
    <section id="dashboard" className="band" style={{ padding: '74px 0' }}>
      <div className="container">
        <Reveal className="eyebrow">The dashboard</Reveal>
        <Reveal as="h2" className="section-title" style={{ margin: '0 0 14px' }} delay={0.05}>
          A dashboard built for one question.
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          style={{
            color: 'var(--text-muted)',
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 720,
            margin: '0 0 34px',
          }}
        >
          Before/after graphs for each tracked metric, plus every recorded
          version on one timeline - each point labeled, the regression obvious at
          a glance.
        </Reveal>

        <div className="metrics-grid">
          {METRICS.map((m, i) => (
            <Reveal className="card card-hover metric-card" key={m.label} delay={i * 0.08}>
              <div className="metric-head">
                <span className="lbl">{m.label}</span>
                <span className={`delta stat-delta ${m.deltaClass}`}>{m.delta}</span>
              </div>
              <div className="metric-value-row">
                <span className="metric-value">{m.value}</span>
                <span className="metric-was">{m.was}</span>
              </div>
              <Sparkline before={m.before} after={m.after} afterColor={m.afterColor} />
            </Reveal>
          ))}
        </div>

        <div className="dash-lower">
          <Reveal className="card card-hover timeline-card" delay={0.05}>
            <div className="timeline-head">
              <span className="t">p99 latency · all recorded versions</span>
              <span className="s">last 8 deploys</span>
            </div>
            <TimelineChart />
          </Reveal>

          <Reveal className="ai-card" delay={0.12}>
            <div className="ai-head">
              <span style={{ color: 'var(--accent)', fontSize: 16 }}>✦</span>
              <span className="t">AI root-cause</span>
              <span className="ai-badge">OPT-IN</span>
            </div>
            <p className="ai-body">
              Likely cause: an <span className="hl">extra DB round-trip per request</span>{' '}
              introduced in <span className="mono-accent">a1b2c3d</span>. Traces show
              +1 <span className="mono">SELECT</span> on <span className="mono">/cart</span>,
              concentrated in the p99 tail.
            </p>
            <div className="ai-foot">
              Runs only when the delta crosses your threshold - reasoning over logs
              + traces for the same windows, not a restatement of the number.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
