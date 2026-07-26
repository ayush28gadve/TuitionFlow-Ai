import { motion } from 'framer-motion'

const steps = [
  { n: '01', icon: '💬', title: 'Parent chats with AI', desc: 'A parent lands on your website at any hour. The AI assistant greets them instantly, understands what their child needs and asks the right qualifying questions.' },
  { n: '02', icon: '📅', title: 'Trial booked in minutes', desc: 'The assistant matches the student with the perfect tutor, shows real available slots and confirms the trial lesson — no forms, no email ping-pong, no waiting.' },
  { n: '03', icon: '⚡', title: 'Everything syncs itself', desc: 'Your CRM sheet updates instantly, the tutor gets the booking by email, and the parent receives a WhatsApp confirmation with all the details. Zero manual work.' },
]

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">How it works</div>
          <h2>From enquiry to booked trial<br />in under 3 minutes</h2>
          <p>No missed messages. No slow replies. No leads lost to faster competitors.</p>
        </div>
        <div className="grid-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n} className="card"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.14, duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="step-num">{s.n}</div>
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
