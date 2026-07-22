import Reveal from '../components/Reveal'

export default function Rollback() {
  return (
    <section className="container" style={{ padding: '60px 40px' }}>
      <Reveal className="rollback">
        <span className="tag">TODO · §9</span>
        <div className="body">
          <div className="callout-title">Rollback isn't designed yet — on purpose.</div>
          <div className="callout-text" style={{ color: 'var(--text-body)', fontSize: 15.5 }}>
            One thing is settled: wardn will never touch your cluster directly.
            Everything else — redeploy-forward vs. tag-overwrite, auto-merge vs.
            PR-with-a-ping — is an open discussion, not something we'll overclaim.
            It's explicitly out of the hackathon MVP.
          </div>
        </div>
      </Reveal>
    </section>
  )
}
