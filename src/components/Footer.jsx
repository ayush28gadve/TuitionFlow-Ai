import { BRAND } from '../config.js'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="logo">
            <div className="logo-mark">⚡</div>
            {BRAND.product}
            <span className="logo-by">by {BRAND.agency}</span>
          </div>
          <div className="footer-contact">
            <a className="contact-link" href={`mailto:${BRAND.email}`}>✉️ {BRAND.email}</a>
            <a className="contact-link" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">📱 {BRAND.phone}</a>
          </div>
        </div>
        <p className="footer-note">
          Built by <b>{BRAND.founder}</b> · {BRAND.agency} — AI chatbots & automation for modern businesses · {BRAND.site}
        </p>
      </div>
    </footer>
  )
}
