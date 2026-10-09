import React from "react";
import { useNavigate } from "react-router-dom";
import { Download as DownloadIcon, Send, Smartphone, ShieldCheck, Layers3 } from "lucide-react";
import { serverStatus, telegramUrl } from "../mock";

const steps = [
  { code: "01", title: "Pick a direction", desc: "Compare the concept demos and choose the strongest identity for the final site." },
  { code: "02", title: "Share notes", desc: "Send the team your preferred colors, sections, names and developer details." },
  { code: "03", title: "Build the pass", desc: "Carry the chosen direction across every page and production surface." },
  { code: "04", title: "Launch", desc: "Deploy the finished site on your VPS behind a domain and HTTPS." },
];

const builds = [
  { name: "Neon Breach package", tag: "Red command UI", size: "Concept" },
  { name: "Frozen Trace package", tag: "Blue lab UI", size: "Concept" },
];

const Download = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="radial-red absolute inset-x-0 top-0 h-72" />
      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono2 text-xs uppercase tracking-widest text-red-500">Direction / package</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Package the final <span className="text-red-500">look.</span>
          </h1>
          <div className="mt-5 inline-flex items-center gap-3 border border-zinc-800 bg-zinc-900/60 px-4 py-2 font-mono2 text-xs">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-green-400" />
            <span className="text-green-400">{serverStatus.status}</span>
            <span className="text-zinc-500">· {serverStatus.version} · demo-ready</span>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {builds.map((b) => (
            <div key={b.name} className="flex items-center justify-between border border-zinc-800 bg-zinc-900/40 p-5 clip-corner">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border border-red-600/50 bg-red-600/10">
                  <Smartphone className="h-5 w-5 text-red-500" />
                </span>
                <div>
                  <p className="font-display font-bold text-white">{b.name}</p>
                  <p className="font-mono2 text-xs text-zinc-500">{b.tag} · {b.size}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/pricing")}
                className="inline-flex items-center gap-2 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors clip-corner"
              >
                <DownloadIcon className="h-4 w-4" /> Review
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 border border-red-900/40 bg-red-950/20 p-4 text-sm text-zinc-400 clip-corner">
          <Layers3 className="h-5 w-5 shrink-0 text-red-500" />
          These are concept packages for review. The final version can keep pricing or become a pure portfolio/community site.
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.code} className="border-l-2 border-red-600/50 pl-4">
                <span className="font-mono2 text-sm text-red-500">{s.code}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border border-zinc-800 bg-zinc-900/40 p-8 text-center clip-corner">
          <ShieldCheck className="h-8 w-8 text-red-500" />
          <h3 className="font-display text-xl font-bold">Need help with setup?</h3>
          <p className="max-w-md text-sm text-zinc-500">Share final names, links, developer roles and screenshots when you are ready for the production pass.</p>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-red-600/50 bg-red-600/10 px-6 py-3 text-sm font-semibold text-red-300 hover:bg-red-600/20 transition-colors clip-corner"
          >
            <Send className="h-4 w-4" /> Open Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Download;
