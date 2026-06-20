import React from 'react';
import { useEffect, useRef, useState } from 'react';

const records = [
  {
    id: 'EVT-01',
    status: 'VERIFIED',
    title: 'Dashboard render pipeline',
    metricValue: 35,
    metricSuffix: '%',
    metricLabel: 'faster load time',
    detail:
      'Rebuilt React rendering paths and component reuse strategy to remove the bottlenecks slowing the dashboard down.',
    evidence: 'Lighthouse before/after · production deploy log',
    tag: 'Frontend',
  },
  {
    id: 'EVT-02',
    status: 'VERIFIED',
    title: 'Microservice uptime, 12 months',
    metricValue: 99.9,
    metricSuffix: '%',
    metricLabel: 'service uptime',
    detail:
      'Spring Boot services in production carrying live REST traffic, with on-call debugging and incident fixes along the way.',
    evidence: 'Service monitoring · incident reports',
    tag: 'Backend',
  },
  {
    id: 'EVT-03',
    status: 'VERIFIED',
    title: 'Encrypted KYC batch processing',
    metricValue: 1000,
    metricPrefix: '',
    metricSuffix: '+',
    metricLabel: 'records per batch, zero loss',
    detail:
      'RSA + AES-256-CBC encryption over SFTP, moving sensitive identity data through compliance pipelines without dropping a record.',
    evidence: 'Batch run logs · compliance sign-off',
    tag: 'Security',
  },
];

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return value;
}

function RecordCard({ record, index, everSeen, inView }) {
  const count = useCountUp(record.metricValue, everSeen);
  const display = record.metricValue % 1 !== 0 ? count.toFixed(1) : Math.round(count).toLocaleString();

  return (
    <article
      className="vault-record"
      style={{ transitionDelay: inView ? `${index * 130}ms` : '0ms' }}
      data-active={everSeen}
      data-inview={inView}
    >
      <div className="vault-record-scan" key={inView ? 'in' : 'out'} data-inview={inView} />

      <div className="vault-record-top">
        <span className="vault-id">{record.id}</span>
        <span className="vault-status">
          <i />
          {record.status}
        </span>
      </div>

      <h3>{record.title}</h3>

      <div className="vault-metric">
        <span className="vault-metric-value">
          {record.metricPrefix}
          {display}
          <small>{record.metricSuffix}</small>
        </span>
        <span className="vault-metric-label">{record.metricLabel}</span>
      </div>

      <p className="vault-detail">{record.detail}</p>

      <div className="vault-footer">
        <span className="vault-tag">{record.tag}</span>
        <span className="vault-evidence">{record.evidence}</span>
      </div>
    </article>
  );
}

export default function ProofVault() {
  const sectionRef = useRef(null);
  const [everSeen, setEverSeen] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEverSeen(true);
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section proof-vault-section" aria-label="Verified delivery records" ref={sectionRef}>
      <div className="vault-grain" aria-hidden="true" />

      <div className="section-heading centered vault-heading">
        <div className="section-label vault-label">
          <i className="vault-label-dot" />
          Verified Delivery Log
        </div>
        <h2>
          Not just skills <span className="vault-dash">—</span> proof of delivery.
        </h2>
        <p>
          Every line below is a recorded outcome, not a claim. Open any project for the source behind the number.
        </p>
      </div>

      <div className="vault-grid" data-active={everSeen}>
        {records.map((record, index) => (
          <RecordCard key={record.id} record={record} index={index} everSeen={everSeen} inView={inView} />
        ))}
      </div>

      <div className="vault-ledger-rail" data-active={inView}>
        <span>SOURCE-VERIFIED</span>
        <span>PRODUCTION DEPLOYED</span>
        <span>AUDIT TRAIL ATTACHED</span>
        <span>NO PLACEHOLDER METRICS</span>
      </div>
    </section>
  );
}
