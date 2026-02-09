import React from 'react'
import { Link } from 'react-router-dom'

export default function Pricing(){
  return (
    <div className="page pricing-page" id="pricing">
      <h1>Pricing Plans</h1>
      <p className="pricing-intro">Choose the inspection that fits your needs. All plans include DVLA/DVSA sourced data.</p>

      <div className="plans-grid">
        <div className="plan-card">
          <div className="plan-badge">Most Popular</div>
          <h3>Friendly</h3>
          <p className="plan-description">Perfect for first-time buyers who want comprehensive vehicle insights</p>
          <div className="plan-price">£24.99</div>
          <div className="plan-time">1-3 Hours</div>
          <div className="plan-features">
            <ul>
              <li>Vehicle Overview</li>
              <li>Market Value</li>
              <li>Accident & Theft Record</li>
            </ul>
          </div>
          <Link to="/" className="btn-primary">Buy Now</Link>
        </div>
      </div>
    </div>
  )
}
