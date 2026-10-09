import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Send } from "lucide-react";
import { navLinks, telegramUrl, ownerUrl } from "../mock";

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">K<span>/</span>X</span><span className="brand-name">Kenny<span>PvtHax</span><small>INDEPENDENT RESEARCH LAB</small></span></Link><p>For the ones who ask how it works.<br />And then take it apart to find out.</p></div>
      <div><h4>EXPLORE</h4><ul>{navLinks.map((link) => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}</ul></div>
      <div><h4>FIND US ELSEWHERE</h4><ul className="footer-social"><li><a href={telegramUrl} target="_blank" rel="noopener noreferrer"><Send size={13} /> Telegram <ArrowUpRight size={12} /></a></li><li><a href="https://github.com/saptansh69-hub/KennyPvtHaxWeb" target="_blank" rel="noopener noreferrer"><Github size={13} /> GitHub <ArrowUpRight size={12} /></a></li><li><a href={ownerUrl} target="_blank" rel="noopener noreferrer">Get in touch <ArrowUpRight size={12} /></a></li></ul></div>
    </div>
    <div className="footer-bottom"><span>{new Date().getFullYear()} KENNYPVTHAX / ALL SYSTEMS CURIOUS.</span><span>FICTIONAL PROJECTS & CONCEPT ROSTER</span><span><span className="status-led" /> END OF TRANSMISSION</span></div>
  </footer>;
}
