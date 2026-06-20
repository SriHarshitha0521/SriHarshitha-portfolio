import Reveal from './Reveal.jsx';

const proofPoints = [
  'Java Full Stack Development',
  'Spring Boot & Microservices',
  'Python E-commerce Development',
  'UX Design Fundamentals',
];

export default function ProofStrip() {
  return (
    <section className="section proof-section-v2" id="proof">
      <Reveal as="div" className="proof-card-v2">
        <p className="section-label">Social Proof</p>
        <h2>Recognized for secure delivery, performance improvement, and independent problem solving.</h2>
        <div className="proof-points-v2">
          {proofPoints.map((point, i) => (
            <Reveal as="span" delay={i * 90} key={point}>{point}</Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
