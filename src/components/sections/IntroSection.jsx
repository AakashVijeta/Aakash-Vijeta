import { useEffect, useState } from 'react';
import Typist from 'react-typist-component';
import ParticlePortrait from '../ParticlePortrait';

export default function IntroSection({ isActive }) {
  const [ready, setReady] = useState(() =>
    typeof window !== 'undefined' && !!sessionStorage.getItem('preloaded')
  );

  useEffect(() => {
    if (ready) return;
    const handler = () => setReady(true);
    window.addEventListener('preloader:done', handler);
    return () => window.removeEventListener('preloader:done', handler);
  }, [ready]);

  return (
    <section
      className="section section-stripe"
      style={{
        flexDirection: 'column',
        gap: '32px',
        position: 'relative',
      }}
    >
      <div className="section-enter-item" style={{ display: 'flex', justifyContent: 'center' }}>
        <ParticlePortrait />
      </div>

      <div className="section-enter-item" style={{ textAlign: 'center' }}>
        {isActive && ready ? (
          <Typist typingDelay={100} cursor={<span style={{ color: 'var(--color-accent)' }}>|</span>}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              textShadow: 'var(--glow)',
            }}>
              Aakash Vijeta
            </span>
          </Typist>
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}

        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: 'var(--color-muted)',
          marginTop: '8px',
          textTransform: 'uppercase',
        }}>
          Full Stack Developer · IIT Guwahati
        </div>
      </div>
    </section>
  );
}
