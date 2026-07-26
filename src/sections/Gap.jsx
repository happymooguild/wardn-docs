import Reveal from '../components/Reveal'
import Logo from '../components/Logo'

export default function Gap() {
  return (
    <section className="container" style={{ padding: '70px 40px' }}>
      <Reveal className="eyebrow">The gap</Reveal>
      <Reveal as="h2" className="section-title" style={{ margin: '0 0 18px', maxWidth: 760 }} delay={0.05}>
        Right now you find out a deploy hurt in one of two ways.
      </Reveal>

      <div className="gap-grid">
        <Reveal className="card gap-card" delay={0.05}>
          <div className="gap-num">01</div>
          <div className="gap-title">A customer complains.</div>
          <div className="gap-text">
            By the time a ticket lands, the worse experience has already shipped
            to everyone.
          </div>
        </Reveal>
        <Reveal className="card gap-card" delay={0.12}>
          <div className="gap-num">02</div>
          <div className="gap-title">Someone happens to be watching.</div>
          <div className="gap-text">
            A dashboard at the right moment, luck, and a good eye - not a system.
          </div>
        </Reveal>
      </div>

      <Reveal className="callout" delay={0.1}>
        <div className="callout-icon">
          <Logo size={20} color="#0E1013" />
        </div>
        <div>
          <div className="callout-title">Alerts don't close this gap.</div>
          <div className="callout-text">
            They're built to catch what's already broken - p99 above 2s, error
            rate above 5%. Nothing fires when a version is quietly 10ms slower or
            1% flakier. Nothing is <em>wrong</em> yet by the threshold's
            definition - but your customers already have a worse experience than
            an hour ago.
          </div>
        </div>
      </Reveal>
    </section>
  )
}
