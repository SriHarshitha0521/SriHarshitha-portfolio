import React from 'react';
import { useRef } from 'react';
import Reveal from './Reveal.jsx';

const projects = [
  {
    tag: 'Government Identity · API Integration',
    title: 'DigiLocker / Meri Pehchaan Application',
    summary:
      'A secure identity-document integration concept: OAuth consent, token exchange, user details, issued documents, file URI access, and session revocation.',
    challenge: 'Make verified digital documents accessible through a clean, secure application flow.',
    result: 'Clear consent-first architecture for trusted document access and verification.',
    impact: ['OAuth 2.0 + PKCE', 'Issued document APIs', 'User details flow', 'Token/session revocation'],
    stack: ['React', 'Spring Boot', 'OAuth 2.0', 'PKCE', 'REST APIs', 'JWT'],
    glow: '#5aa7ff',
  },
  {
    tag: 'Compliance · KYC Platform',
    title: 'CKYC Compliance & Verification System',
    summary:
      'Secure KYC workflows with reusable React components, Spring Boot services, encrypted SFTP processing, and production-ready compliance screens.',
    challenge: 'Handle sensitive KYC data with strong security and consistent production reliability.',
    result: 'Zero data loss across encrypted KYC batches and cleaner scalable microservice design.',
    impact: ['RSA + AES-256-CBC', '1K records / batch', '30% less duplication', 'Production code reviews'],
    stack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'SFTP', 'Postman'],
    glow: '#ff9d3d',
  },
  {
    tag: 'Finance · Transaction Platform',
    title: 'TA Wallet Financial Application',
    summary:
      'Wallet dashboards, payment gateway integrations, optimized rendering, and reliable financial microservices for transaction workflows.',
    challenge: 'Create fast dashboards and reliable APIs for financial operations.',
    result: 'Improved frontend load speed while maintaining stable production service uptime.',
    impact: ['35% faster UI', 'Under 1.5s APIs', '10K+ wallet records', '99.9% uptime'],
    stack: ['React', 'Redux', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'JMeter'],
    glow: '#42ff91',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateX = (0.5 - py) * 7;
    const rotateY = (px - 0.5) * 9;
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <Reveal
      as="article"
      className="project-card-v2"
      delay={index * 110}
      style={{ '--glow': project.glow }}
    >
      <div
        ref={cardRef}
        className="project-tilt"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="project-glow" />
        <div className="project-topline">
          <span className="project-index">0{index + 1}</span>
          <p className="project-tag">{project.tag}</p>
        </div>

        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="case-mini">
          <div><b>Challenge</b><span>{project.challenge}</span></div>
          <div><b>Result</b><span>{project.result}</span></div>
        </div>

        <div className="impact-list">
          {project.impact.map((point) => <span key={point}>{point}</span>)}
        </div>

        <div className="stack-row">
          {project.stack.map((tool) => <small key={tool}>{tool}</small>)}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section className="section projects-section" id="work">
      <Reveal as="div" className="section-heading projects-heading">
        <div className="section-label">Project Showcase</div>
        <h2>Real systems, real constraints, real outcomes.</h2>
      </Reveal>

      <div className="project-grid-v2">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}
