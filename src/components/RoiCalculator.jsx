import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RoiCalculator() {
  const [enquiries, setEnquiries] = useState(100)
  const [value, setValue] = useState(300)

  // Conservative model: conversion lifts from 18% -> 32% with instant replies
  const extraCustomers = Math.round(enquiries * 0.14)
  const monthlyGain = extraCustomers * value
  const hoursSaved = Math.round(enquiries * 0.25)
  const yearlyGain = monthlyGain * 12

  const fmt = (n) => '£' + n.toLocaleString('en-GB')

  return (
    <section id="roi">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">Interactive ROI calculator</div>
          <h2>What would this do<br />for your business?</h2>
          <p>Drag the sliders — the maths updates live.</p>
        </div>

        <div className="roi-grid">
          <div className="roi-inputs">
            <div className="roi-field">
              <label>Monthly enquiries <b>{enquiries}</b></label>
              <input type="range" min="20" max="500" step="10" value={enquiries}
                onChange={(e) => setEnquiries(+e.target.value)} />
            </div>
            <div className="roi-field">
              <label>Average customer value / month <b>{fmt(value)}</b></label>
              <input type="range" min="50" max="1000" step="25" value={value}
                onChange={(e) => setValue(+e.target.value)} />
            </div>
            <div className="roi-assumption">
              Assumes conversion lifts from 18% → 32% with instant 24/7 replies
              (typical for service businesses), and ~15 min saved per enquiry.
            </div>
          </div>

          <div className="roi-results">
            <motion.div className="roi-stat" key={'c' + extraCustomers} initial={{ scale: 0.94, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="roi-num grad-text">+{extraCustomers}</span>
              <span className="roi-lbl">new customers / month</span>
            </motion.div>
            <motion.div className="roi-stat" key={'m' + monthlyGain} initial={{ scale: 0.94, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="roi-num grad-text">{fmt(monthlyGain)}</span>
              <span className="roi-lbl">extra revenue / month</span>
            </motion.div>
            <motion.div className="roi-stat" key={'h' + hoursSaved} initial={{ scale: 0.94, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="roi-num grad-text">{hoursSaved} hrs</span>
              <span className="roi-lbl">admin time saved / month</span>
            </motion.div>
            <motion.div className="roi-stat wide" key={'y' + yearlyGain} initial={{ scale: 0.94, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="roi-num grad-text">{fmt(yearlyGain)}</span>
              <span className="roi-lbl">estimated yearly impact 🚀</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
