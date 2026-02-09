import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <h4 className="brand-footer">Vehicle Check History</h4>
            <p className="brand-description">Professional vehicle inspection reports backed by official DVLA and DVSA data sources.</p>
            <div className="trustpilot-badge">
              <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="trustpilot-link">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="trustpilot-logo">
                  <rect width="100" height="100" fill="#003d82" rx="4"/>
                  <text x="50" y="55" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">★★★★★</text>
                  <text x="50" y="75" fontSize="10" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Trustpilot</text>
                </svg>
              </a>
              <div className="trustpilot-info">
                <div className="trust-rating">
                  <span className="stars">★★★★★</span>
                  <span className="score">4.9/5</span>
                </div>
                <p className="trust-text">Rated excellent by 1,200+ customers</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li><Link to="/">Vehicle Check</Link></li>
              <li><Link to="/pricing">Pricing Plans</Link></li>
              <li><a href="https://example.com/api" target="_blank" rel="noopener noreferrer">API Access</a></li>
              <li><a href="https://example.com/bulk" target="_blank" rel="noopener noreferrer">Bulk Reports</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="https://example.com/blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="https://example.com/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><a href="https://example.com/press" target="_blank" rel="noopener noreferrer">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="mailto:support@vehiclecheck.com">Email Support</a></li>
              <li><a href="tel:+442071234567">Call Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></li>
              <li><a href="https://example.com/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a></li>
              <li><a href="https://example.com/accessibility" target="_blank" rel="noopener noreferrer">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom-section">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Vehicle Check History. All rights reserved. Professional vehicle inspection reports designed for informed purchasing decisions.</p>
          </div>
          <div className="footer-bottom-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">f</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">𝕏</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">in</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">📷</a>
          </div>
        </div>

        {/* Security Trust Banner */}
        <div className="footer-trust-banner">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span className="trust-label">SSL Secured</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span className="trust-label">GDPR Compliant</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <span className="trust-label">Data Protected</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⭐</span>
            <span className="trust-label">Certified Partner</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
