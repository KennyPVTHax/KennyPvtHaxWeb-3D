import React from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { themes, useExperience } from "../context/ExperienceContext";

export function IconButton({ label, children, className = "", ...props }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} data-tooltip={label} {...props}>{children}</button>;
}

export function ThemeSwatches() {
  const { theme, setTheme } = useExperience();
  return <div className="theme-swatches" role="group" aria-label="Color theme">
    {Object.entries(themes).map(([id, entry]) => <button key={id} type="button" className="theme-swatch" style={{ "--swatch": entry.color }} aria-label={entry.name} aria-pressed={theme === id} data-tooltip={entry.name} onClick={() => setTheme(id)}><span /></button>)}
  </div>;
}

export default function ExperienceControls() {
  const { sound, toggleSound, motionEnabled, toggleMotion } = useExperience();
  return <div className="experience-controls">
    <IconButton label={sound ? "Mute click sounds" : "Enable click sounds"} aria-pressed={sound} data-sound="off" onClick={toggleSound}>{sound ? <Volume2 size={17} /> : <VolumeX size={17} />}</IconButton>
    <IconButton label={motionEnabled ? "Reduce motion" : "Enable motion"} aria-pressed={motionEnabled} onClick={toggleMotion}>{motionEnabled ? <Pause size={16} /> : <Play size={16} />}</IconButton>
  </div>;
}
