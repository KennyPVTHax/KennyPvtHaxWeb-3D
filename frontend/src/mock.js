// Demo data for KennyPvtHax — frontend-only creative direction

export const serverStatus = {
  status: "ONLINE",
  statusLabel: "Creative lab online",
  lastPatch: "2025-07-14T09:32:00Z",
  version: "V-4.5",
  undetected: true,
  activeUsers: 2847,
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Demos", to: "/demos" },
  { label: "Team", to: "/team" },
  { label: "Projects", to: "/#projects" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
];

export const projects = [
  {
    id: "og",
    code: "01",
    name: "OG Interface",
    tagline: "Tactical HUD concept",
    description:
      "A gritty competitive overlay concept with radar panels, loadout telemetry and match-flow readouts for a cinematic gaming site.",
    image: "/og-interface.jpg",
    demoVideo: "https://youtu.be/haxLwKBHczk",
    features: ["Match telemetry", "Tactical HUD", "Replay panels", "Neon arena mood"],
    accent: "#7fff00",
    hasAdmin: false,
  },
  {
    id: "frozen",
    code: "02",
    name: "Frozen Fire",
    tagline: "Reverse lab cockpit",
    description:
      "A colder blue interface direction with decompiler windows, packet traces and layered diagnostics for reverse-engineering flavor.",
    image: "/frozen-fire.jpg",
    demoVideo: "https://youtu.be/vZdVazJzRAk",
    features: ["Trace console", "Static analysis cards", "Stream-safe visuals", "Blue fire palette"],
    accent: "#2fa8ff",
    hasAdmin: false,
  },
  {
    id: "admin",
    code: "03",
    name: "Kenny Core",
    tagline: "Boss-room showcase",
    description:
      "The most cinematic demo: red command glass, 3D module stacks and a high-intensity control-room feel for the final brand direction.",
    image: "/kenny-admin.webp",
    demoVideo: "https://youtu.be/oZnN0pWfRdU",
    features: ["3D command grid", "Developer wall", "Boss-level reveal", "Premium identity"],
    accent: "#e50914",
    hasAdmin: true,
  },
];

// Pricing plans. OG & Frozen share the same standard tiers. Admin is weekly-only.
export const pricingPlans = {
  standard: [
    { id: "1day", label: "1 Day", duration: "24 hours", inr: 120, usd: 1, popular: false },
    { id: "7day", label: "7 Day", duration: "1 week", inr: 600, usd: 6, popular: true },
    { id: "month", label: "Month Access", duration: "30 days", inr: 1500, usd: 15, popular: false },
  ],
  admin: [
    { id: "admin-week", label: "Admin Key", duration: "1 week subscription", inr: 1000, usd: 10, popular: true },
  ],
};

// Buildable product list = each project x its available plans
export const products = [
  { project: "OG Interface", projectId: "og", plans: pricingPlans.standard },
  { project: "Frozen Fire", projectId: "frozen", plans: pricingPlans.standard },
  { project: "Kenny Core", projectId: "admin", plans: pricingPlans.admin },
];

export const coreFeatures = [
  { code: "01", title: "Reverse lab styling", desc: "Decompiler panes, trace logs and memory-map visuals give every page technical weight." },
  { code: "02", title: "Gaming HUD language", desc: "Arena cards, weaponized typography and live-status panels keep the energy competitive." },
  { code: "03", title: "Responsive 3D depth", desc: "Layered transforms, tilted panels and cockpit sections scale down cleanly on mobile." },
  { code: "04", title: "Demo-safe content", desc: "The copy is written as a fictional showcase so the brand feels intense without promising real exploits." },
  { code: "05", title: "Developer identity", desc: "A dedicated team page highlights roles, tools and build disciplines behind the project." },
  { code: "06", title: "Selectable directions", desc: "Three visual directions are ready to compare before locking the final production design." },
];

export const showcaseStats = [
  { value: "3", label: "Design demos" },
  { value: "12", label: "Interface modules" },
  { value: "100%", label: "Responsive pass" },
  { value: "24/7", label: "Gaming vibe" },
];

export const demoFeedback = [
  {
    id: "demo-feedback-1",
    name: "Vector",
    rating: 5,
    message: "The Neon Breach option feels like a launch screen and a lab console in one place.",
  },
  {
    id: "demo-feedback-2",
    name: "Ash",
    rating: 5,
    message: "Frozen Trace is the cleanest direction if the site needs to look more technical and premium.",
  },
];

export const faqs = [
  { q: "Are these real products?", a: "No. This first pass is a visual demo set using fictional reverse-engineering and gaming language." },
  { q: "Can we pick one direction later?", a: "Yes. The Demos page is built so we can select one visual direction and carry it across the whole website." },
  { q: "Can the team page use real names?", a: "Yes. The current team content is placeholder-style and can be replaced once you share final developer details." },
  { q: "Can checkout and pricing be removed?", a: "Yes. They remain from the base repo for now, but the final site can become a pure portfolio, community hub or product showcase." },
];

export const designDirections = [
  {
    id: "neon",
    code: "DEMO_01",
    name: "Neon Breach",
    tone: "Redline intensity. Uncompromising focus.",
    summary:
      "The pulse of the lab. Signal red, exposed circuitry, and the energy of a system pushed to its limits.",
    palette: ["#ff5267", "#76e5d5", "#22272f"],
    stats: ["3D hero rig", "red glass", "boss-room CTA"],
  },
  {
    id: "frost",
    code: "DEMO_02",
    name: "Frozen Trace",
    tone: "Cold precision. Clear perspective.",
    summary:
      "Follow the evidence. Glacial mint and quiet graphite for the patient work of decoding what lies beneath.",
    palette: ["#76e5d5", "#ff8094", "#22272f"],
    stats: ["trace grid", "analysis cards", "calmer UI"],
  },
  {
    id: "arena",
    code: "DEMO_03",
    name: "Arena Forge",
    tone: "Arena energy. Collective instinct.",
    summary:
      "Built for the next round. Electric lime, competitive instinct, and a shared drive to make every move count.",
    palette: ["#c6f274", "#83baff", "#22272f"],
    stats: ["team hub", "loadout tiles", "arcade glow"],
  },
];

export const teamMembers = [
  {
    name: "Kenny",
    role: "Creative Lead",
    handle: "@KennyPvtHax",
    focus: "Brand direction, community voice, release presentation",
    stack: ["Creative ops", "UI taste", "Community"],
  },
  {
    name: "Cipher",
    role: "Reverse Engineering",
    handle: "@cipherlab",
    focus: "Static analysis visuals, binary-map storytelling and lab documentation",
    stack: ["IDA-style flows", "Frida concepts", "Protocol notes"],
  },
  {
    name: "Nova",
    role: "Frontend Developer",
    handle: "@novaui",
    focus: "React surfaces, responsive systems and animation polish",
    stack: ["React", "Tailwind", "Motion"],
  },
  {
    name: "Rift",
    role: "Game Systems Designer",
    handle: "@riftops",
    focus: "HUD language, competitive loops and playable interface metaphors",
    stack: ["HUD design", "Game loops", "Telemetry"],
  },
];

export const telegramHandle = "@KennyPvtHacks";
export const telegramUrl = "https://t.me/KennyPvtHacks";
export const ownerHandle = "@CrimeCell";
export const ownerUrl = "https://t.me/CrimeCell";
export const logoSrc = "/kenny-logo.jpg";

// Video links
export const heroBgVideo = "https://youtu.be/COa9LDmZBzs"; // cyberpunk background
export const featuredShowcaseVideo = "https://youtu.be/T63ZwaEUPCw"; // main gameplay reel

// 69 LOVER SALE — 7-day countdown starting today 9AM IST
export const promo = {
  label: "69 LOVER SALE",
  startISO: "2026-08-16T09:00:00+05:30",
  endISO: "2026-08-23T09:00:00+05:30",
  discountedProjects: ["og", "frozen"],
  // discounted INR price per plan (month stays at normal price)
  discountInr: { "1day": 69, "7day": 369 },
  discountUsd: { "1day": 1, "7day": 5 },
  qrByAmount: { 69: "/qr-69.png", 369: "/qr-369.png" },
};
