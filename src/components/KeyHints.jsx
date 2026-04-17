import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function KeyHints() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const show = () => {
      if (hiddenRef.current) return;
      timerRef.current = setTimeout(() => {
        setVisible(true);
        gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      }, 3000);
    };

    const hide = () => {
      clearTimeout(timerRef.current);
      if (visible) {
        hiddenRef.current = true;
        gsap.to(ref.current, { opacity: 0, duration: 0.3 });
      }
    };

    show();
    window.addEventListener('keydown', hide);
    window.addEventListener('wheel', hide, { passive: true });
    window.addEventListener('touchstart', hide);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('wheel', hide);
      window.removeEventListener('touchstart', hide);
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className="key-hints"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        letterSpacing: '2px',
        color: 'var(--color-muted)',
        zIndex: 1000,
        opacity: 0,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span>↑↓ navigate</span>
      <span style={{ color: 'var(--color-border)' }}>·</span>
      <span>T toggle mode</span>
    </div>
  );
}
