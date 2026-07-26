import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LiveFlow from './components/LiveFlow.jsx'
import Benefits from './components/Benefits.jsx'
import Comparison from './components/Comparison.jsx'
import RoiCalculator from './components/RoiCalculator.jsx'
import UseCases from './components/UseCases.jsx'
import Stats from './components/Stats.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'
import ChatbotWidget from './components/ChatbotWidget.jsx'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const openChat = () => setChatOpen(true)

  return (
    <>
      <div className="ambient">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grain" />

      <Nav onOpenChat={openChat} />
      <Hero onOpenChat={openChat} />
      <LiveFlow />
      <Benefits />
      <Comparison />
      <RoiCalculator />
      <UseCases />
      <Stats />
      <CtaBand onOpenChat={openChat} />
      <Footer />

      <div className="demo-tag">⚡ Live demo by DevLance</div>
      <ChatbotWidget open={chatOpen} setOpen={setChatOpen} />
    </>
  )
}
