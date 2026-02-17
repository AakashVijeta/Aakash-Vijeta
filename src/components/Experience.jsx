import JobList from "./JobList";
import FadeInSection from "./FadeInSection";
import "../styles/Experience.css";

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <FadeInSection>
        <header className="section-header">
          <h2 className="section-title">/ experience</h2>
        </header>
        <JobList />
      </FadeInSection>
    </section>
  );
};

export default Experience;
