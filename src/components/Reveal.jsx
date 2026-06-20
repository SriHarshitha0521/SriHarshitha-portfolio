import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children and adds a data-active attribute once the element
 * scrolls into view. Children/CSS decide what "active" looks like.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, threshold = 0.01, once = false, children, style, ...rest }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setActive(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal
      data-active={active}
      style={{ transitionDelay: active ? `${delay}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
