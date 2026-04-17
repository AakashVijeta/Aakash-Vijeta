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
          'sepia(1) hue-rotate(-50deg) saturate(8) brightness(1.1)',  // red
          'sepia(1) hue-rotate(60deg) saturate(8) brightness(1.1)',   // green
          'sepia(1) hue-rotate(180deg) saturate(8) brightness(1.1)',  // blue
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
            gsap.set([band1, band2, flash], { clearProps: 'all' });
            clones.forEach((c) => c.remove());
          },
        });

        // 3-clone RGB split: red left, green center, blue right, offset ±4px
        if (clones.length === 3) {
          tl.set(clones[0], { opacity: 0.8, x: -4 }, 0)
            .set(clones[1], { opacity: 0.8, x: 0 }, 0)
            .set(clones[2], { opacity: 0.8, x: 4 }, 0)
            .to(clones[0], { x: -6, duration: 0.08, ease: 'none' }, 0)
            .to(clones[2], { x: 6, duration: 0.08, ease: 'none' }, 0);
        }

        // Two random scan bands displace laterally (60ms)
        const y1 = `${10 + Math.random() * 30}%`;
        const y2 = `${55 + Math.random() * 25}%`;
        tl.set(band1, { top: y1, opacity: 1, x: 0 }, 0.08)
          .set(band2, { top: y2, opacity: 0.9, x: 0 }, 0.08)
          .to(band1, { x: 28, duration: 0.06, ease: 'power2.out' }, 0.08)
          .to(band2, { x: -22, duration: 0.06, ease: 'power2.out' }, 0.08);

        // Hard cut — caller swaps section
        tl.call(resolve, null, 0.14);

        // Scanline flash: green overlay, 40ms fade
        tl.set(flash, { opacity: 0.7 }, 0.14)
          .to(flash, { opacity: 0, duration: 0.04, ease: 'power2.out' }, 0.14)
          .to(clones, { opacity: 0, duration: 0.06 }, 0.14)
          .to(band1, { opacity: 0, duration: 0.06 }, 0.14)
          .to(band2, { opacity: 0, duration: 0.06 }, 0.14);
      });
    },
  }));

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'none', pointerEvents: 'none' }}
    >
      <div className="glitch-band-1" style={{
        position: 'absolute', left: 0, right: 0, height: '3px',
        background: '#00ff41', opacity: 0,
      }} />
      <div className="glitch-band-2" style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: '#00ff41', opacity: 0,
      }} />
      <div className="glitch-flash" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,255,65,0.22)',
        opacity: 0,
      }} />
    </div>
  );
});

export default GlitchTransition;
