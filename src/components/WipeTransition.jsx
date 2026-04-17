import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
CustomEase.create('wipeIn',  'M0,0 C0.76,0 0.24,1 1,1');
CustomEase.create('wipeOut', 'M0,0 C0.76,0 0.24,1 1,1');

// play() returns a Promise that resolves at mid-point (section swap moment).
// Caller swaps the active section on resolve; wipe then retracts.
const WipeTransition = forwardRef(function WipeTransition(_, ref) {
  const divRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play() {
      const el = divRef.current;
      return new Promise((resolve) => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)', display: 'block' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.18,
            ease: 'wipeIn',
            onComplete: () => {
              resolve();
              gsap.to(el, {
                clipPath: 'inset(0 0 0 100%)',
                duration: 0.18,
                ease: 'wipeOut',
                onComplete: () => {
                  gsap.set(el, { display: 'none' });
                },
              });
            },
          }
        );
      });
    }
  }));

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#e10600',
        zIndex: 9999,
        display: 'none',
        pointerEvents: 'none',
      }}
    />
  );
});

export default WipeTransition;
