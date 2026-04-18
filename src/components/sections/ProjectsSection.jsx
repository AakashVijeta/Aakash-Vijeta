import { useSectionContext } from '../../context/SectionContext';
import { projectDetails } from '../../data/projects';

const CLASSIFIED_SLOTS = [
  { slug: '__c1', codename: 'CLASSIFIED', tag: 'REDACTED' },
  { slug: '__c2', codename: 'CLASSIFIED', tag: 'REDACTED' },
  { slug: '__c3', codename: 'CLASSIFIED', tag: 'REDACTED' },
];

export default function ProjectsSection() {
  const { setOverlayProject } = useSectionContext();
  const cards = [...projectDetails, ...CLASSIFIED_SLOTS];

  return (
    <section
      className="section section-stripe evidence-board"
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '48px 56px',
        overflow: 'hidden',
      }}
    >
      <div className="evidence-wrap">
        {/* TOP BAR */}
        <div className="evidence-topbar section-enter-item">
          <div className="evidence-title">
            EVIDENCE BOARD
            <div className="speed-line" />
          </div>
          <div className="evidence-topmeta">
            <div>SECTION 002</div>
            <div>//  FIELD_RECORDS</div>
          </div>
        </div>

        {/* CARD ROW */}
        <div className="evidence-row section-enter-item">
          {cards.map((p, i) => {
            const isClassified = p.slug.startsWith('__');
            const caseNo = (i + 1).toString().padStart(2, '0');
            return (
              <button
                key={p.slug}
                className={`evidence-card ${isClassified ? 'evidence-card-classified' : ''}`}
                onClick={() => !isClassified && setOverlayProject(p)}
                disabled={isClassified}
              >
                <div className="evidence-card-top">
                  <span className="evidence-card-case">CASE / {caseNo}</span>
                  <span className={`evidence-card-dot ${isClassified ? 'dot-red' : ''}`} />
                </div>

                <div className="evidence-card-media">
                  {!isClassified && <img src={p.image} alt={p.title} />}
                  {isClassified && (
                    <div className="evidence-classified-stamp">
                      <span>CLASSIFIED</span>
                      <span>████████</span>
                    </div>
                  )}
                  <div className="evidence-card-bracket tl" />
                  <div className="evidence-card-bracket tr" />
                  <div className="evidence-card-bracket bl" />
                  <div className="evidence-card-bracket br" />
                </div>

                <div className="evidence-card-meta">
                  <span className="evidence-card-tag">{p.tag}</span>
                  <span className="evidence-card-cta">{isClassified ? 'LOCKED' : 'ENTER_FILE →'}</span>
                </div>

                <div className="evidence-card-name">
                  {isClassified ? p.codename : p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* BOTTOM BAR */}
        <div className="evidence-bottom section-enter-item">
          <span>{projectDetails.length.toString().padStart(2, '0')} ACTIVE · {CLASSIFIED_SLOTS.length.toString().padStart(2, '0')} CLASSIFIED</span>
          <span>◁  SCROLL · NAVIGATE  ▷</span>
        </div>
      </div>
    </section>
  );
}
