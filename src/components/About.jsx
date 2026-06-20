import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';

const roles = ['Java Full Stack Developer', 'React.js Engineer', 'Spring Boot Builder', 'API Architect'];

const facts = [
  { k: '3', v: 'years building production software' },
  { k: '6+', v: 'real systems shipped to live users' },
  { k: '99.9%', v: 'uptime on services I own' },
];

export default function About() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section about-section" id="about">
      <Reveal as="div" className="section-label about-label">About Me</Reveal>

      <div className="about-layout-v2">
        <Reveal as="div" className="about-statement" delay={80}>
          <h2>
            I build software that <span className="about-highlight">works in production</span>,
            not just in a demo.
          </h2>
          <p className="about-lede">
            Three years deep in Spring Boot, React, and the unglamorous parts of shipping — secure
            APIs, clean data flows, and code that survives contact with real users.
          </p>
          <div className="quick-proof">
            <span>Remote-ready</span>
            <span>Agile/Scrum</span>
            <span>Code Review</span>
            <span>API Design</span>
          </div>
        </Reveal>

        <Reveal as="div" className="about-badge-wrap" delay={180}>
          <div className="about-badge">
            <div className="about-badge-ring" />
            <div className="about-badge-core">
              <span className="about-badge-eyebrow">Currently</span>
              <span className="about-badge-role" key={roleIndex}>{roles[roleIndex]}</span>
              <span className="about-badge-dot"><i /> Open to work</span>
            </div>
          </div>

          <div className="about-facts">
            {facts.map((fact, i) => (
              <Reveal as="div" className="about-fact" delay={260 + i * 90} key={fact.v}>
                <strong>{fact.k}</strong>
                <span>{fact.v}</span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
