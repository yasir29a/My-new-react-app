import React from 'react'

export default function About(){
  return (
    <div className="page about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Vehicle Check History</h1>
          <p className="about-tagline">Empowering informed vehicle decisions with trusted data and professional insights</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>We provide professional vehicle inspection reports using trusted DVLA and DVSA data sources. Our mission is to help buyers and traders make informed decisions with fast, reliable reports that you can trust.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <h2 className="section-title">Our Story</h2>
        <p className="story-text">Founded by vehicle enthusiasts and data engineers, Vehicle Check History was born from a simple idea: make vehicle information transparent, accessible, and reliable. We recognized that both buyers and traders needed better tools to make confident decisions. Today, we've helped thousands of people avoid costly mistakes and find the right vehicles.</p>
      </section>

      {/* Core Values */}
      <section className="about-values">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3>Accuracy</h3>
            <p>We prioritize data accuracy and verification from official sources to ensure you get reliable information.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3>Security</h3>
            <p>Your data is protected with enterprise-grade encryption and compliance with all data protection regulations.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.364 5.636l-3.536 3.536m9.172-9.172a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zm0 12.728L9.172 9.172"/>
              </svg>
            </div>
            <h3>Excellence</h3>
            <p>We constantly improve our service and support to exceed customer expectations every day.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 7a4 4 0 11-8 0 4 4 0 018 0zM6 20h12a6 6 0 00-12 0z"/>
              </svg>
            </div>
            <h3>Transparency</h3>
            <p>We believe in clear communication and honest reporting about vehicle history and conditions.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <h2 className="section-title">By The Numbers</h2>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Reports Generated</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Customer Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Data Secure</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers who trust Vehicle Check History</p>
        <a href="/" className="cta-button">Check a Vehicle Now</a>
      </section>
    </div>
  )
}
