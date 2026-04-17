import { useState } from 'react';
import { useSectionContext } from '../../context/SectionContext';
import { projectDetails } from '../../data/projects';

export default function ProjectsSection() {
  const { setOverlayProject } = useSectionContext();
  const [hovered, setHovered] = useState(null);

  return (
    <section
      className="section section-stripe"
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header row */}
      <div
        className="section-enter-item"
        style={{
          padding: '28px 48px 20px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem',
          letterSpacing: '0.45em',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}
      >
        Projects
      </div>

      {/* Project rows — full width, stacked */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {projectDetails.map((project, i) => (
          <button
            key={project.slug}
            className="section-enter-item"
            onClick={() => setOverlayProject(project)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              padding: '0 48px',
              borderBottom: i < projectDetails.length - 1 ? '1px solid var(--color-border)' : 'none',
              background: hovered === i ? 'var(--color-surface)' : 'transparent',
              transition: 'background 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent left bar on hover */}
            <div style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: '3px',
              background: 'var(--color-accent)',
              transform: hovered === i ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'bottom',
              transition: 'transform 0.2s ease',
            }} />

            {/* Number */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: hovered === i ? 'var(--color-accent)' : 'var(--color-border)',
              letterSpacing: '0.05em',
              flexShrink: 0,
              transition: 'color 0.2s',
              minWidth: '80px',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Text content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                {project.tag}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 3vw, 1.8rem)',
                letterSpacing: '0.04em',
                color: 'var(--color-text)',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: '10px',
              }}>
                {project.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--color-muted)',
                lineHeight: 1.5,
                maxWidth: '520px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {project.subtitle}
              </div>
            </div>

            {/* Image thumbnail */}
            <div style={{
              flexShrink: 0,
              width: 'clamp(120px, 18vw, 220px)',
              aspectRatio: '16/9',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              opacity: hovered === i ? 1 : 0.4,
              transition: 'opacity 0.3s',
            }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Arrow */}
            <div style={{
              flexShrink: 0,
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: hovered === i ? 'var(--color-accent)' : 'var(--color-border)',
              transition: 'color 0.2s, transform 0.2s',
              transform: hovered === i ? 'translateX(4px)' : 'translateX(0)',
            }}>
              →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
