import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Radio } from "lucide-react";

export default function PromoBanner() {
  return <div className="dispatch-strip"><Link to="/demos"><Radio size={13} /><span><b>LAB DISPATCH 002</b><span className="dispatch-detail"> / </span>Neon Breach. Frozen Trace. Arena Forge.</span><ArrowRight size={14} /></Link></div>;
}
