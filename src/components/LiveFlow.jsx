import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  { icon: '💬', title: 'Visitor says hi', desc: 'A customer lands on the website at any hour and starts chatting. The AI replies in under 2 seconds.' },
  { icon: '🎯', title: 'AI qualifies the lead', desc: 'Smart questions capture what they need, how urgent it is, and their contact details — conversationally.' },
  { icon: '📅', title: 'Appointment booked', desc: 'The AI matches them to the right person and confirms a real time slot. No forms. No phone tag.' },
  { icon: '📊', title: 'CRM updates itself', desc: 'A clean record appears in the business dashboard instantly — name, need, booking, status.' },
  { icon: '📧', title: 'Everyone notified', desc: 'The team member gets a personalized email, the customer gets an instant confirmation. Zero manual work.' },
]

const AUTO_MS = 1500      // faster auto-advance
const RESUME_MS = 5000    // resume auto-play 5s after last interaction

export default function LiveFlow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef(null)

  // Auto-advance (pauses while user interacts)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), AUTO_MS)
    return () => clearInterval(t)
  }, [paused])

  // Manual selection: jump instantly, pause auto-play, resume after idle
  const select = (i) => {
    setActive(i)
    setPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_MS)
  }

  useEffect(() => () => resumeTimer.current && clearTimeout(resumeTimer.current), [])

  return (
    <section id="flow">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">The automation, live</div>
          <h2>Watch what happens when<br />a customer starts typing</h2>
          <p>This exact pipeline runs behind the chatbot on this page — watch it play, or click any step to explore.</p>
        </div>

        <div className="flow-track">
          <div className="flow-line"><div className={`flow-pulse ${paused ? 'paused' : ''}`} /></div>
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`flow-node ${i === active ? 'active' : ''} ${i < active ? 'passed' : ''}`}
              onClick={() => select(i)}
              onMouseEnter={() => select(i)}
              aria-label={`Step ${i + 1}: ${s.title}`}
            >
              <div className="flow-dot">{s.icon}</div>
              <div className="flow-idx">{String(i + 1).padStart(2, '0')}</div>
            </button>
          ))}
        </div>

        <motion.div
          key={active} className="flow-detail"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="flow-detail-icon">{STEPS[active].icon}</span>
          <div>
            <b>{STEPS[active].title}</b>
            <p>{STEPS[active].desc}</p>
          </div>
        </motion.div>

        <p className="flow-hint">{paused ? '⏸ Paused — auto-play resumes in a moment' : '▶ Auto-playing · hover or tap any step to explore'}</p>
      </div>
    </section>
  )
}
