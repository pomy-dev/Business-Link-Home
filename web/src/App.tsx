import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { Vehicles } from './pages/Vehicles'

export default function App() {
  const year = new Date().getFullYear()

  return (
    <div className="container">
      <header className="topbar" role="banner">
        <a className="brand" href="/" aria-label="Business Link home">
          <div className="brand-badge" aria-hidden="true" />
          <span>Business Link</span>
          <span className="pill" aria-hidden="true">
            Mobile app
          </span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="/" data-nav-link>
            Home
          </a>
          <a href="/vehicles" data-nav-link>
            Vehicles
          </a>
          <a href="/privacy" data-nav-link>
            Privacy
          </a>
          <a href="/terms" data-nav-link>
            Terms
          </a>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <footer className="footer" role="contentinfo">
        <div>
          © <span>{year}</span> Business Link.
        </div>
        <div>
          <a href="/">Home</a>
          <span aria-hidden="true">·</span>
          <a href="/privacy">Privacy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms">Terms</a>
        </div>
      </footer>
    </div>
  )
}

