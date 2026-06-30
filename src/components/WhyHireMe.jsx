import React from 'react';
import Reveal from './Reveal.jsx';

const reasons = [
  {
    n: '01',
    title: 'I ship, not just code',
    text: 'Every project listed here is a real system that went to production — not a tutorial clone. I care about what survives contact with real users.',
  },
  {
    n: '02',
    title: 'Full stack, end to end',
    text: 'I work comfortably across React on the frontend and Spring Boot/Java on the backend, so you get one developer who understands the whole flow, not two half-fits.',
  },
  {
    n: '03',
    title: 'Security & performance first',
    text: 'OAuth, JWT, encrypted data pipelines, optimized queries, and load-tested APIs — built in from day one, not bolted on after a breach or a slow demo.',
  },
  {
    n: '04',
    title: 'Clear communication, fast turnaround',
    text: 'Agile/Scrum background, comfortable with code reviews, async updates, and tight deadlines. You will always know where the project stands.',
  },
  {
    n: '05',
    title: 'Adapts to your stack, not the other way around',
    text: 'Comfortable picking up new tools, codebases, and conventions quickly — so onboarding me onto an existing project is fast, not a multi-week ramp-up.',
  },
  {
    n: '06',
    title: 'Honest scoping, no surprises',
    text: 'I estimate realistically, flag risks early, and would rather tell you a deadline is tight than miss it silently. What you agree to is what you get.',
  },
];

export default function WhyHireMe() {
  return (
    <section className="section why-hire-section" id="why-hire">
      <Reveal as="div" className="section-heading why-hire-heading">
        <div className="section-label">Why Hire Me</div>
        <h2>One developer. Zero hand-holding.</h2>
      </Reveal>

      <div className="why-hire-grid">
        {reasons.map((reason, i) => (
          <Reveal as="div" className="why-hire-card" delay={i * 110} key={reason.n}>
            <span className="why-hire-index">{reason.n}</span>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
