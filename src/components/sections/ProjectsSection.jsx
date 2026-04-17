import { useSectionContext } from '../../context/SectionContext';
import { projectDetails } from '../../data/projects';

export default function ProjectsSection() {
  const { setOverlayProject } = useSectionContext();

  return (
    <section className="section section-stripe" style={{ flexDirection: 'column', padding: '0 5vw', overflowY: 'auto' }}>
      <h2
        className="section-enter-item"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
          letterSpacing: '0.4em',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          marginBottom: '40px',
          alignSelf: 'flex-start',
        }}
      >
        Projects
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {projectDetails.map((project) => (
          <button
            key={project.slug}
            className="section-enter-item"
            onClick={() => setOverlayProject(project)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              overflow: 'hidden',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--glow-strong)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '16px 18px' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                {project.tag}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--color-text)',
                lineHeight: 1.4,
              }}>
                {project.title}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
