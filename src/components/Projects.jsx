import "../styles/Projects.css";
import portfolioImg from "../assets/portfolio.png";
import nomanslandImg from "../assets/nomansland.png";
import talltalesImg from "../assets/talltales.png";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import Carousel from "react-bootstrap/Carousel";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

const spotlightProjects = [
  {
    title: "No Man's Land",
    desc: "A third-person survival-mode game where you battle against time and space to return to Earth.",
    techStack: "C# (Unity)",
    link: "https://github.com/slakh96/no-mans-land",
    open: "https://gazijarin.itch.io/no-mans-land",
    image: nomanslandImg,
  },
  {
    title: "Tall Tales",
    desc: "A multiplayer storytelling web game using sockets for real-time gameplay.",
    techStack: "Node.js (Socket.io), React.js, MongoDB",
    link: "https://github.com/gazijarin/TallTales",
    open: "https://talltales.herokuapp.com/",
    image: talltalesImg,
  },
  {
    title: "Portfolio.js",
    desc: "A small JS library that helps with clear and succinct data presentation.",
    techStack: "Node.js (Express.js)",
    link: "https://github.com/gazijarin/Portfolio.js",
    open: "https://afternoon-ocean-92382.herokuapp.com/",
    image: portfolioImg,
  },
];

const projects = [
  {
    title: "TDSB Homework Management Interface",
    desc: "Application with Flask backend and Vue frontend.",
    techStack: "Python (Flask), Vue.js, SQL",
    link: "https://github.com/gazijarin/TDSBHomeworkManagement",
    open: "https://tdsb-app.herokuapp.com/",
  },
  {
    title: "Adam A.I.",
    desc: "Genetic algorithm AI that learns to traverse a maze.",
    techStack: "JavaScript, HTML, CSS",
    link: "https://github.com/gazijarin/adamai",
    open: "https://gazijarin.github.io/AdamAI/",
  },
  {
    title: "Minimax Stonehenge",
    desc: "Two-player zero-sum game with strategic Minimax AI.",
    techStack: "Python",
    link: "https://github.com/gazijarin/stonehenge",
  },
];

const Projects = () => {
  return (
    <section id="projects">
      <header className="section-header">
        <h2 className="section-title">/ projects</h2>
      </header>

      {/* Spotlight Carousel */}
      <Carousel>
        {spotlightProjects.map((project) => (
          <Carousel.Item key={project.title}>
            <img
              className="d-block w-100"
              src={project.image}
              alt={project.title}
            />

            <div className="caption-bg">
              <Carousel.Caption>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <p className="techStack">{project.techStack}</p>

                <ExternalLinks
                  githubLink={project.link}
                  openLink={project.open}
                />
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Project Grid */}
      <div className="project-container">
        <ul className="projects-grid">
          {projects.map((project, i) => (
            <FadeInSection key={project.title} delay={`${(i + 1) * 100}ms`}>
              <li className="projects-card">
                <div className="card-header">
                  <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />

                  <ExternalLinks
                    githubLink={project.link}
                    openLink={project.open}
                  />
                </div>

                <div className="card-title">{project.title}</div>
                <div className="card-desc">{project.desc}</div>
                <div className="card-tech">{project.techStack}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
