export default function CreditsSection() {
  return (
    <section
      className="section section-stripe"
      style={{ flexDirection: 'column', gap: '16px', textAlign: 'center' }}
    >
      <div
        className="section-enter-item"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        Credits
      </div>

      <p
        className="section-enter-item"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
          lineHeight: 1.8,
          maxWidth: '400px',
        }}
      >
        Designed &amp; built by Aakash Vijeta.<br />
        Built with React, Vite, and GSAP.<br />
        Deployed on Vercel.
      </p>

      <div
        className="section-enter-item"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'var(--color-border)',
          marginTop: '16px',
        }}
      >
        © {new Date().getFullYear()} Aakash Vijeta
      </div>
    </section>
  );
}
