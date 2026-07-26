// ===== Ayush's demo Q&A engine =====
// Natural small talk answered normally; the demo disclaimer appears ONLY
// for institute-specific data questions (pricing, batches, seats, etc).

const DEMO_NOTE =
  "\n\n💡 Demo note: I'm running on sample data right now. Once connected to your institution's real information, I'll answer this with your exact details."

// --- 1. Small talk: natural replies, NO demo note ---
const SMALLTALK = [
  {
    test: (q) => /^(hi+|hii+|hey+|hello+|yo|namaste|hola)\b/.test(q) || q === 'hi' || q === 'hello',
    answer: "Hello! 👋 Great to see you here. How can I help you today — looking for tutoring for your child, or just exploring?",
  },
  {
    test: (q) => /how are you|how r u|how're you|hows it going|how is it going|whats up|what's up/.test(q),
    answer: "I'm doing great, thanks for asking! 😊 Always happy to chat. How can I help you today?",
  },
  {
    test: (q) => /good (morning|afternoon|evening|night)/.test(q),
    answer: "Good day to you too! 🌟 How can I help — questions about tutoring, or shall I book a free trial lesson?",
  },
  {
    test: (q) => /^(thanks|thank you|thx|ty|shukriya|dhanyawad)/.test(q),
    answer: "You're most welcome! 😊 Anything else I can help you with?",
  },
  {
    test: (q) => /^(bye|goodbye|see you|talk later|gtg)/.test(q),
    answer: "Goodbye! 👋 Come back anytime — I'm here 24/7. Have a lovely day!",
  },
  {
    test: (q) => /who are you|what are you|your name|what can you do|help me/.test(q),
    answer: "I'm Ayush, this academy's AI assistant! 🤖 I can answer your questions, help you find the right tutor, and book a free trial lesson — all right here in this chat, any time of day.",
  },
  {
    test: (q) => /^(ok|okay|cool|nice|great|awesome|hmm|acha|theek)/.test(q),
    answer: "👍 Whenever you're ready, just pick an option below or ask me anything!",
  },
]

// --- 2. Institute-specific data questions: helpful answer + demo note ---
const DATA_RULES = [
  {
    keys: ['price', 'cost', 'fee', 'fees', 'charge', 'rate', 'expensive', 'cheap', 'how much'],
    answer: "Great question! Pricing normally depends on the lesson type — 1-to-1 lessons, study-buddy pairs, group sessions and crash courses each have their own rates, and I'd quote them instantly here." + DEMO_NOTE,
  },
  {
    keys: ['location', 'where', 'address', 'centre', 'center', 'branch'],
    answer: "Lessons in this demo academy happen fully online over Zoom — so students can join from anywhere! For academies with physical centres, I'd share the exact address and directions." + DEMO_NOTE,
  },
  {
    keys: ['timing', 'schedule', 'batch', 'slot', 'hours', 'available', 'availability', 'seat'],
    answer: "Lessons run 7 days a week, with popular after-school and weekend slots. I always show live tutor availability so bookings never clash." + DEMO_NOTE,
  },
  {
    keys: ['subject', 'course', 'maths', 'math', 'physics', 'chemistry', 'biology', 'science', 'english', 'syllabus', 'curriculum'],
    answer: "This demo academy covers GCSE & A-Level Maths, Sciences and English. I can match your child with a specialist tutor for any of them — want me to show you the tutors? 😊" + DEMO_NOTE,
  },
  {
    keys: ['tutor', 'teacher', 'faculty', 'qualified', 'experience'],
    answer: "All tutors here are handpicked subject specialists with 900+ lessons taught and ratings of 4.8★ or higher. I can show you each tutor's profile and let you choose who feels right." + DEMO_NOTE,
  },
  {
    keys: ['trial', 'book', 'booking', 'appointment', 'demo class', 'free class', 'free lesson'],
    answer: "I can book a free 30-minute trial lesson for you right here in this chat — it takes under 2 minutes! Just follow the options, or tell me which subject you need. 🎯",
  },
  {
    keys: ['human', 'agent', 'person', 'staff', 'support', 'real person', 'call', 'phone', 'someone'],
    answer: "Of course! In the live version, I hand this conversation to a real team member instantly — on WhatsApp, email or a call — with the full chat history attached, so you never repeat yourself." + DEMO_NOTE,
  },
  {
    keys: ['refund', 'cancel', 'reschedule', 'policy'],
    answer: "Lessons can normally be rescheduled or cancelled with 24 hours notice, and trial lessons are completely free — so there's zero risk in trying." + DEMO_NOTE,
  },
  {
    keys: ['online', 'zoom', 'offline', 'in person', 'home tuition'],
    answer: "This demo academy teaches online via Zoom — interactive whiteboards, screen sharing, recorded sessions on request. For hybrid academies, I'd offer both online and in-centre options." + DEMO_NOTE,
  },
]

export function answerQuestion(text) {
  const q = (text || '').toLowerCase().trim()

  // Small talk first — natural conversation, no disclaimer
  for (const rule of SMALLTALK) {
    if (rule.test(q)) return rule.answer
  }

  // Institute-data questions — answer + demo note
  for (const rule of DATA_RULES) {
    if (rule.keys.some((k) => q.includes(k))) return rule.answer
  }

  // Unknown: generic helpful reply (light demo mention, not the full note)
  return "That's a good question! I'd answer that instantly using your institution's real data once integrated. Meanwhile — I can tell you about subjects, tutors, timings, or book a free trial lesson right now. What would you like? 😊"
}
