import React from "react";
import { ArrowUpRight, Check, Gamepad2, ScanSearch, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { designDirections } from "../mock";
import { useExperience, themes } from "../context/ExperienceContext";
import CoreViewer from "../components/CoreViewer";

const icons = { neon: Terminal, frost: ScanSearch, arena: Gamepad2 };

export default function DesignDemos() {
  const { theme, setTheme } = useExperience();
  const active = designDirections.find((direction) => direction.id === theme);
  return <div className="lab-page">
    <section className="lab-stage section-shell">
      <div className="lab-heading"><div><span className="eyebrow">THE LAB / EXPERIMENT 002</span><h1>One core.<br /><span className="accent-text">Three identities.</span></h1></div><p>Redline intensity. Cold precision. Arena energy.<br />Find your frequency.</p></div>
      <div className="lab-switcher" role="group" aria-label="Visual direction">{designDirections.map((direction, i) => {
        const Icon = icons[direction.id];
        return <button key={direction.id} onClick={() => setTheme(direction.id)} aria-pressed={direction.id === theme}><span className="mono">0{i + 1}</span><Icon size={18} /><span>{direction.name}</span><span className="direction-indicator" style={{ background: themes[direction.id].color }} /></button>;
      })}</div>
      <div className="lab-scene-layout"><CoreViewer className="lab-model" /><div className="lab-readout" key={theme}><span className="eyebrow">{active.code} / ACTIVE FREQUENCY</span><h2>{active.name}</h2><p>{active.tone}</p><div className="lab-palette">{active.palette.map((color) => <span key={color} style={{ background: color }} title={color} />)}</div><div className="code-readout"><p><span>01</span><b>load</b> kenny.core</p><p><span>02</span><b>bind</b> {theme}.profile</p><p><span>03</span><b>resolve</b> assembly.layers</p><p><span>04</span><b>status</b> <em>ready</em><i className="terminal-caret" /></p></div><Link to="/" className="text-link">Open full experience <ArrowUpRight size={17} /></Link></div></div>
    </section>
    <section className="section-shell direction-section"><div className="section-heading"><div><span className="eyebrow">CHOOSE YOUR FREQUENCY</span><h2>Same DNA. Different energy.</h2></div></div><div className="direction-grid">{designDirections.map((direction, i) => {
      const Icon = icons[direction.id];
      return <article key={direction.id} className={`direction-card ${theme === direction.id ? "selected" : ""}`} data-depth style={{ "--card-accent": themes[direction.id].color }}><div className="direction-card-head"><Icon size={25} /><span className="mono">0{i + 1}</span></div><h3>{direction.name}</h3><p>{direction.summary}</p><div className="direction-bars">{direction.palette.map((color) => <span key={color} style={{ background: color }} />)}</div><button onClick={() => setTheme(direction.id)} aria-pressed={theme === direction.id} className="direction-apply">{theme === direction.id ? "Active frequency" : "Apply frequency"}{theme === direction.id ? <Check size={16} /> : <ArrowUpRight size={16} />}</button></article>;
    })}</div></section>
  </div>;
}
