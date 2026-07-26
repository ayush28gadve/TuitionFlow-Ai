// ===== DevLance TuitionFlow AI — Configuration =====
// Set the n8n webhook URL to make bookings flow into the real
// Google Sheet CRM + email notifications. Leave empty for pure demo mode.
export const N8N_WEBHOOK_URL = 'https://ak-gadve.app.n8n.cloud/webhook/tuitionflow-booking'

export const BRAND = {
  product: 'TuitionFlow AI',
  agency: 'DevLance',
  site: 'www.devlance.studio',
  founder: 'Ayush Kailash Gadve',
  email: 'devlance.head@gmail.com',
  phone: '+91 7558575837',
  whatsapp: '917558575837',
}

export const TUTORS = [
  { id: 't1', name: 'Farhan A.', subjects: 'Maths & Physics', rating: 4.9, lessons: 1240, emoji: '🧮' },
  { id: 't2', name: 'Sarah M.', subjects: 'Chemistry & Biology', rating: 4.8, lessons: 980, emoji: '🧪' },
  { id: 't3', name: 'Ikram C.', subjects: 'English & Humanities', rating: 4.8, lessons: 1105, emoji: '📖' },
]

export const SLOTS = [
  { id: 's1', label: 'Tue · 4:00 PM' },
  { id: 's2', label: 'Wed · 5:30 PM' },
  { id: 's3', label: 'Thu · 4:00 PM' },
  { id: 's4', label: 'Sat · 11:00 AM' },
]
