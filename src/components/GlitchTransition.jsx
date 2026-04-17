import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

// play() resolves at the hard-cut moment. Caller swaps section on resolve.
const GlitchTransition = forwardRef(function GlitchTransition(_, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play() {
      const container = containerRef.current;

      return new Promise((resolve) => {
        const red   = container.querySelector('.glitch-r');
        const blue  = container.querySelector('.glitch-b');
        const s1    = container.querySelector('.glitch-s1');
        const s2    = container.querySelector('.glitch-s2');
        const flash = container.querySelector('.glitch-flash');

        gsap.set(container, { display: 'block' });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(container, { display: 'none' });
            gsap.set([red, blue, s1, s2, flash], { clearProps: 'all' });
          }
        });

        // RGB channel split (80ms)
        tl.to(red,  { x:  4, opacity: 0.5, duration: 0.04, ease: 'none' })
          .to(blue, { x: -4, opacity: 0.5, duration: 0.04, ease: 'none' }, '<')
          // Random slice bands
          .to(s1, {
            scaleY: 1,
            y: `${20 + Math.random() * 40}%`,
            duration: 0.06,
            ease: 'none',
          })
          .to(s2, {
            scaleY: 1,
            y: `${50 + Math.random() * 30}%`,
            duration: 0.06,
            ease: 'none',
          }, '<')
          // Hard cut — caller swaps section
          .call(resolve)
          // Scanline flash
          .to(flash, { opacity: 0.6, duration: 0.02, ease: 'none' })
          .to(flash, { opacity: 0, duration: 0.04, ease: 'none' })
          // Retract RGB split
          .to(red,  { x: 0, opacity: 0, duration: 0.04, ease: 'none' }, '<')
          .to(blue, { x: 0, opacity: 0, duration: 0.04, ease: 'none' }, '<')
          .to([s1, s2], { scaleY: 0, duration: 0.02 }, '<');
      });
    }
  }));

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'none', pointerEvents: 'none' }}
    >
      <div className="glitch-r" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(255,0,0,0)', mixBlendMode: 'screen',
        outline: '9999px solid rgba(255,40,40,0)',
      }} />
      <div className="glitch-b" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,255,0)', mixBlendMode: 'screen',
        outline: '9999px solid rgba(40,40,255,0)',
      }} />
      <div className="glitch-s1" style={{
        position: 'absolute', left: 0, right: 0, height: '4px',
        background: '#00ff41', opacity: 0.7, scaleY: 0, transformOrigin: 'top',
      }} />
      <div className="glitch-s2" style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: '#00ff41', opacity: 0.5, scaleY: 0, transformOrigin: 'top',
      }} />
      <div className="glitch-flash" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,255,65,0.15)', opacity: 0,
      }} />
    </div>
  );
});

export default GlitchTransition;
