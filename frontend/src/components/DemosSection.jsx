import React, { useRef, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DemosSection() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const play = async () => {
    try {
      await videoRef.current.play();
      setStarted(true);
      setError("");
    } catch { setError("Playback is unavailable. Open the interactive lab instead."); }
  };
  return <section className="reel-section" id="demos"><div className="section-shell">
    <div className="section-heading"><div><span className="eyebrow">03 / AFTER HOURS</span><h2>A different <span className="accent-text">world view.</span></h2></div><Link to="/demos" className="text-link">Explore the interactive lab <ArrowUpRight size={17} /></Link></div>
    <div className="reel-viewer"><video ref={videoRef} src="/cyber-city-2.mp4" poster="/reel-poster.jpg" aria-label="Cyber city concept reel" playsInline preload="metadata" controls={started} onEnded={() => setStarted(false)} onError={() => setError("Playback is unavailable. Open the interactive lab instead.")} />
      {!started && <div className="reel-overlay"><button className="reel-play" aria-label="Play concept reel" onClick={play}><Play size={21} fill="currentColor" /></button><span>TRANSMISSION / 002</span></div>}
    </div>
    <div className="reel-caption"><span>KENNY LAB / VISUAL ARCHIVE</span><span>CYBER CITY / CONCEPT REEL</span></div>
    {error && <p className="reel-error" role="status">{error}</p>}
  </div></section>;
}
