import { motion } from 'framer-motion'
import { BRAND } from '../config.js'

export default function CtaBand({ onOpenChat }) {
  return (
    <section id="cta">
      <div className="container">
        <motion.div
          className="cta-band"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2>Want this on <span className="grad-text">your</span> website?</h2>
          <p>
            {BRAND.agency} designs, builds and launches custom AI assistants like this one —
            connected to your real data, your CRM and your team — in weeks, not months.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={onOpenChat}>🤖 Experience it first</button>
            <a className="btn btn-ghost btn-lg" href={`https://${BRAND.site}`} target="_blank" rel="noreferrer">Visit {BRAND.site}</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
