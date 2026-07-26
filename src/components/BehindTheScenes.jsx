import { motion } from 'framer-motion'
import { BRAND } from '../config.js'

const item = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.18, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } }),
}

export default function BehindTheScenes({ data, onClose }) {
  const now = new Date()
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('en-GB')
  const firstName = (data.name || 'Parent').split(' ')[0]

  return (
    <motion.div
      className="bts-overlay" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="bts-modal" onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <h3>🎬 What just happened — automatically</h3>
        <p className="lead">
          The moment you confirmed the slot, {BRAND.product} did all of this with zero human involvement:
        </p>

        {/* 1 — Google Sheet */}
        <motion.div className="bts-sec" variants={item} initial="hidden" animate="show" custom={0}>
          <div className="bts-label"><span className="n">1</span> 📊 CRM Google Sheet — new row added instantly</div>
          <div className="sheet-mock">
            <table>
              <thead>
                <tr>
                  <th>Date</th><th>Contact Name</th><th>Email</th><th>Subject</th><th>Tutor</th><th>Trial Slot</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>24/07</td><td>Priya S.</td><td>priya@…</td><td>GCSE Sciences (Higher)</td><td>Sarah M.</td><td>Wed · 5:30 PM</td><td>Trial booked</td>
                </tr>
                <tr>
                  <td>25/07</td><td>James O.</td><td>james@…</td><td>A-Level Maths</td><td>—</td><td>—</td><td>Enquiry</td>
                </tr>
                <tr className="new-row">
                  <td>{date.slice(0, 5)}</td>
                  <td><b>{data.name}</b></td>
                  <td>{(data.email || '').slice(0, 14)}…</td>
                  <td>{data.subject} ({data.level})</td>
                  <td>{data.tutor}</td>
                  <td>{data.slot}</td>
                  <td>✅ Trial booked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 2 — Tutor email */}
        <motion.div className="bts-sec" variants={item} initial="hidden" animate="show" custom={1}>
          <div className="bts-label"><span className="n">2</span> 📧 Tutor notified by email — instantly</div>
          <div className="email-mock">
            <div className="em-head">
              <b>To:</b> {data.tutor} &nbsp;·&nbsp; <b>From:</b> bookings@youracademy.co.uk<br />
              <b>Subject:</b> 🎓 New trial booking — {data.subject} — {data.slot}
            </div>
            <div className="em-body">
              Hi <b>{data.tutor}</b>,<br /><br />
              A new trial lesson has been booked with you:<br /><br />
              👤 Contact: <b>{data.name}</b> ({data.email})<br />
              📚 Subject: <b>{data.subject}</b> — {data.level}<br />
              ⏰ Slot: <b>{data.slot}</b> · 30-minute trial<br />
              🔗 Zoom link: auto-generated & attached<br /><br />
              A calendar invite has been added to your schedule. Good luck! 🍀
            </div>
          </div>
        </motion.div>

        {/* 3 — WhatsApp to parent */}
        <motion.div className="bts-sec" variants={item} initial="hidden" animate="show" custom={2}>
          <div className="bts-label"><span className="n">3</span> 💬 Contact confirmed on WhatsApp — instantly</div>
          <div className="wa-mock">
            <div className="wa-bubble">
              Hi {firstName}! 🎉 Your <b>free trial lesson</b> is confirmed:<br /><br />
              📚 {data.subject} ({data.level})<br />
              👨‍🏫 Tutor: {data.tutor}<br />
              📅 {data.slot}<br />
              🔗 Zoom link will arrive 2 hours before the lesson.<br /><br />
              We'll send you a reminder 24h before. Reply here anytime if you have questions! 😊
              <div className="wa-time">{time} ✓✓</div>
            </div>
          </div>
        </motion.div>

        {/* 4 — Timeline */}
        <motion.div className="bts-sec" variants={item} initial="hidden" animate="show" custom={3}>
          <div className="bts-label"><span className="n">4</span> ⏱️ The full journey — under 3 minutes</div>
          <div className="timeline">
            <div className="tl-item"><div className="tl-dot">💬</div><div className="tl-txt"><b>Visitor started chatting</b><span>AI greeted instantly — no wait, no forms</span></div></div>
            <div className="tl-item"><div className="tl-dot">🎯</div><div className="tl-txt"><b>Lead qualified automatically</b><span>Subject, level & urgency captured · scored 9/10 🔥</span></div></div>
            <div className="tl-item"><div className="tl-dot">📅</div><div className="tl-txt"><b>Trial booked with {data.tutor}</b><span>Real slot, real tutor, instant confirmation</span></div></div>
            <div className="tl-item"><div className="tl-dot">⚡</div><div className="tl-txt"><b>CRM + tutor + parent all synced</b><span>Sheet updated · email sent · WhatsApp delivered · reminders scheduled</span></div></div>
            <div className="tl-item"><div className="tl-dot">😴</div><div className="tl-txt"><b>Academy team involvement: zero</b><span>This works at 2 PM or 2 AM — every single time</span></div></div>
          </div>
        </motion.div>

        <button className="bts-close-btn" onClick={onClose}>← Back to the demo</button>
      </motion.div>
    </motion.div>
  )
}
