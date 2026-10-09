import React from "react";
import PricingCards from "../components/PricingCards";
import { faqs } from "../mock";

const Pricing = () => {
  return (
    <div className="relative">
      <div className="radial-red absolute inset-x-0 top-0 h-72" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono2 text-xs uppercase tracking-widest text-red-500">Packages / demo pricing</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Pick a <span className="text-red-500">concept package.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-zinc-500">
            Pick your project. Choose your access. Find your next experiment.
          </p>
        </div>

        <div className="mt-14">
          <PricingCards />
        </div>

        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Frequently asked</h2>
          <div className="mt-8 divide-y divide-zinc-800 border-y border-zinc-800">
            {faqs.map((f) => (
              <details key={f.q} className="group px-2 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-zinc-200">
                  {f.q}
                  <span className="font-mono2 text-red-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
