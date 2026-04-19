import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

// RGB channel split: 3 stacked clones of the outgoing section offset ±4px,
// two random scan bands displace, hard cut, green flash.
const GlitchTransition = forwardRef(function GlitchTransition(_, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play(currentEl) {
      const container = containerRef.current;
      const flash = container.querySelector('.glitch-flash');
      const band1 = container.querySelector('.glitch-band-1');
      const band2 = container.querySelector('.glitch-band-2');

      // Build three clones of the outgoing section for RGB channel split.
      // sepia+hue-rotate+saturate retints the clone content; mix-blend-mode
      // screen combines the three offsets into visible chromatic fringing.
      const clones = [];
      if (currentEl) {
        const tints = [
          'sepia(1) hue-rotate(-50deg) saturate(5) brightness(1.05)',  // red
          'sepia(1) hue-rotate(60deg) saturate(5) brightness(1.05)',   // green
          'sepia(1) hue-rotate(180deg) saturate(5) brightness(1.05)',  // blue
        ];
        tints.forEach((filter) => {
          const clone = currentEl.cloneNode(true);
          clone.className = 'glitch-rgb-clone';
          clone.style.position = 'absolute';
          clone.style.inset = '0';
          clone.style.pointerEvents = 'none';
          clone.style.mixBlendMode = 'screen';
          clone.style.filter = filter;
          clone.style.opacity = '0';
          container.appendChild(clone);
          clones.push(clone);
        });
      }

      gsap.set(container, { display: 'block' });
      gsap.set([band1, band2], { opacity: 0, x: 0, top: '30%' });

      return new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(container, { display: 'none' });
            gsap.set([band1, band2, flash], { clearProps: 'transform,opacity,top' });
            clones.forEach((c) => c.remove());
          },
        });

        // 3-clone RGB split: red left, green center, blue right, heavier offset
        if (clones.length === 3) {
          tl.set(clones[0], { opacity: 1, x: -6 }, 0)
            .set(clones[1], { opacity: 1, x: 0 }, 0)
            .set(clones[2], { opacity: 1, x: 6 }, 0)
            .to(clones[0], { x: -10, duration: 0.1, ease: 'none' }, 0)
            .to(clones[2], { x: 10, duration: 0.1, ease: 'none' }, 0)
            .to(clones[0], { x: -3, duration: 0.05, ease: 'none' }, 0.1)
            .to(clones[2], { x: 3, duration: 0.05, ease: 'none' }, 0.1);
        }

        // Four random scan bands displace laterally, harder
        const y1 = `${10 + Math.random() * 25}%`;
        const y2 = `${35 + Math.random() * 20}%`;
        const y3 = `${58 + Math.random() * 20}%`;
        const y4 = `${78 + Math.random() * 15}%`;
        tl.set(band1, { top: y1, opacity: 1, x: 0 }, 0.06)
          .set(band2, { top: y2, opacity: 1, x: 0 }, 0.06)
          .to(band1, { x: 38, duration: 0.08, ease: 'power2.out' }, 0.06)
          .to(band2, { x: -30, duration: 0.08, ease: 'power2.out' }, 0.06)
          .set(band1, { top: y3, x: 0 }, 0.14)
          .set(band2, { top: y4, x: 0 }, 0.14)
          .to(band1, { x: -28, duration: 0.06, ease: 'power2.out' }, 0.14)
          .to(band2, { x: 24, duration: 0.06, ease: 'power2.out' }, 0.14);

        // Hard cut — caller swaps section
        tl.call(resolve, null, 0.14);

        // Scanline flash: bright green overlay
        tl.set(flash, { opacity: 1 }, 0.14)
          .to(flash, { opacity: 0, duration: 0.08, ease: 'power2.out' }, 0.14)
          .to(clones, { opacity: 0, duration: 0.06 }, 0.14)
          .to(band1, { opacity: 0, duration: 0.06 }, 0.14)
          .to(band2, { opacity: 0, duration: 0.06 }, 0.14);
      });
    },
  }));

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'none', pointerEvents: 'none' }}
    >
      <div className="glitch-band-1" style={{
        position: 'absolute', left: 0, right: 0, height: '8px',
        background: '#00ff41', boxShadow: '0 0 12px #00ff41', opacity: 0,
      }} />
      <div className="glitch-band-2" style={{
        position: 'absolute', left: 0, right: 0, height: '5px',
        background: '#00ff41', boxShadow: '0 0 10px #00ff41', opacity: 0,
      }} />
      <div className="glitch-flash" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,255,65,0.25)',
        opacity: 0,
      }} />
    </div>
  );
});

export default GlitchTransition;
