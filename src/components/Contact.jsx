import React from 'react';
import { useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/kurre-sri-harshitha-3101a1215/', 
  github: 'https://github.com/SriHarshitha0521',       
};

function MagneticButton({ href, children, className, ...rest }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.38}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sent

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name || 'your website'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:harshithakuree@gmail.com?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
        />
      </label>
      <button type="submit" className="contact-form-submit">
        {status === 'sent' ? 'Opening your email app…' : 'Send Message'} <i>↗</i>
      </button>
      <p className="contact-form-hint">This opens your email client with the message pre-filled.</p>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="section contact-section-v2" id="contact">
      <div className="contact-orb contact-orb-one" aria-hidden="true" />
      <div className="contact-orb contact-orb-two" aria-hidden="true" />

      <Reveal as="div" className="contact-intro">
        <p className="section-label">Contact</p>
        <h2>
          Got something to build? <br />
          <span className="contact-highlight">Let&apos;s talk.</span>
        </h2>
        <p className="contact-sub">
          Available for freelance, part-time, and Java Full Stack opportunities.
        </p>

        <div className="social-row">
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM8 19h-3v-9h3v9zM6.5 8.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zM20 19h-3v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.59v4.73z"/></svg>
            <span>LinkedIn</span>
          </a>
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.4-2.69 5.37-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>
            <span>GitHub</span>
          </a>
        </div>
      </Reveal>

      <Reveal as="div" className="contact-actions-v2" delay={120}>
        <MagneticButton href="mailto:harshithakuree@gmail.com?subject=Let%27s%20work%20together" className="contact-magnetic-btn">
          <span>Hire Me</span>
          <i>↗</i>
        </MagneticButton>

        <div className="contact-card-v2">
          <span>Phone</span>
          <a href="tel:+919381418752">+91 93814 18752</a>
        </div>
        <div className="contact-card-v2">
          <span>Email</span>
          <a href="mailto:harshithakuree@gmail.com">harshithakuree@gmail.com</a>
        </div>
        <a className="ghost-btn contact-resume-btn" href="/Sriharshitha_Java_Fullstack_Resume.pdf" target="_blank" rel="noreferrer">
          View Resume
        </a>
      </Reveal>

      <Reveal as="div" className="contact-form-wrap" delay={180}>
        <ContactForm />
      </Reveal>
    </section>
  );
}
