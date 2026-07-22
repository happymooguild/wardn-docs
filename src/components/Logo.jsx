// The wardn mark: a "W" traced as a zig-zag polyline with a dot on the last
// peak — a chart line that ticks up. `on` recolors the stroke (e.g. on a
// filled green chip the mark is drawn in the background color).
export default function Logo({ size = 30, color = '#5BC98A', className, style }) {
  const h = (size / 76) * 60
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 76 60"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <polyline
        points="10,12 24,46 38,26 52,46 66,12"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="66" cy="12" r="5.5" fill={color} />
    </svg>
  )
}
