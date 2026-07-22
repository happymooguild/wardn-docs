import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-linked reveal. Fades + lifts a block into place the first time it
 * enters the viewport. `delay`/`stagger` let callers choreograph a sequence
 * instead of everything popping at once. Respects reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  as = 'div',
  className,
  style,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
