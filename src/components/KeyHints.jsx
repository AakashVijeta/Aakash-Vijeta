import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSectionContext } from '../context/SectionContext';

export default function KeyHints() {
  const ref = useRef(null);
  const { activeIndex } = useSectionContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (activeIndex !== 0) return null;

  return (
    <div
      ref={ref}
      className="key-hints"
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
        letterSpacing: '0.3em',
        color: 'var(--color-muted)',
        textTransform: 'uppercase',
        opacity: 0,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span>[↑][↓] navigate</span>
      <span style={{ color: 'var(--color-border)' }}>·</span>
      <span>[T] toggle mode</span>
    </div>
  );
}
