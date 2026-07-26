import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import Stats from './components/Stats.jsx'
import Footer from './components/Footer.jsx'
import ChatbotWidget from './components/ChatbotWidget.jsx'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <div className="ambient">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grain" />

      <Nav onOpenChat={() => setChatOpen(true)} />
      <Hero onOpenChat={() => setChatOpen(true)} />
      <HowItWorks />
      <Features />
      <Stats />
      <Footer />

      <div className="demo-tag">⚡ Live demo by DevLance</div>
      <ChatbotWidget open={chatOpen} setOpen={setChatOpen} />
    </>
  )
}
