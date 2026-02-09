import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lookup } from '../api'

export default function Home() {
  const [reg, setReg] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!reg) return setError('Please enter a registration')
    setLoading(true)
    try {
      const res = await lookup(reg)
      if (res.success) {
        navigate('/results', { state: { data: res.data } })
      } else {
        setError('No data found')
      }
    } catch (err) {
      setError(err.message || 'Lookup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content hero-grid">
          <div className="hero-copy">
            <h1>Keep Your Finances in Check with a Detailed Vehicle History Report</h1>
            <p>Fast, reliable DVLA-backed vehicle reports — perfect for buyers, traders and finance checks.</p>

            <form onSubmit={handleSubmit} className="hero-form">
              <input
                type="text"
                placeholder="AB12 CDE, A123 ABC, ABC 123A"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>{loading ? 'Checking…' : 'Check Registration'}</button>
            </form>
            {error && <div className="error-banner">{error}</div>}
            <p className="hero-hint">Supports all UK registration formats</p>
            <div className="trust-row">
              <div className="trust-pill">DVLA & DVSA Data</div>
              <div className="trust-pill">24k+ Daily Searches</div>
              <div className="trust-pill">Secure Payments</div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden>
            <div className="card-visual">
              <div className="card-header">Vehicle Overview</div>
              <div className="card-body">
                <div className="spec"><strong>Toyota</strong> Corolla · 2016</div>
                <div className="spec">MOT: <span className="muted">Expired</span></div>
                <div className="spec">Warnings: <span className="warn">Outstanding finance</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>24,000+</h3>
          <p>Daily Searches</p>
        </div>
        <div className="stat-card">
          <h3>DVLA & DVSA</h3>
          <p>Data Sources</p>
        </div>
        <div className="stat-card">
          <h3>Comprehensive</h3>
          <p>Full Vehicle History</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How to Check a UK Vehicle Registration Number Online</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Input Registration</h3>
            <p>Enter your UK registration number into the designated field. Supports all UK formats including current and historic registrations.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>DVLA Data Lookup</h3>
            <p>The system searches DVLA and DVSA databases, gathering crucial data including MOT history, tax status, and vehicle specifications.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Secure Payment</h3>
            <p>Complete your transaction securely to access the comprehensive UK vehicle history report with full DVLA data.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Access Your Report</h3>
            <p>Review your detailed UK vehicle report including MOT status, tax information, and complete vehicle history.</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing">
        <h2>Identify the Perfect Match for Your Vehicle Inspection Needs</h2>
        <p className="pricing-subtitle">Professional vehicle inspection reports with comprehensive data to help you make informed purchasing decisions.</p>
        <div className="plans-grid">
          <div className="plan-card">
            <div className="plan-badge">Most Popular</div>
            <h3>Friendly</h3>
            <p className="plan-description">Perfect for first-time buyers who want comprehensive vehicle insights</p>
            <div className="plan-price">£24.99</div>
            <div className="plan-time">1-3 Hours Fast</div>
            <div className="plan-features">
              <h4>Includes:</h4>
              <ul>
                <li>Vehicle Overview</li>
                <li>Market Value</li>
                <li>Vehicle Specifications</li>
                <li>Sales Listing</li>
                <li>Accident Record</li>
                <li>Theft Record</li>
                <li>Open Recalls</li>
                <li>Impounds</li>
              </ul>
            </div>
            <button className="btn-primary" onClick={() => alert('Proceed to checkout')}>Buy Your Report</button>
          </div>
        </div>
        <div className="guarantee">
          <h3>100% Money-Back Guarantee</h3>
          <p>Not satisfied with your report? We offer a full refund. Your peace of mind is our priority.</p>
        </div>
      </section>
    </div>
  )
}
