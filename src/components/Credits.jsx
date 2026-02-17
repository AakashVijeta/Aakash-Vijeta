import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";

const Credits = () => {
  return (
    <FadeInSection>
      <footer id="credits">
        <div className="ending-credits">
          <span>
            Built and designed by <strong>Aakash Vijeta</strong>.
          </span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </FadeInSection>
  );
};

export default Credits;
