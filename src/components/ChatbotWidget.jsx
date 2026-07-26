import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { N8N_WEBHOOK_URL, TUTORS, SLOTS } from '../config.js'
import { answerQuestion } from '../faq.js'
import BehindTheScenes from './BehindTheScenes.jsx'

const SUBJECTS = ['GCSE Maths', 'GCSE Sciences', 'A-Level Maths', 'A-Level Sciences', 'English', 'Other']
const LEVELS = ['Foundation', 'Higher', 'A-Level', 'Not sure']
const URGENCY = ['🔥 ASAP — exam soon!', '📅 Within this month', '👀 Just exploring']

function BotFace() {
  return (
    <div className="bot-face">
      <div className="head">
        <div className="antenna" />
        <div className="eye l" />
        <div className="eye r" />
        <div className="mouth" />
      </div>
    </div>
  )
}

export default function ChatbotWidget({ open, setOpen }) {
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [step, setStep] = useState('idle')
  const [input, setInput] = useState('')
  const [data, setData] = useState({})
  const [showBts, setShowBts] = useState(false)
  const [listening, setListening] = useState(false)
  const bodyRef = useRef(null)
  const startedRef = useRef(false)
  const recRef = useRef(null)
  const stepRef = useRef(step)
  stepRef.current = step

  const scrollDown = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    })
  }

  const botSay = (text, nextStep, delay = 900) => {
    setTyping(true)
    scrollDown()
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text }])
      if (nextStep) setStep(nextStep)
      scrollDown()
    }, delay)
  }

  const userSay = (text) => {
    setMessages((m) => [...m, { from: 'user', text }])
    scrollDown()
  }

  useEffect(() => {
    if (open && !startedRef.current) {
      startedRef.current = true
      botSay("Hi! 👋 I'm Nova, this academy's AI assistant. I can answer your questions or book a free trial lesson in under 2 minutes.", null, 800)
      setTimeout(() => botSay('Which subject does your child need help with? You can also type or speak any question below. 🎙️', 'subject', 900), 1000)
    }
  }, [open])

  useEffect(() => { if (open) scrollDown() }, [open, messages, typing])

  const pick = (field, value, sayText, nextQuestion, nextStep) => {
    userSay(sayText ?? value)
    setData((d) => ({ ...d, [field]: value }))
    setStep('waiting')
    setTimeout(() => botSay(nextQuestion, nextStep), 300)
  }

  const handleSubject = (s) => pick('subject', s, s, 'Great choice! What level is the student working at?', 'level')
  const handleLevel = (l) => pick('level', l, l, 'Got it. How soon do you need tutoring to start?', 'urgency')
  const handleUrgency = (u) => pick('urgency', u, u, "Perfect. What's your name? (You could be a parent, student or guardian — anyone booking 😊)", 'name')

  // Free-typed questions get a helpful demo answer, then the flow continues.
  const handleFreeQuestion = (v) => {
    userSay(v)
    const currentStep = stepRef.current
    setStep('waiting')
    setTimeout(() => {
      botSay(answerQuestion(v), null, 1100)
      setTimeout(() => {
        if (['subject', 'level', 'urgency', 'tutor', 'slot'].includes(currentStep)) {
          botSay('And whenever you are ready — just pick an option below to continue. 👇', currentStep, 700)
        } else if (currentStep === 'done' || currentStep === 'idle') {
          setStep(currentStep === 'idle' ? 'subject' : 'done')
        } else {
          setStep(currentStep)
        }
      }, 1400)
    }, 250)
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    setInput('')
    const s = stepRef.current

    if (s === 'name') {
      userSay(v)
      setData((d) => ({ ...d, name: v }))
      setStep('waiting')
      setTimeout(() => botSay(`Lovely to meet you, ${v.split(' ')[0]}! 📧 What's the best email for the booking confirmation?`, 'email'), 300)
    } else if (s === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        userSay(v)
        setTimeout(() => botSay("Hmm, that doesn't look like a valid email — could you double-check it? 🙂", 'email'), 300)
        return
      }
      userSay(v)
      setData((d) => ({ ...d, email: v }))
      setStep('waiting')
      setTimeout(() => botSay('Perfect! Now, here are our top-rated tutors. Who would you like for the trial?', 'tutor'), 300)
    } else {
      handleFreeQuestion(v)
    }
  }

  // ===== Voice input (Web Speech API) =====
  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      botSay("Voice input isn't supported in this browser — try Chrome or Edge! 🎙️", null, 500)
      return
    }
    if (listening) {
      recRef.current?.stop()
      return
    }
    const rec = new SR()
    rec.lang = 'en-GB'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript
      setInput(transcript)
    }
    recRef.current = rec
    rec.start()
  }

  const handleTutor = (t) => {
    userSay(`${t.emoji} ${t.name}`)
    setData((d) => ({ ...d, tutor: t.name }))
    setStep('waiting')
    setTimeout(() => botSay(`Excellent — ${t.name} is brilliant! 🌟 Here are the available trial slots this week:`, 'slot'), 300)
  }

  const handleSlot = (s) => {
    userSay(s.label)
    const finalData = { ...data, slot: s.label }
    setData(finalData)
    setStep('waiting')
    setTimeout(() => botSay('Booking your trial lesson now… ⚙️', null, 700), 300)
    setTimeout(() => finalizeBooking(finalData), 2100)
  }

  const finalizeBooking = async (finalData) => {
    if (N8N_WEBHOOK_URL) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...finalData, source: 'TuitionFlow AI demo', timestamp: new Date().toISOString() }),
        })
      } catch (err) { console.warn('Webhook unreachable, demo continues:', err) }
    }
    setMessages((m) => [...m, { from: 'card', data: finalData }])
    setStep('done')
    scrollDown()
    setTimeout(() => botSay(`📧 Your confirmation email is on its way to ${finalData.email}, and ${finalData.tutor} has just been notified with all the details — automatically.`, null, 1000), 800)
    setTimeout(() => botSay('That whole journey took about 2 minutes, and nobody at the academy lifted a finger. Want to see what happened behind the scenes? 👀', 'done', 1100), 2600)
  }

  const showOptions = !typing && ['subject', 'level', 'urgency', 'tutor', 'slot'].includes(step)
  const inputPlaceholder =
    step === 'name' ? 'Type your name…'
    : step === 'email' ? 'Type your email…'
    : listening ? 'Listening… speak now 🎙️'
    : 'Type or ask me anything…'

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            key="tip" className="launcher-tip"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            👋 Try me — ask anything or book a trial!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bot-launcher" onClick={() => setOpen(!open)} aria-label="Open AI assistant"
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.6 }}
      >
        {open ? <span style={{ color: '#fff', fontSize: 24 }}>✕</span> : <BotFace />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat" className="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <div className="chat-head">
              <div className="avatar"><BotFace /></div>
              <div className="info">
                <h4>Nova — AI Assistant</h4>
                <div className="status">Online · replies instantly</div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="demo-note">
              ⚡ <b>Demo version</b> — connected to your institution's real data, Nova answers with your actual pricing, courses and schedules.
            </div>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) =>
                m.from === 'card' ? (
                  <motion.div key={i} className="booking-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <h5>✅ Trial Lesson Confirmed!</h5>
                    <div className="row"><span className="k">Contact name</span><span className="v">{m.data.name}</span></div>
                    <div className="row"><span className="k">Subject</span><span className="v">{m.data.subject} ({m.data.level})</span></div>
                    <div className="row"><span className="k">Tutor</span><span className="v">{m.data.tutor}</span></div>
                    <div className="row"><span className="k">Slot</span><span className="v">{m.data.slot}</span></div>
                    <div className="row"><span className="k">Confirmation to</span><span className="v">{m.data.email}</span></div>
                    <button className="bts-btn" onClick={() => setShowBts(true)}>
                      🎬 See what happened behind the scenes
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={i} className={`msg ${m.from}`}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    {m.text}
                  </motion.div>
                )
              )}

              {typing && (
                <div className="msg bot typing"><span /><span /><span /></div>
              )}

              {showOptions && (
                <motion.div className="quick-opts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ flexDirection: ['tutor'].includes(step) ? 'column' : 'row' }}>
                  {step === 'subject' && SUBJECTS.map((s) => (
                    <button key={s} className="quick-opt" onClick={() => handleSubject(s)}>{s}</button>
                  ))}
                  {step === 'level' && LEVELS.map((l) => (
                    <button key={l} className="quick-opt" onClick={() => handleLevel(l)}>{l}</button>
                  ))}
                  {step === 'urgency' && URGENCY.map((u) => (
                    <button key={u} className="quick-opt" onClick={() => handleUrgency(u)}>{u}</button>
                  ))}
                  {step === 'tutor' && TUTORS.map((t) => (
                    <button key={t.id} className="tutor-card-opt" onClick={() => handleTutor(t)}>
                      <span className="t-emoji">{t.emoji}</span>
                      <span>
                        <span className="t-name">{t.name}</span><br />
                        <span className="t-meta">{t.subjects} · {t.lessons}+ lessons</span>
                      </span>
                      <span className="t-rating">★ {t.rating}</span>
                    </button>
                  ))}
                  {step === 'slot' && SLOTS.map((s) => (
                    <button key={s.id} className="quick-opt" onClick={() => handleSlot(s)}>📅 {s.label}</button>
                  ))}
                </motion.div>
              )}
            </div>

            <form className="chat-input-row" onSubmit={handleTextSubmit}>
              <input
                className="chat-input" value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                type={step === 'email' ? 'email' : 'text'}
              />
              <button
                type="button"
                className={`chat-mic ${listening ? 'listening' : ''}`}
                onClick={toggleVoice}
                aria-label="Voice input"
                title="Speak instead of typing"
              >
                🎙️
              </button>
              <button className="chat-send" type="submit" aria-label="Send">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBts && <BehindTheScenes data={data} onClose={() => setShowBts(false)} />}
      </AnimatePresence>
    </>
  )
}
