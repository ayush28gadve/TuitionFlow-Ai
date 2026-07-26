import { motion } from 'framer-motion'

const CASES = [
  { icon: '🎓', title: 'Tuition & Coaching', desc: 'Trial lessons booked, parents answered — the live demo on this page.', live: true },
  { icon: '🦷', title: 'Clinics & Dentists', desc: 'Appointments, insurance FAQs, recall reminders.' },
  { icon: '💇', title: 'Salons & Spas', desc: 'Slot booking, service menus, no-show reduction.' },
  { icon: '🏠', title: 'Real Estate', desc: 'Viewing bookings, property FAQs, lead scoring.' },
  { icon: '🏋️', title: 'Gyms & Fitness', desc: 'Trial passes, class schedules, membership queries.' },
  { icon: '🍽️', title: 'Restaurants', desc: 'Reservations, menu questions, event enquiries.' },
]

export default function UseCases() {
  return (
    <section id="usecases">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">One brain, any business</div>
          <h2>The tuition academy is just<br />today's example</h2>
          <p>The same engine — AI chat + automation + CRM — drops into any service business in days.</p>
        </div>
        <div className="uc-grid">
          {CASES.map((c, i) => (
            <motion.div
              key={c.title} className={`uc-card ${c.live ? 'live' : ''}`}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              {c.live && <span className="uc-live">● LIVE DEMO</span>}
              <span className="uc-icon">{c.icon}</span>
              <b>{c.title}</b>
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
