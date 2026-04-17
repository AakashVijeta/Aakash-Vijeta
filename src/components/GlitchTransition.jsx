import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

// play(currentEl) applies filter+shake to the outgoing section, resolves at hard-cut.
const GlitchTransition = forwardRef(function GlitchTransition(_, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play(currentEl) {
      const container = containerRef.current;
      const s1    = container.querySelector('.glitch-s1');
      const s2    = container.querySelector('.glitch-s2');
      const flash = container.querySelector('.glitch-flash');

      gsap.set(container, { display: 'block' });
      gsap.set([s1, s2], { opacity: 0, x: 0, top: '30%' });

      return new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(container, { display: 'none' });
            gsap.set([s1, s2, flash], { clearProps: 'all' });
            if (currentEl) gsap.set(currentEl, { clearProps: 'filter,x' });
          }
        });

        // Glitch the outgoing section: hue-rotate + lateral shake
        if (currentEl) {
          tl.to(currentEl, {
            filter: 'brightness(2) hue-rotate(120deg) saturate(5)',
            x: 6,
            duration: 0.05,
            ease: 'none',
          }, 0)
            .to(currentEl, { x: -5, duration: 0.03, ease: 'none' }, 0.05)
            .to(currentEl, { x: 0, filter: 'none', duration: 0.02 }, 0.08);
        }

        // Bright horizontal bands displace laterally
        const y1 = `${10 + Math.random() * 30}%`;
        const y2 = `${55 + Math.random() * 25}%`;
        tl.set(s1, { top: y1, opacity: 1, x: 0 }, 0.02)
          .set(s2, { top: y2, opacity: 0.8, x: 0 }, 0.02)
          .to(s1, { x: 24, duration: 0.06, ease: 'power2.out' }, 0.02)
          .to(s2, { x: -18, duration: 0.06, ease: 'power2.out' }, 0.03);

        // Hard cut — caller swaps section
        tl.call(resolve, null, 0.09);

        // Flash then fade
        tl.set(flash, { opacity: 0.65 }, 0.09)
          .to(flash, { opacity: 0, duration: 0.15, ease: 'power2.out' }, 0.09)
          .to(s1, { opacity: 0, x: 40, duration: 0.08 }, 0.09)
          .to(s2, { opacity: 0, x: -32, duration: 0.08 }, 0.09);
      });
    }
  }));

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'none', pointerEvents: 'none' }}
    >
      <div className="glitch-s1" style={{
        position: 'absolute', left: 0, right: 0, height: '3px',
        background: 'linear-gradient(to right, #00ff41 70%, transparent)',
        opacity: 0,
      }} />
      <div className="glitch-s2" style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(to left, #00ff41 70%, transparent)',
        opacity: 0,
      }} />
      <div className="glitch-flash" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,255,65,0.18)',
        opacity: 0,
      }} />
    </div>
  );
});

export default GlitchTransition;
