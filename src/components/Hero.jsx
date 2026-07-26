import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }),
}

export default function Hero({ onOpenChat }) {
  return (
    <header className="hero">
      <div className="float-chip chip-1">✅ Trial booked — Tue 4 PM</div>
      <div className="float-chip chip-2">📊 CRM updated automatically</div>
      <div className="float-chip chip-3">📧 Tutor notified instantly</div>
      <div className="float-chip chip-4">💬 Parent confirmed on WhatsApp</div>

      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="badge"><span className="dot" /> AI Assistant · Online 24/7</span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}>
          Your tuition academy,<br />
          <span className="grad-text">on autopilot.</span>
        </motion.h1>

        <motion.p className="sub" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          Meet the AI assistant that talks to parents, qualifies every enquiry, books
          trial lessons with the right tutor, updates your CRM and notifies everyone —
          while you sleep.
        </motion.p>

        <motion.div className="hero-ctas" variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <button className="btn btn-primary btn-lg" onClick={onOpenChat}>
            🤖 Book a trial lesson — live demo
          </button>
          <a className="btn btn-ghost btn-lg" href="#how">See how it works</a>
        </motion.div>

        <motion.p className="hero-note" variants={fadeUp} initial="hidden" animate="show" custom={4}>
          ↓ Click the button and experience the exact journey a parent takes ↓
        </motion.p>
      </div>
    </header>
  )
}
