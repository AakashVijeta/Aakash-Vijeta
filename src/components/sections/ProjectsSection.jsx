import { useSectionContext } from '../../context/SectionContext';
import { projectDetails } from '../../data/projects';

export default function ProjectsSection() {
  const { setOverlayProject } = useSectionContext();

  return (
    <section
      className="section section-stripe"
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '64px 48px 48px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="section-enter-item phosphor"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.45em',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          marginBottom: '40px',
          flexShrink: 0,
        }}
      >
        Projects
        <div className="speed-line" />
      </div>

      {/* 2-column card grid (mobile: single column) */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignContent: 'start',
        }}
      >
        {projectDetails.map((project) => (
          <button
            key={project.slug}
            className="project-card section-enter-item"
            onClick={() => setOverlayProject(project)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s',
              position: 'relative',
            }}
          >
            {/* Full-bleed screenshot */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
              background: 'var(--color-bg)',
            }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
            </div>

            {/* Title + tag */}
            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>
                {project.tag}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                letterSpacing: '0.03em',
                color: 'var(--color-text)',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                marginBottom: '10px',
                fontWeight: 700,
              }}>
                {project.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-muted)',
                lineHeight: 1.5,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {project.subtitle}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
