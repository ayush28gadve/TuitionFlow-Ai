import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }),
}

export default function Hero({ onOpenChat }) {
  return (
    <header className="hero">
      <div className="float-chip chip-1">💬 "What are your fees?" — answered in 2s</div>
      <div className="float-chip chip-2">📊 Lead captured → CRM updated</div>
      <div className="float-chip chip-3">📅 Booking confirmed — 11:42 PM</div>
      <div className="float-chip chip-4">😴 Business owner: asleep</div>

      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="badge"><span className="dot" /> DevLance AI Showcase · Live Demo</span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}>
          The AI assistant that<br />
          <span className="grad-text">never misses a lead.</span>
        </motion.h1>

        <motion.p className="sub" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          This entire website is a live demo. The business behind it is just an example —
          the real product is the AI assistant in the corner. It answers customers,
          qualifies leads, books appointments and updates your CRM. 24/7. Automatically.
        </motion.p>

        <motion.div className="hero-ctas" variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <button className="btn btn-primary btn-lg" onClick={onOpenChat}>
            🤖 Talk to the AI — it's live
          </button>
          <a className="btn btn-ghost btn-lg" href="#flow">Watch the automation</a>
        </motion.div>

        <motion.p className="hero-note" variants={fadeUp} initial="hidden" animate="show" custom={4}>
          Real bookings. Real CRM updates. Real emails. Try it yourself ↘
        </motion.p>
      </div>
    </header>
  )
}
