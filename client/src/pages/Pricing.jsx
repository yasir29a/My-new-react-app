import React, { useState } from 'react'

const plans = [
  {
    id: 'basic',
    name: 'Quick Check',
    price: '£9.99',
    description: 'Perfect for quick vehicle checks',
    time: '24 Hours',
    popular: false,
    features: [
      'Basic Vehicle Information',
      'Registration Check',
      'MOT Status',
      'Email Report',
      'Valid for 30 days'
    ]
  },
  {
    id: 'standard',
    name: 'Comprehensive',
    price: '£24.99',
    description: 'Most popular choice for buyers',
    time: '1-3 Hours',
    popular: true,
    features: [
      'Complete Vehicle Overview',
      'Market Value Estimate',
      'Accident & Theft Check',
      'MOT History',
      'Ownership History',
      'Tax Status Check',
      'Priority Support',
      'Instant Report Delivery'
    ]
  },
  {
    id: 'premium',
    name: 'Professional',
    price: '£49.99',
    description: 'For dealers and professionals',
    time: '30 Minutes',
    popular: false,
    features: [
      'All Comprehensive Features',
      'Detailed Service History',
      'Finance Check',
      'Import History',
      'Plate Change Check',
      'Insurance Group Info',
      'Dealership Support',
      'Phone Consultation',
      'Valid for 60 days'
    ]
  }
]

export default function Pricing(){
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handleBuyNow = (planId) => {
    setSelectedPlan(planId)
    // Redirect to home page with VIN input ready
    window.location.hash = '/'
  }

  return (
    <div className="page pricing-page">
      {/* Header */}
      <section className="pricing-header">
        <h1>Transparent, Simple Pricing</h1>
        <p className="pricing-subtitle">Choose the plan that's right for you. Cancel anytime, no hidden fees.</p>
      </section>

      {/* Plans Grid */}
      <section className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description-short">{plan.description}</p>
            </div>

            <div className="plan-price-section">
              <div className="price">
                <span className="currency">£</span>
                <span className="amount">{plan.price.replace('£', '')}</span>
              </div>
              <div className="time-badge">{plan.time} turnaround</div>
            </div>

            <div className="plan-features">
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`buy-button ${plan.popular ? 'primary' : 'secondary'}`}
              onClick={() => handleBuyNow(plan.id)}
            >
              Get Started
            </button>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item-pricing">
            <h4>How long does a report take?</h4>
            <p>Our Quick Check plan takes up to 24 hours, Comprehensive takes 1-3 hours, and Professional takes 30 minutes with priority processing.</p>
          </div>
          <div className="faq-item-pricing">
            <h4>Can I cancel anytime?</h4>
            <p>Yes! If you're not satisfied, contact us within 24 hours of purchase for a full refund. No questions asked.</p>
          </div>
          <div className="faq-item-pricing">
            <h4>What payment methods do you accept?</h4>
            <p>We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers. All payments are processed securely through Stripe.</p>
          </div>
          <div className="faq-item-pricing">
            <h4>Is my data secure?</h4>
            <p>Absolutely. We use industry-standard SSL encryption and comply with GDPR. Your data is never shared with third parties.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <h2>Ready to get started?</h2>
        <p>Check any vehicle in seconds with our professional inspection reports</p>
        <button 
          className="cta-button-pricing"
          onClick={() => window.location.hash = '/'}
        >
          Start Your First Check
        </button>
      </section>
    </div>
  )
}
