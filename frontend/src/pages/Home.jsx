import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Binary, Code2, Cpu, Gamepad2, GitBranch, Terminal } from "lucide-react";
import { telegramUrl } from "../mock";
import CoreViewer from "../components/CoreViewer";
import ProjectsSection from "../components/ProjectsSection";
import DemosSection from "../components/DemosSection";
import FeedbackSection from "../components/FeedbackSection";

const capabilities = [
  { icon: Binary, title: "Break it down.", sub: "REVERSE ENGINEERING", text: "From raw bytes to the bigger picture. Explore the structures beneath the surface." },
  { icon: Gamepad2, title: "Push the play.", sub: "GAME SYSTEMS", text: "Timing, telemetry, and a feel for the game. Experiments made for curious players." },
  { icon: Code2, title: "Build it forward.", sub: "CREATIVE DEVELOPMENT", text: "Turn the discoveries into tools, prototypes, and unexpected new experiences." },
];

export default function Home() {
  return <div className="home-page">
    <section className="core-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> REVERSE ENGINEERING / GAMING</div>
          <h1>Kenny<span>PvtHax</span><span className="hero-heading-dot">.</span></h1>
          <p className="hero-tagline">Beneath the game.<br /> Beyond the ordinary.</p>
          <p className="hero-description">An independent lab for curious minds. We take systems apart, explore the possibilities, and build what comes next.</p>
          <div className="hero-actions"><Link to="/demos" className="button-primary">Explore the lab <ArrowUpRight size={18} /></Link><Link to="/team" className="button-secondary">Meet the developers <ArrowRight size={17} /></Link></div>
          <div className="hero-footnote"><span className="status-led" /> ALWAYS CURIOUS. NEVER FINISHED.</div>
        </div>
        <CoreViewer className="hero-model" />
        <span className="hero-side-note" aria-hidden="true">DISASSEMBLE / UNDERSTAND / REIMAGINE</span>
      </div>
      <div className="hero-bottom"><div className="hero-bottom-inner"><a href="#projects" className="scroll-cue"><ArrowDown size={15} /> SCROLL TO DISCOVER</a><span><Cpu size={14} /> KX-01 / OPEN ASSEMBLY</span><span className="mono hero-bottom-end">EST. 2024 <span className="accent-text">[ INDEPENDENT ]</span></span></div></div>
    </section>
    <div className="discipline-strip"><div><span><Binary size={18} /> REVERSE ENGINEERING</span><i>+</i><span><Gamepad2 size={18} /> GAME SYSTEMS</span><i>+</i><span><Terminal size={18} /> CREATIVE CODING</span><i>+</i><span><GitBranch size={18} /> OPEN EXPLORATION</span></div></div>
    <ProjectsSection />
    <section className="capability-section section-shell">
      <div className="section-heading"><div><span className="eyebrow">02 / THE MINDSET</span><h2>Curiosity is the <span className="accent-text">engine.</span></h2></div><Link to="/features" className="text-link">Inside the lab <ArrowUpRight size={17} /></Link></div>
      <div className="capability-grid">{capabilities.map((item, i) => <article className="capability" key={item.sub}><span className="capability-number">0{i + 1}</span><item.icon size={28} /><span className="eyebrow">{item.sub}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    <DemosSection />
    <section className="crew-callout section-shell"><div><span className="eyebrow">04 / PEOPLE OVER PROTOCOLS</span><h2>A few minds.<br /><span className="accent-text">Zero ordinary ideas.</span></h2></div><div><p>Researchers, developers, and players. Different obsessions, one shared drive to see what is possible.</p><Link to="/team" className="button-secondary">Meet the crew <ArrowUpRight size={17} /></Link></div><span className="crew-callout-mark" aria-hidden="true">{ "{ }" }</span></section>
    <FeedbackSection />
    <section className="community-band section-shell"><div><span className="eyebrow">THE NEXT DISCOVERY STARTS WITH A CONVERSATION</span><h2>Stay in the loop.</h2></div><a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="button-primary">Join the community <ArrowUpRight size={18} /></a></section>
  </div>;
}
