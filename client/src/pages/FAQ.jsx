import React, { useState } from 'react'

const faqs = [
  {q: 'What is a VIN decoder?', a: 'A VIN decoder extracts comprehensive vehicle details from the vehicle identification number, including make, model, year, engine specifications, and manufacturing information. Our advanced decoder provides accurate data instantly.'},
  {q: 'How long does a report take?', a: 'Most reports are generated and ready within 1-3 hours depending on your selected plan. Premium subscribers receive expedited processing with results available within 15-30 minutes.'},
  {q: 'Is my data secure?', a: 'Yes - we employ enterprise-grade encryption and only use secure APIs from verified sources. We never share, sell, or store your personal data. All transactions comply with GDPR and data protection regulations.'},
  {q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through certified payment gateways.'},
  {q: 'Can I cancel my subscription?', a: 'Absolutely! You can cancel anytime from your account settings. If you cancel within 24 hours of purchase, you will receive a full refund. No questions asked.'},
  {q: 'Do you offer API access?', a: 'Yes, we provide REST API access for developers and enterprises. Contact our sales team to discuss API integration, custom solutions, and volume pricing.'}
]

export default function FAQ(){
  const [expanded, setExpanded] = useState(null)

  const toggleAccordion = (index) => {
    setExpanded(expanded === index ? null : index)
  }

  return (
    <div className="page faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-subtitle">Find answers to common questions about our VIN decoder service</p>
      </div>

      <div className="faq-container">
        <div className="faq-accordion">
          {faqs.map((f, i) => (
            <div key={i} className={`accordion-item ${expanded === i ? 'active' : ''}`}>
              <button
                className="accordion-button"
                onClick={() => toggleAccordion(i)}
                aria-expanded={expanded === i}
              >
                <span className="accordion-question">{f.q}</span>
                <span className="accordion-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </span>
              </button>
              {expanded === i && (
                <div className="accordion-content">
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="faq-footer">
        <h3>Still have questions?</h3>
        <p>Can't find the answer you're looking for? Contact our support team.</p>
        <button className="cta-button">Get in Touch</button>
      </div>
    </div>
  )
}
