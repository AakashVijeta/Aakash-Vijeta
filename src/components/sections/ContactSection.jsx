import { useState } from 'react';

const EMAIL = 'aakashvijeta2@gmail.com';
const GITHUB = 'https://github.com/AakashVijeta';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="section section-stripe"
      style={{ flexDirection: 'column', gap: '32px', textAlign: 'center' }}
    >
      <div
        className="section-enter-item"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
        }}
      >
        Contact
      </div>

      <button
        className="section-enter-item"
        onClick={copyEmail}
        style={{
          all: 'unset',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 3vw, 1.8rem)',
          letterSpacing: '0.1em',
          color: 'var(--color-text)',
          textShadow: 'var(--glow)',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}
      >
        {EMAIL}
      </button>

      <div
        className="section-enter-item"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'var(--color-muted)',
          height: '14px',
        }}
      >
        {copied ? '[ copied ]' : '[ click to copy ]'}
      </div>

      <div className="section-enter-item" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '2px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--color-accent)';
            e.currentTarget.style.borderColor = 'var(--color-accent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--color-muted)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
