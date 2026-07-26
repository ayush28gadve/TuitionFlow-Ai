import { useState } from 'react'
import { motion } from 'framer-motion'

const ROWS = [
  { label: 'First response time', without: '6+ hours', withAi: '2 seconds', wBar: 95, aBar: 4 },
  { label: 'Availability', without: '9 AM – 6 PM', withAi: '24 / 7 / 365', wBar: 38, aBar: 100 },
  { label: 'Leads lost to slow replies', without: '~40%', withAi: '< 5%', wBar: 80, aBar: 8 },
  { label: 'Admin hours per month', without: '25+ hrs', withAi: '~5 hrs', wBar: 90, aBar: 18 },
  { label: 'Booking completion rate', without: '~18%', withAi: '~32%', wBar: 36, aBar: 78 },
]

export default function Comparison() {
  const [mode, setMode] = useState('with')
  const withAi = mode === 'with'

  return (
    <section id="compare">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">Before vs After</div>
          <h2>Same business.<br />Completely different numbers.</h2>
        </div>

        <div className="cmp-toggle">
          <button className={`cmp-btn ${!withAi ? 'on' : ''}`} onClick={() => setMode('without')}>😓 Without AI</button>
          <button className={`cmp-btn ${withAi ? 'on ai' : ''}`} onClick={() => setMode('with')}>⚡ With AI</button>
        </div>

        <div className="cmp-card">
          {ROWS.map((r) => (
            <div className="cmp-row" key={r.label}>
              <div className="cmp-label">{r.label}</div>
              <div className="cmp-bar-wrap">
                <motion.div
                  className={`cmp-bar ${withAi ? 'ai' : ''}`}
                  animate={{ width: `${withAi ? r.aBar : r.wBar}%` }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </div>
              <motion.div
                key={mode + r.label} className={`cmp-value ${withAi ? 'ai' : ''}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {withAi ? r.withAi : r.without}
              </motion.div>
            </div>
          ))}
        </div>
        <p className="cmp-note">Figures based on typical service-business benchmarks. Toggle to compare. 👆</p>
      </div>
    </section>
  )
}
