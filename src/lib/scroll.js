const OFFSET = 84

// Smooth-scroll to an element id, accounting for the sticky nav.
export function scrollToId(id) {
  const el = typeof document !== 'undefined' && document.getElementById(id)
  if (!el) return
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const y = el.getBoundingClientRect().top + window.scrollY - OFFSET
  window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
}
