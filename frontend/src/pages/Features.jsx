import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Binary, Code2, Cpu, GitBranch, Radar, Terminal } from "lucide-react";

const tracks = [
  { name: "Analysis", icon: Binary, title: "Read between the bytes.", text: "Trace the structure of a system. Follow the symbols, map its behavior, and turn observations into understanding.", command: "analyze sample.bin", lines: ["0x00401000  entry_point", "0x00401024  initialize_context", "0x00401080  resolve_symbols", "0x00401120  render_frame"], label: "SYMBOL MAP", color: "var(--mint)" },
  { name: "Game systems", icon: Radar, title: "Understand the play.", text: "Explore how timing, feedback, and game logic shape a player's experience. Every loop is an opportunity to learn.", command: "inspect arena.scene", lines: ["tick.001  initialize_world", "tick.002  synchronize_inputs", "tick.003  simulate_physics", "tick.004  compose_frame"], label: "FRAME TRACE", color: "var(--acid)" },
  { name: "Development", icon: Code2, title: "Make the next thing.", text: "Bring an idea into the world. Prototype quickly, make the details count, and keep improving what people can experience.", command: "build next_experiment", lines: ["module.01  resolve_dependencies", "module.02  compile_sources", "module.03  validate_contracts", "module.04  package_release"], label: "BUILD GRAPH", color: "var(--signal)" },
];

export default function Features() {
  const [selected, setSelected] = useState(0);
  const track = tracks[selected];
  return <div className="features-page section-shell">
    <div className="lab-heading"><div><span className="eyebrow">INSIDE THE LAB / DISCIPLINES</span><h1>Look closer.<br /><span className="accent-text">Go deeper.</span></h1></div><p>Systems to explore. Questions to ask.<br />A workbench for the next idea.</p></div>
    <div className="feature-tabs segmented-control" role="group" aria-label="Research discipline">{tracks.map((item, index) => <button key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}</div>
    <section className="feature-workbench">
      <div className="feature-copy" key={track.name}><track.icon size={32} style={{ color: track.color }} /><h2>{track.title}</h2><p>{track.text}</p><Link to="/demos" className="text-link">Explore the lab <ArrowUpRight size={16} /></Link></div>
      <div className="trace-tool" aria-live="polite"><div className="trace-title"><Terminal size={14} /><span>{track.label}</span><span className="status-led" /></div><p className="trace-command"><span>$</span> {track.command}</p><div className="trace-lines">{track.lines.map((line, index) => <div key={line}><span className="trace-node" style={{ background: track.color }} /><code>{line}</code><span className="trace-order">0{index + 1}</span></div>)}</div><div className="trace-footer"><span>EXAMPLE TRACE</span><span>4 / 4 RESOLVED</span></div></div>
    </section>
    <section className="feature-principles"><div className="section-heading"><div><span className="eyebrow">THE COMMON THREAD</span><h2>Built on a few good principles.</h2></div></div><div className="capability-grid">{[{ icon: Cpu, title: "Understand the system", text: "Investigate the layers, not just the output. The details tell the story." }, { icon: GitBranch, title: "Share the process", text: "Keep discoveries clear, repeatable, and useful to the next curious mind." }, { icon: Code2, title: "Make it tangible", text: "Turn research into prototypes that people can explore and question." }].map((item) => <article className="capability" key={item.title}><item.icon size={28} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
  </div>;
}
