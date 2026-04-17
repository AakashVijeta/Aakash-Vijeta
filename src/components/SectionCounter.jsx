import { useSectionContext } from '../context/SectionContext';

export default function SectionCounter() {
  const { activeIndex, total } = useSectionContext();
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '24px',
      fontFamily: 'var(--font-display)',
      fontSize: '11px',
      letterSpacing: '3px',
      color: 'var(--color-muted)',
      zIndex: 1000,
      userSelect: 'none',
    }} className="section-counter">
      <span style={{ color: 'var(--color-accent)' }}>{pad(activeIndex + 1)}</span>
      <span>/{pad(total)}</span>
    </div>
  );
}
