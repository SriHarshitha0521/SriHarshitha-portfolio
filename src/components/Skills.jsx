import Reveal from './Reveal.jsx';

const skills = [
  { group: 'Frontend', items: ['React.js', 'Redux', 'Context API', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Material UI'], direction: 'left' },
  { group: 'Backend', items: ['Java 8/17', 'Spring Boot 3.x', 'Spring Security', 'REST APIs', 'Microservices', 'JWT', 'JMS'], direction: 'right' },
  { group: 'Database & QA', items: ['PostgreSQL', 'MySQL', 'Hibernate', 'JPA', 'SQL Optimization', 'JUnit', 'JMeter'], direction: 'left' },
  { group: 'Workflow', items: ['Git', 'Maven', 'Swagger/OpenAPI', 'Postman', 'Apache Tomcat', 'CI/CD', 'JIRA'], direction: 'right' },
];

function MarqueeRow({ group, items, direction, index }) {
  const doubled = [...items, ...items];
  return (
    <Reveal as="div" className="skill-row" delay={index * 90}>
      <span className="skill-row-label">{group}</span>
      <div className={`skill-marquee dir-${direction}`}>
        <div className="skill-marquee-track">
          {doubled.map((item, i) => (
            <span className="skill-pill-v2" key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <Reveal as="div" className="section-heading compact skills-heading">
        <div className="section-label">Skills & Tools</div>
        <h2>The practical stack behind every delivery above.</h2>
      </Reveal>

      <div className="skills-rows">
        {skills.map((skill, index) => (
          <MarqueeRow key={skill.group} index={index} {...skill} />
        ))}
      </div>
    </section>
  );
}
