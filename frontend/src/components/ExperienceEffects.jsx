import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useExperience } from "../context/ExperienceContext";

export default function ExperienceEffects() {
  const { pathname } = useLocation();
  const { playPing, motionEnabled } = useExperience();

  useEffect(() => {
    const timers = new Set();
    const click = (event) => {
      const target = event.target instanceof Element && event.target.closest("button, a[href], summary, [role='tab'], [role='switch']");
      if (!target || target.matches(":disabled, [aria-disabled='true']") || target.dataset.sound === "off") return;
      playPing();
      if (!motionEnabled || event.detail === 0) return;
      const pulse = document.createElement("span");
      pulse.className = "click-pulse";
      pulse.setAttribute("aria-hidden", "true");
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      document.body.appendChild(pulse);
      const timer = setTimeout(() => { pulse.remove(); timers.delete(timer); }, 500);
      timers.add(timer);
    };
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      timers.forEach(clearTimeout);
      document.querySelectorAll(".click-pulse").forEach((node) => node.remove());
    };
  }, [playPing, motionEnabled]);

  useEffect(() => {
    if (!motionEnabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let card = null;
    let frame = 0;
    const reset = () => {
      if (card) { card.style.removeProperty("--tilt-x"); card.style.removeProperty("--tilt-y"); card.removeAttribute("data-hover"); }
      card = null;
    };
    const move = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = event.target instanceof Element && event.target.closest("[data-depth], .tech-card:not(form), .team-card");
        if (next !== card) { reset(); card = next || null; }
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
        card.style.setProperty("--shine-x", `${x * 100}%`);
        card.style.setProperty("--shine-y", `${y * 100}%`);
        card.setAttribute("data-hover", "true");
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      cancelAnimationFrame(frame);
      reset();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [motionEnabled, pathname]);
  return null;
}
