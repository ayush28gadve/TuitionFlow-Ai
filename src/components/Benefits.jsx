import { motion } from 'framer-motion'

const BENEFITS = [
  { icon: '⚡', title: 'Instant engagement', desc: 'Every visitor is greeted in under 2 seconds — no enquiry ever sits unanswered while a competitor replies first.' },
  { icon: '🤖', title: 'Repetitive work, automated', desc: 'FAQs, qualification, booking, data entry, confirmations — the boring 80% of front-desk work disappears.' },
  { icon: '🎯', title: 'Leads captured & qualified', desc: 'Name, need, urgency and contact details collected conversationally, then scored so hot leads surface first.' },
  { icon: '🌙', title: '24/7 response time', desc: 'Nights, weekends, holidays — the AI answers when customers are actually free to enquire.' },
  { icon: '📈', title: 'Operational efficiency', desc: 'One clean CRM, automatic notifications, zero double-entry. Your team works the pipeline, not the paperwork.' },
  { icon: '💛', title: 'Happier customers', desc: 'Instant answers and frictionless booking feel premium — and customers remember how easy you were to reach.' },
]

export default function Benefits() {
  return (
    <section id="benefits">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">Why businesses want this</div>
          <h2>One AI assistant.<br />Six compounding wins.</h2>
        </div>
        <div className="grid-3">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title} className="card benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
