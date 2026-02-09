import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Results() {
  const { state } = useLocation()
  const data = state?.data

  if (!data) {
    return (
      <div className="results-empty">
        <p>No results to show. Try a <Link to="/">new lookup</Link>.</p>
      </div>
    )
  }

  return (
    <div className="results">
      <div className="results-header">
        <h1>Vehicle History Report</h1>
        <p className="results-reg">{data.registration}</p>
      </div>

      {/* Vehicle Overview Section */}
      <section className="report-section overview">
        <h2>Vehicle Overview</h2>
        <div className="overview-grid">
          <div className="overview-item">
            <label>Make</label>
            <p>{data.make}</p>
          </div>
          <div className="overview-item">
            <label>Model</label>
            <p>{data.model}</p>
          </div>
          <div className="overview-item">
            <label>Year</label>
            <p>{data.year}</p>
          </div>
          <div className="overview-item">
            <label>Mileage</label>
            <p>{data.mileage}</p>
          </div>
        </div>
      </section>

      {/* MOT Section */}
      <section className="report-section">
        <h2>MOT Status</h2>
        <div className={`mot-status ${data.mot?.status?.toLowerCase().replace(' ', '-')}`}>
          <div className="status-badge">{data.mot?.status}</div>
          {data.mot?.expiry && <p>Expiry: {data.mot.expiry}</p>}
        </div>
      </section>

      {/* Warnings Section */}
      {data.warnings && data.warnings.length > 0 && (
        <section className="report-section warnings-section">
          <h2>Important Warnings</h2>
          <div className="warnings-list">
            {data.warnings.map((w, i) => (
              <div key={i} className="warning-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#dc2626">
                  <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM9 13a1 1 0 11.001.001A1 1 0 019 13zm3-7H8v4h4V6z" />
                </svg>
                <span>{w}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="results-actions">
        <Link to="/" className="btn-secondary">Check Another Vehicle</Link>
        <button className="btn-primary" onClick={() => alert('Download feature coming soon')}>Download Report</button>
      </div>

      <p className="results-meta">Report generated: {data.fetchedAt}</p>
    </div>
  )
}
