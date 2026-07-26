# TuitionFlow AI — by DevLance

Production-level demo: an AI booking assistant for tuition academies.
Built by Ayush Kailash Gadve (DevLance).

## 🔗 Live Links
- **Live demo:** https://tuitionflow-ai-demo.vercel.app
- **n8n workflow:** https://ak-gadve.app.n8n.cloud/workflow/jmN8AEYI5sAYKJbf (published & active)
- **CRM Google Sheet:** https://docs.google.com/spreadsheets/d/1qOTzh1NVEC69BGp29-T1otdSjOgVw0QAcfuUDpNnCaA/edit
- **Webhook endpoint:** https://ak-gadve.app.n8n.cloud/webhook/tuitionflow-booking (POST)

## ⚙️ How It Works
1. Visitor chats with "Nova" (the AI assistant widget) on the landing page
2. Bot qualifies: subject → level → urgency → name → email → tutor → slot
3. On confirmation, the site POSTs the booking to the n8n webhook
4. n8n automatically:
   - Appends a row to the TuitionFlow CRM Google Sheet
   - Emails the tutor (currently ayushgadve106@gmail.com for demo)
   - Emails the parent a confirmation (to the email they typed)
   - Responds success to the site
5. "Behind the scenes" modal shows prospects exactly what happened

## 🛠 Local Development
```
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## 🔧 Configuration
Edit `src/config.js`:
- `N8N_WEBHOOK_URL` — n8n webhook (empty string = pure demo mode, no real automation)
- `BRAND` — product/agency branding
- `TUTORS` / `SLOTS` — demo tutors and time slots

## 🚀 Redeploying
Deployed on Vercel (project: tuitionflow-ai-demo). Push new files or use
`vercel --prod` from this folder after linking the project.

## 📋 Customizing for a Client (e.g., a tuition academy)
1. Swap BRAND name/colors to client branding
2. Replace TUTORS with their real tutors
3. Point the n8n workflow's email nodes at their addresses
4. Change the Google Sheet to their CRM sheet
5. Optional next steps: WhatsApp via Twilio, calendar sync, reminder workflows

## 🆕 v2 Updates (26 Jul 2026)
- Free-text chat: ask Nova anything, anytime (demo Q&A engine in `src/faq.js`)
- 🎙️ Voice input via Web Speech API (Chrome/Edge)
- Professional demo-version notice inside the chat
- Clean CRM: Date | Contact Name | Email | Subject | Tutor | Trial Slot | Status
- "Parent Name" → "Contact Name" everywhere (parent/student/guardian friendly)
- Instant in-chat booking confirmation + personalized tutor & contact emails
