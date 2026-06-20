const dots = Array.from({ length: 84 }, (_, index) => {
  const left = (index * 37) % 92;
  const top = (index * 61) % 90;
  const size = 2 + (index % 5) * 0.8;
  const delay = (index % 16) * -0.55;
  const duration = 8 + (index % 10) * 1.1;
  const colorClass = index % 4 === 0 ? 'warm' : index % 5 === 0 ? 'blue' : 'white';

  return { left, top, size, delay, duration, colorClass };
});

export default function CinematicLayer() {
  return (
    <div className="cinematic-layer" aria-hidden="true">
      <div className="dot-field">
        {dots.map((dot, index) => (
          <span
            key={index}
            className={`moving-dot ${dot.colorClass}`}
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
