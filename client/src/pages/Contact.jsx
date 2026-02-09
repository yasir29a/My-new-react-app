import React, { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    alert('Thanks, we received your message (demo)')
    setName(''); setEmail(''); setMessage('')
  }

  return (
    <div className="page contact-page" id="contact">
      <h1>Contact Us</h1>
      <p>Have questions? Send us a message and our support team will reply shortly.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />
        <button className="btn-primary" type="submit">Send Message</button>
      </form>
    </div>
  )
}
