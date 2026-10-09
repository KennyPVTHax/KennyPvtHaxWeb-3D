import React, { lazy, Suspense, useState } from "react";
import { Box, Layers3, Pause, Play, RotateCcw, Scan } from "lucide-react";
import { IconButton } from "./ExperienceControls";
import { useExperience } from "../context/ExperienceContext";

const CoreScene = lazy(() => import("./CoreScene"));

export default function CoreViewer({ className = "" }) {
  const [exploded, setExploded] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [available, setAvailable] = useState(null);
  const { motionEnabled } = useExperience();
  return <div className={`core-viewer ${className}`}>
    <Suspense fallback={<div className="core-fallback"><i /><i /><i /><strong>K/X</strong></div>}>
      <CoreScene exploded={exploded} wireframe={wireframe} playing={playing} resetKey={resetKey} onAvailabilityChange={setAvailable} />
    </Suspense>
    <div className="scene-label scene-label-top"><span className="crosshair">+</span><span>KX-01<br /><b>PROCESSOR ASSEMBLY</b></span></div>
    <div className="scene-label scene-label-bottom"><span className="status-led" />{available === false ? "STATIC PREVIEW / 3D UNAVAILABLE" : exploded ? "LAYERS / ISOLATED" : "LAYERS / ASSEMBLED"}</div>
    <div className="scene-controls" role="group" aria-label="3D model controls">
      <IconButton disabled={!available} label={exploded ? "Assemble core" : "Explode core"} aria-pressed={exploded} onClick={() => setExploded((v) => !v)}>{exploded ? <Layers3 size={17} /> : <Box size={17} />}</IconButton>
      <IconButton disabled={!available} label="Wireframe view" aria-pressed={wireframe} onClick={() => setWireframe((v) => !v)}><Scan size={17} /></IconButton>
      <IconButton label={playing ? "Pause rotation" : "Resume rotation"} disabled={!motionEnabled || !available} aria-pressed={playing && motionEnabled} onClick={() => setPlaying((v) => !v)}>{playing && motionEnabled ? <Pause size={16} /> : <Play size={16} />}</IconButton>
      <IconButton disabled={!available} label="Reset camera" onClick={() => setResetKey((v) => v + 1)}><RotateCcw size={16} /></IconButton>
    </div>
  </div>;
}
