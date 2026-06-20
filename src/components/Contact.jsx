import React from 'react';
import { useRef } from 'react';
import Reveal from './Reveal.jsx';


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
          Available for internship, freelance, part-time, and Java Full Stack opportunities.
        </p>
      </Reveal>

      <Reveal as="div" className="contact-actions-v2" delay={120}>
        <MagneticButton href="mailto:harshithakuree@gmail.com" className="contact-magnetic-btn">
          <span>Email Me</span>
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
    </section>
  );
}
