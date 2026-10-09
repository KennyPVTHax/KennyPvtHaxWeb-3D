import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../mock";
import { useExperience } from "../context/ExperienceContext";

const frequencies = ["arena", "frost", "neon"];
const categories = ["GAME SYSTEMS", "REVERSE ENGINEERING", "CORE RESEARCH"];

export default function ProjectsSection() {
  const navigate = useNavigate();
  const { setTheme } = useExperience();
  return <section id="projects" className="section-shell">
    <div className="section-heading"><div><span className="eyebrow">01 / SELECTED EXPERIMENTS</span><h2>From the <span className="accent-text">workbench.</span></h2></div><p>Independent explorations at the intersection of reverse engineering, game systems, and creative code.</p></div>
    <div className="project-grid">{projects.map((project, index) => <article key={project.id} className="tech-card project-card" style={{ "--card-accent": project.accent }}>
      <div className="project-art"><img src={project.image} alt={project.name + " project identity"} loading="lazy" width="400" height="240" /><span className="project-index">/ 00{index + 1}</span><span className="project-category">{categories[index]}</span></div>
      <div className="project-content"><span className="eyebrow">{project.tagline.toUpperCase()}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.features.slice(0, 3).map((feature) => <span key={feature}>{feature}</span>)}</div><button onClick={() => { setTheme(frequencies[index]); navigate("/demos"); }}>Explore project <ArrowUpRight size={17} /></button></div>
    </article>)}</div>
  </section>;
}
