import { motion, useReducedMotion } from 'framer-motion'

/**
 * A polyline/path that draws itself on when scrolled into view, using the
 * stroke-dashoffset technique. This is the signature wardn motion: the
 * "before" baseline draws first, then the regression line climbs after it.
 */
export default function DrawPath({
  points,
  d,
  stroke,
  strokeWidth = 2.5,
  delay = 0,
  duration = 1.4,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = d ? motion.path : motion.polyline
  const geom = d ? { d } : { points }

  if (reduce) {
    const Static = d ? 'path' : 'polyline'
    return (
      <Static
        {...geom}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      />
    )
  }

  return (
    <Tag
      {...geom}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        pathLength: { duration, ease: [0.22, 1, 0.36, 1], delay },
        opacity: { duration: 0.2, delay },
      }}
      {...rest}
    />
  )
}
