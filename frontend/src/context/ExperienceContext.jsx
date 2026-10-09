import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const themes = {
  neon: { name: "Neon Breach", color: "#ff5267", secondary: "#76e5d5" },
  frost: { name: "Frozen Trace", color: "#76e5d5", secondary: "#ff8094" },
  arena: { name: "Arena Forge", color: "#c6f274", secondary: "#83baff" },
};

const ExperienceContext = createContext(null);
const read = (key, fallback) => {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
};
const save = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* Storage is optional in private browsers. */ }
};

export function ExperienceProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const value = read("kenny.theme", "neon");
    return themes[value] ? value : "neon";
  });
  const [sound, setSoundState] = useState(() => read("kenny.sound", "on") === "on");
  const [motion, setMotionState] = useState(() => read("kenny.motion", "system"));
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const audio = useRef(null);
  const lastPing = useRef(0);
  const motionEnabled = motion === "system" ? !reduced : motion === "on";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = motionEnabled ? "on" : "off";
  }, [theme, motionEnabled]);

  const playPing = useCallback((force = false) => {
    if ((!sound && !force) || document.hidden) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio || performance.now() - lastPing.current < 55) return;
    lastPing.current = performance.now();
    try {
      // Creation stays inside a user gesture to respect browser autoplay policies.
      const context = audio.current || (audio.current = new Audio());
      if (context.state === "suspended") context.resume().catch(() => {});
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(920, now);
      oscillator.frequency.exponentialRampToValueAtTime(610, now + 0.09);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.055, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.11);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch { /* Audio support must never block navigation. */ }
  }, [sound]);

  useEffect(() => () => { audio.current?.close().catch(() => {}); audio.current = null; }, []);

  const setTheme = (value) => {
    if (!themes[value]) return;
    setThemeState(value);
    save("kenny.theme", value);
  };
  const toggleSound = () => {
    const next = !sound;
    setSoundState(next);
    save("kenny.sound", next ? "on" : "off");
    if (next) playPing(true);
  };
  const toggleMotion = () => {
    const next = motionEnabled ? "off" : "on";
    setMotionState(next);
    save("kenny.motion", next);
  };

  return <ExperienceContext.Provider value={{ theme, setTheme, sound, toggleSound, playPing, motionEnabled, toggleMotion }}>{children}</ExperienceContext.Provider>;
}

export const useExperience = () => useContext(ExperienceContext);
