import React from "react";
import { Terminal } from "lucide-react";
import { ThemeSwatches } from "./ExperienceControls";

export default function StatusBar() {
  return <div className="status-strip"><div className="status-inner">
    <span className="status-brand"><Terminal size={12} /> KX / RESEARCH DIVISION <span className="status-version">VOL. 02</span></span>
    <div className="status-right"><span className="status-demo"><span className="status-led" /> CONCEPT BUILD</span><ThemeSwatches /></div>
  </div></div>;
}
