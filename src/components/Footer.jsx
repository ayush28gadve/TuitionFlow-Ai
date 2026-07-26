import { BRAND } from '../config.js'

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="logo">
          <div className="logo-mark">⚡</div>
          {BRAND.product}
          <span className="logo-by">by {BRAND.agency}</span>
        </div>
        <p>
          Built by <b>{BRAND.founder}</b> · {BRAND.agency} — AI automation for education businesses · {BRAND.site}
        </p>
      </div>
    </footer>
  )
}
