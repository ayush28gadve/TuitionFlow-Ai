import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ target, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

const stats = [
  { target: 2, suffix: ' min', label: 'Average response time (was 6+ hours)' },
  { target: 78, suffix: '%', label: 'More trials booked with instant replies' },
  { target: 80, suffix: '%', label: 'Less admin work for your team' },
  { target: 24, suffix: '/7', label: 'Availability — nights, weekends, holidays' },
]

export default function Stats() {
  return (
    <section id="results">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">The impact</div>
          <h2>Numbers that change a business</h2>
        </div>
        <motion.div
          className="stats-band"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="num grad-text"><Counter target={s.target} suffix={s.suffix} /></div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
