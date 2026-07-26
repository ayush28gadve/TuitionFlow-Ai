// ===== Nova's demo Q&A engine =====
// Answers free-typed questions with helpful demo responses.
// In a client deployment this is replaced by a real AI + the academy's data.

const DEMO_NOTE =
  "\n\n💡 Demo note: I'm running on sample data right now. Once connected to your academy's real information, I'll answer this with your exact details."

const RULES = [
  {
    keys: ['price', 'cost', 'fee', 'fees', 'charge', 'rate', 'expensive', 'cheap', 'much'],
    answer:
      "Great question! Pricing normally depends on the lesson type — 1-to-1 lessons, study-buddy pairs, group sessions and crash courses each have their own rates, and I'd quote them instantly here." + DEMO_NOTE,
  },
  {
    keys: ['location', 'where', 'address', 'centre', 'center', 'city', 'area'],
    answer:
      "Lessons in this demo academy happen fully online over Zoom — so students can join from anywhere! For academies with physical centres, I'd share the exact address and directions." + DEMO_NOTE,
  },
  {
    keys: ['time', 'timing', 'schedule', 'when', 'hours', 'available', 'availability', 'weekend'],
    answer:
      "Lessons run 7 days a week, with popular after-school and weekend slots. I always show live tutor availability so bookings never clash." + DEMO_NOTE,
  },
  {
    keys: ['subject', 'course', 'maths', 'math', 'physics', 'chemistry', 'biology', 'science', 'english', 'teach'],
    answer:
      "This demo academy covers GCSE & A-Level Maths, Sciences and English. I can match your child with a specialist tutor for any of them — want me to show you the tutors? 😊" + DEMO_NOTE,
  },
  {
    keys: ['tutor', 'teacher', 'qualified', 'experience', 'who'],
    answer:
      "All tutors here are handpicked subject specialists with 900+ lessons taught and ratings of 4.8★ or higher. I can show you each tutor's profile and let you choose who feels right." + DEMO_NOTE,
  },
  {
    keys: ['trial', 'book', 'booking', 'appointment', 'demo class', 'free'],
    answer:
      "I can book a free 30-minute trial lesson for you right here in this chat — it takes under 2 minutes! Just follow the options, or tell me which subject you need. 🎯",
  },
  {
    keys: ['human', 'agent', 'person', 'staff', 'support', 'talk', 'call', 'phone', 'someone'],
    answer:
      "Of course! In the live version, I hand this conversation to a real team member instantly — on WhatsApp, email or a call — with the full chat history attached, so you never repeat yourself." + DEMO_NOTE,
  },
  {
    keys: ['refund', 'cancel', 'reschedule', 'policy'],
    answer:
      "Lessons can normally be rescheduled or cancelled with 24 hours notice, and trial lessons are completely free — so there's zero risk in trying." + DEMO_NOTE,
  },
  {
    keys: ['online', 'zoom', 'offline', 'in person', 'home'],
    answer:
      "This demo academy teaches online via Zoom — interactive whiteboards, screen sharing, recorded sessions on request. For hybrid academies, I'd offer both online and in-centre options." + DEMO_NOTE,
  },
]

export function answerQuestion(text) {
  const q = (text || '').toLowerCase()
  for (const rule of RULES) {
    if (rule.keys.some((k) => q.includes(k))) return rule.answer
  }
  return (
    "That's exactly the kind of question I answer instantly when connected to an academy's real data — prices, courses, schedules, policies, anything. 🚀" + DEMO_NOTE
  )
}
