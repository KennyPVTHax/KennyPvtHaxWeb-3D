import React, { useState } from "react";
import { ArrowUpRight, Braces, Code2, Cpu, Crosshair, Github, Radio } from "lucide-react";
import { teamMembers, telegramUrl } from "../mock";

const roles = ["All crew", "Engineering", "Creative"];
const icons = [Crosshair, Cpu, Code2, Braces];

export default function Team() {
  const [filter, setFilter] = useState("All crew");
  const members = teamMembers.map((member, i) => ({ ...member, index: i, discipline: i === 1 || i === 2 ? "Engineering" : "Creative" })).filter((member) => filter === "All crew" || member.discipline === filter);
  return <div className="team-page">
    <section className="team-intro section-shell"><div><span className="eyebrow">THE PEOPLE / TEAM & DEVELOPERS</span><h1>Human minds.<br /><span className="accent-text">Machine curiosity.</span></h1><p>A small crew with a shared obsession: understanding how things work, and imagining how they could work differently.</p></div><div className="crew-emblem" aria-hidden="true"><div className="emblem-plane plane-back" /><div className="emblem-plane plane-middle" /><div className="emblem-plane plane-front"><Code2 size={80} strokeWidth={1} /></div><span>THE KX COLLECTIVE</span></div></section>
    <section className="crew-section section-shell"><div className="crew-toolbar"><div className="segmented-control" role="group" aria-label="Team discipline">{roles.map((role) => <button key={role} aria-pressed={filter === role} onClick={() => setFilter(role)}>{role}</button>)}</div><span className="mono crew-count" aria-live="polite">{String(members.length).padStart(2, "0")} OPERATORS / CONCEPT ROSTER</span></div>
      <div className="team-grid">{members.map((member) => {
        const Icon = icons[member.index];
        return <article className={`team-card operator-${member.index}`} key={member.name}>
          <div className="operator-art"><span className="operator-id">KX / 00{member.index + 1}</span><span className="operator-monogram">{member.name.slice(0, 1)}</span><div className="operator-glyph"><Icon size={48} strokeWidth={1.2} /></div><span className="operator-discipline">{member.discipline.toUpperCase()}</span><div className="operator-barcode" /></div>
          <div className="operator-info"><p className="eyebrow">{member.role}</p><h2>{member.name}</h2><span className="operator-handle">{member.handle}</span><p className="operator-focus">{member.focus}</p><div className="operator-stack">{member.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        </article>;
      })}</div>
    </section>
    <section className="team-values section-shell"><div><span className="eyebrow">HOW WE THINK</span><h2>Good questions.<br />Better experiments.</h2></div><div className="values-list">{[{ title: "Stay curious", text: "The most interesting part of a system is usually the part you have not understood yet." }, { title: "Build together", text: "Research gets better when different perspectives meet. Share the process, credit the people." }, { title: "Keep iterating", text: "A prototype is a conversation starter. Test it, question it, and make the next version count." }].map((value, i) => <div key={value.title}><span className="mono">0{i + 1}</span><div><h3>{value.title}</h3><p>{value.text}</p></div></div>)}</div></section>
    <section className="team-links section-shell"><a href="https://github.com/saptansh69-hub/KennyPvtHaxWeb" target="_blank" rel="noopener noreferrer"><Github size={24} /><div><span className="eyebrow">SOURCE / OPEN REPOSITORY</span><h3>Follow the build.</h3></div><ArrowUpRight size={22} /></a><a href={telegramUrl} target="_blank" rel="noopener noreferrer"><Radio size={24} /><div><span className="eyebrow">COMMUNITY / OPEN CHANNEL</span><h3>Join the conversation.</h3></div><ArrowUpRight size={22} /></a></section>
  </div>;
}
