import { motion, useReducedMotion } from 'framer-motion'
import DrawPath from './DrawPath'

/* ---- Hero: before/after regression chart with a deploy divider ---- */
export function HeroChart() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 460 210" style={{ width: '100%', height: 'auto' }} role="img"
      aria-label="Latency rising after a deploy">
      {[52, 104, 156].map((y) => (
        <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="var(--chart-grid)" strokeWidth="1" />
      ))}
      <line x1="230" y1="8" x2="230" y2="196" stroke="#3A4150" strokeWidth="1.5" strokeDasharray="4 5" />
      <text x="236" y="22" fill="var(--text-dim)" fontFamily="IBM Plex Mono, monospace" fontSize="11">
        deploy
      </text>
      {/* baseline draws first */}
      <DrawPath
        points="0,132 46,128 92,134 138,126 184,130 230,128"
        stroke="var(--chart-line)"
        strokeWidth={2.5}
        duration={1.2}
      />
      {/* regression climbs after the baseline finishes */}
      <DrawPath
        points="230,128 276,112 322,100 368,82 414,74 460,60"
        stroke="var(--danger)"
        strokeWidth={3}
        delay={1.3}
        duration={1.1}
      />
      <motion.circle
        cx="460"
        cy="60"
        r="4.5"
        fill="var(--danger)"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? {} : { opacity: [0.35, 1, 0.35] }}
        transition={reduce ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />
    </svg>
  )
}

/* ---- Dashboard metric-card sparkline (before | after) ---- */
export function Sparkline({ before, after, afterColor }) {
  return (
    <svg viewBox="0 0 220 64" style={{ width: '100%', height: 'auto' }} aria-hidden="true">
      <line x1="110" y1="2" x2="110" y2="62" stroke="#2A3140" strokeWidth="1" strokeDasharray="3 4" />
      <DrawPath points={before} stroke="var(--chart-line)" strokeWidth={2.5} duration={0.8} />
      <DrawPath points={after} stroke={afterColor} strokeWidth={2.5} delay={0.8} duration={0.8} />
    </svg>
  )
}

/* ---- Dashboard: p99 across all recorded versions ---- */
export function TimelineChart() {
  const good = [
    [30, 150],
    [117, 146],
    [204, 152],
    [291, 148],
    [378, 150],
  ]
  const bad = [
    [465, 60],
    [552, 72],
    [623, 66],
  ]
  return (
    <svg viewBox="0 0 640 200" style={{ width: '100%', height: 'auto' }} role="img"
      aria-label="p99 latency across the last 8 deploys">
      {[50, 100, 150].map((y) => (
        <line key={y} x1="0" y1={y} x2="640" y2={y} stroke="var(--chart-grid)" />
      ))}
      <DrawPath
        points="30,150 117,146 204,152 291,148 378,150 465,60 552,72 623,66"
        stroke="var(--chart-line)"
        strokeWidth={2.5}
        duration={1.6}
      />
      {good.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="4" fill="var(--chart-line)" />
      ))}
      {bad.map(([cx, cy], i) => (
        <circle key={cx} cx={cx} cy={cy} r={i === 0 ? 6 : 4} fill="var(--danger)" />
      ))}
      <text x="465" y="46" fill="var(--danger)" fontFamily="IBM Plex Mono, monospace" fontSize="11" textAnchor="middle">
        a1b2c3d ▲
      </text>
      {[
        [30, 'c4d'],
        [204, 'e9a'],
        [378, '7f3'],
        [623, 'b12'],
      ].map(([x, label]) => (
        <text key={label} x={x} y="176" fill="var(--text-dim)" fontFamily="IBM Plex Mono, monospace" fontSize="10" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  )
}
