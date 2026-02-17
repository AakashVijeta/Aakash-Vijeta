import { useState, useCallback } from "react";
import "../styles/Intro.css";
import Typist from "react-typist-component";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import ParticlePortrait from "./ParticlePortrait";

function Intro() {
  const [activeKey, setActiveKey] = useState("1");

  const handleSelect = useCallback((eventKey) => {
    setActiveKey(eventKey);
  }, []);

  return (
    <div id="intro">
      <div className="intro-simulation">
        <ParticlePortrait />
      </div>

      <div className="intro-block">
        <Typist typingDelay={120} cursor={<span className="cursor">|</span>}>
          <span className="intro-title">
            {"hi, "}
            <span className="intro-name">{"aakash"}</span>
            {" here."}
          </span>
        </Typist>

        <FadeInSection delay="200ms">
          <div className="intro-desc">
            I'm am a wannabe AI engineer with a passion for building
            things that make a difference. I have experience in web development,
            machine learning, and data science. I'm currently looking for
            opportunities to grow and learn.
          </div>

          <a href="mailto:aakashvijeta2@gmail.com" className="intro-contact">
            <EmailRoundedIcon />
            {" Say hi!"}
          </a>
        </FadeInSection>
      </div>
    </div>
  );
}

export default Intro;
