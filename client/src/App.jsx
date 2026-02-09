import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-row">
          <div className="brand-wrap">
            <Link to="/" className="brand">Vehicle Check History</Link>
            <span className="brand-tag">DVLA-backed reports</span>
          </div>
          <nav className="site-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/faq" className="nav-link">FAQ</Link>
            <Link to="/contact" className="cta">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}
