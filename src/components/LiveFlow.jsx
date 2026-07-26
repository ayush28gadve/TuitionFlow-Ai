import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  { icon: '💬', title: 'Visitor says hi', desc: 'A customer lands on the website at any hour and starts chatting. The AI replies in under 2 seconds.' },
  { icon: '🎯', title: 'AI qualifies the lead', desc: 'Smart questions capture what they need, how urgent it is, and their contact details — conversationally.' },
  { icon: '📅', title: 'Appointment booked', desc: 'The AI matches them to the right person and confirms a real time slot. No forms. No phone tag.' },
  { icon: '📊', title: 'CRM updates itself', desc: 'A clean record appears in the business dashboard instantly — name, need, booking, status.' },
  { icon: '📧', title: 'Everyone notified', desc: 'The team member gets a personalized email, the customer gets an instant confirmation. Zero manual work.' },
]

export default function LiveFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="flow">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">The automation, live</div>
          <h2>Watch what happens when<br />a customer starts typing</h2>
          <p>This exact pipeline runs behind the chatbot on this page — powered by AI + n8n automation.</p>
        </div>

        <div className="flow-track">
          <div className="flow-line"><div className="flow-pulse" /></div>
          {STEPS.map((s, i) => (
            <div key={s.title} className={`flow-node ${i === active ? 'active' : ''} ${i < active ? 'passed' : ''}`}>
              <div className="flow-dot">{s.icon}</div>
              <div className="flow-idx">{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>

        <motion.div
          key={active} className="flow-detail"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="flow-detail-icon">{STEPS[active].icon}</span>
          <div>
            <b>{STEPS[active].title}</b>
            <p>{STEPS[active].desc}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
