import React from 'react'

const faqs = [
  {q: 'What is a VIN decoder?', a: 'A VIN decoder extracts vehicle details from the vehicle identification number.'},
  {q: 'How long does a report take?', a: 'Most reports are ready within 1-3 hours depending on the plan.'},
  {q: 'Is my data secure?', a: 'Yes — we only use secure APIs and do not share personal data.'}
]

export default function FAQ(){
  return (
    <div className="page faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((f,i)=> (
          <div key={i} className="faq-item">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
