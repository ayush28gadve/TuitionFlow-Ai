import { BRAND } from '../config.js'

export default function Nav({ onOpenChat }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="logo">
          <div className="logo-mark">⚡</div>
          {BRAND.product}
          <span className="logo-by">by {BRAND.agency}</span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#results">Results</a>
          <button className="btn btn-primary" onClick={onOpenChat}>
            Try the AI Assistant
          </button>
        </div>
      </div>
    </nav>
  )
}
