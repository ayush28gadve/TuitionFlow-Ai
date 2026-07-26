import { motion } from 'framer-motion'

const feats = [
  { icon: '🌙', title: '24/7 instant replies', desc: 'Parents enquire at 11 PM. Your AI answers at 11 PM. Not Monday morning.' },
  { icon: '🎯', title: 'Smart lead qualification', desc: 'Subject, level, urgency and budget captured automatically — every hot lead flagged.' },
  { icon: '📊', title: 'Auto-updating CRM', desc: 'Every conversation lands in your Google Sheet CRM the second it ends.' },
  { icon: '👨‍🏫', title: 'Tutor auto-notification', desc: 'Tutors get email + calendar details instantly. No coordination calls.' },
  { icon: '💬', title: 'WhatsApp confirmations', desc: 'Parents get instant booking confirmations and reminders where they actually look.' },
  { icon: '🔁', title: 'Automated follow-ups', desc: 'Leads that go quiet get nurtured automatically until they book.' },
]

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">What the assistant does</div>
          <h2>A full front-desk team,<br />running on AI</h2>
          <p>Everything a great admissions coordinator does — without the salary, sick days or office hours.</p>
        </div>
        <div className="grid-3">
          {feats.map((f, i) => (
            <motion.div
              key={f.title} className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
