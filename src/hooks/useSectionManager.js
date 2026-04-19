import { useEffect, useRef } from 'react';
import { Observer } from 'gsap/Observer';
import gsap from 'gsap';

gsap.registerPlugin(Observer);

const WHEEL_THRESHOLD = 80;   // px accumulated before advancing
const SWIPE_THRESHOLD = 50;   // px minimum swipe travel

export function useSectionManager({ activeIndex, isTransitioning, advance }) {
  const wheelAccRef = useRef(0);
  const observerRef = useRef(null);

  useEffect(() => {
    const onWheel = (e) => {
      if (isTransitioning) return;
      wheelAccRef.current += e.deltaY;
      if (Math.abs(wheelAccRef.current) >= WHEEL_THRESHOLD) {
        const dir = wheelAccRef.current > 0 ? 1 : -1;
        wheelAccRef.current = 0;
        advance(dir);
      }
    };

    const onKey = (e) => {
      if (isTransitioning) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') advance(1);
      if (e.key === 'ArrowUp' || e.key === 'PageUp') advance(-1);
      if (e.key === 't' || e.key === 'T') {
        const current = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute(
          'data-theme',
          current === 'f1' ? 'terminal' : 'f1'
        );
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);

    observerRef.current = Observer.create({
      type: 'touch',
      onDown: () => { if (!isTransitioning) advance(1); },
      onUp:   () => { if (!isTransitioning) advance(-1); },
      minimumMovement: SWIPE_THRESHOLD,
      preventDefault: true,
    });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      observerRef.current?.kill();
    };
  }, [isTransitioning, advance]);

  // Reset wheel accumulator on section change
  useEffect(() => {
    wheelAccRef.current = 0;
  }, [activeIndex]);
}
