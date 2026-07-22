import { useRef } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Subtle magnetic pull toward the cursor. Motion is choreography, not
 * decoration — the pull is small (default 0.25) and springs back on leave.
 * Fully disabled under prefers-reduced-motion.
 */
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  function onMouseMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, style: { x: sx, y: sy }, onMouseMove, onMouseLeave }
}
