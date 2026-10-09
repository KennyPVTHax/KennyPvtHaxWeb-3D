const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs/promises");
const { chromium } = require("playwright");
const { PNG } = require("pngjs");

const baseURL = process.env.PREVIEW_URL || "http://localhost:3000";
const output = path.resolve(__dirname, "../../previews");
const launch = {
  args: ["--no-sandbox", "--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader", "--disable-dev-shm-usage"],
};
if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;

function pixels(buffer) {
  const png = PNG.sync.read(buffer);
  let bright = 0;
  for (let i = 0; i < png.data.length; i += 4) {
    if (Math.max(png.data[i], png.data[i + 1], png.data[i + 2]) > 90) bright += 1;
  }
  return { data: png.data, bright };
}

async function run() {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch(launch);
  const errors = [];
  const badAssets = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    window.__audioProbe = { contexts: 0, tones: 0 };
    const NativeAudio = window.AudioContext;
    if (!NativeAudio) return;
    window.AudioContext = class extends NativeAudio {
      constructor(...args) { super(...args); window.__audioProbe.contexts += 1; }
      createOscillator() { window.__audioProbe.tones += 1; return super.createOscillator(); }
    };
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && !new URL(response.url()).pathname.startsWith("/api/")) badAssets.push(response.url());
  });
  const goto = async (route) => {
    await page.goto(baseURL + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
  };
  const capture = (name, fullPage = true) => page.screenshot({ path: path.join(output, name + ".png"), fullPage });

  try {
    await goto("/");
    await page.waitForSelector('.core-scene[data-ready="true"] canvas');
    assert.equal(await page.evaluate(() => window.__audioProbe.contexts), 0, "Audio must not start before a gesture");
    const canvas = page.locator(".core-scene canvas");
    const movingA = pixels(await canvas.screenshot());
    await page.waitForTimeout(450);
    const movingB = pixels(await canvas.screenshot());
    assert(movingA.bright > 500, "The 3D canvas must contain visible geometry");
    assert(!movingA.data.equals(movingB.data), "The core must animate");

    await page.getByRole("button", { name: "Pause rotation", exact: true }).click();
    await page.waitForTimeout(400);
    assert((await page.evaluate(() => window.__audioProbe.tones)) > 0, "A real click must synthesize a ping");
    await page.getByRole("button", { name: "Mute click sounds", exact: true }).click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(700);
    const mutedTones = await page.evaluate(() => window.__audioProbe.tones);
    const pausedA = pixels(await canvas.screenshot());
    await page.waitForTimeout(220);
    const pausedB = pixels(await canvas.screenshot());
    assert(pausedA.data.equals(pausedB.data), "Pause must stop the model");

    await page.getByRole("button", { name: "Wireframe view", exact: true }).click();
    await page.waitForTimeout(150);
    assert(!pixels(await canvas.screenshot()).data.equals(pausedA.data), "Wireframe must alter the rendered geometry");
    await page.getByRole("button", { name: "Wireframe view", exact: true }).click();
    await page.getByRole("button", { name: "Assemble core", exact: true }).click();
    await page.waitForTimeout(1400);
    assert(!pixels(await canvas.screenshot()).data.equals(pausedA.data), "Assemble must change the model");
    await page.getByRole("button", { name: "Explode core", exact: true }).click();
    await page.waitForTimeout(1400);
    const beforeDrag = pixels(await canvas.screenshot());
    const rect = await canvas.boundingBox();
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
    await page.mouse.down();
    await page.mouse.move(rect.x + rect.width / 2 + 90, rect.y + rect.height / 2 + 15, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(700);
    assert(!pixels(await canvas.screenshot()).data.equals(beforeDrag.data), "Dragging must orbit the core");
    assert.equal(await page.evaluate(() => window.__audioProbe.tones), mutedTones, "Muted controls must not synthesize tones");
    await page.getByRole("button", { name: "Reset camera", exact: true }).click();

    await page.locator('.status-strip button[aria-label="Frozen Trace"]').click();
    await goto("/demos");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "frost", "Theme must survive navigation and reload");
    assert.equal(await page.getByRole("button", { name: "Enable click sounds", exact: true }).getAttribute("aria-pressed"), "false");
    await page.getByRole("button", { name: "Enable click sounds", exact: true }).click();
    assert((await page.evaluate(() => window.__audioProbe.tones)) > 0, "Re-enabling sound must play confirmation");
    await page.locator('.lab-switcher button').filter({ hasText: "Arena Forge" }).click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "arena");
    await page.locator('.lab-switcher button').filter({ hasText: "Neon Breach" }).click();
    await page.getByRole("button", { name: "Reduce motion", exact: true }).click();
    await page.waitForTimeout(350);
    const stillA = pixels(await page.locator("canvas").screenshot());
    await page.waitForTimeout(250);
    assert(stillA.data.equals(pixels(await page.locator("canvas").screenshot()).data), "Reduced motion must freeze automatic animation");
    await goto("/team");
    assert.equal(await page.locator("html").getAttribute("data-motion"), "off");
    assert.equal(await page.locator(".team-card").count(), 4);
    await page.getByRole("button", { name: "Engineering", exact: true }).click();
    assert.equal(await page.locator(".team-card").count(), 2);
    assert.match(await page.locator(".team-grid").innerText(), /Cipher/);
    assert.match(await page.locator(".team-grid").innerText(), /Nova/);
    await page.getByRole("button", { name: "Creative", exact: true }).click();
    assert.match(await page.locator(".team-grid").innerText(), /Kenny/);
    await page.getByRole("button", { name: "All crew", exact: true }).click();

    await goto("/features");
    await page.getByRole("button", { name: "Game systems", exact: true }).click();
    assert.match(await page.locator(".trace-command").innerText(), /inspect arena.scene/);
    await goto("/pricing");
    await page.getByRole("button", { name: "USD $", exact: true }).click();
    await page.getByRole("button", { name: "Add concept", exact: true }).first().click();
    await page.locator('.nav-actions button[aria-label^="Shortlist"]').click();
    await page.waitForURL("**/checkout");
    assert.match(await page.locator("main").innerText(), /OG Interface/);
    await page.getByRole("button", { name: "Remove OG Interface 1 Day", exact: true }).click();
    assert.match(await page.locator("main").innerText(), /Your cart is empty/);
    console.log("3D controls, audio, preferences, team filters, and cart verified.");

    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
      for (const route of ["/", "/demos", "/team", "/features", "/pricing", "/checkout"]) {
        await goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        assert(!overflow, "Horizontal overflow at " + width + " on " + route);
        const clipped = await page.locator("h1, .button-primary, .button-secondary, .lab-switcher button").evaluateAll((elements) => elements.filter((element) => element.scrollWidth > element.clientWidth + 2).map((element) => element.textContent));
        assert.deepEqual(clipped, [], "Clipped labels at " + width + " on " + route);
        if (["/", "/demos", "/team", "/features"].includes(route) && [390, 1440].includes(width)) {
          const name = route === "/" ? "home" : route.slice(1);
          await capture(name + (width === 390 ? "-mobile" : "-desktop"), route !== "/");
          if (width === 1440 && route === "/") await capture("home-full");
        }
      }
      console.log("Layout verified at " + width + "px across six routes.");
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await goto("/");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    assert(await page.locator("#mobile-menu").isVisible());
    await page.keyboard.press("Escape");
    await page.locator("#mobile-menu").waitFor({ state: "detached" });
    assert.equal(await page.locator("#mobile-menu").count(), 0);
    assert.equal(await page.getByRole("button", { name: "Open menu", exact: true }).evaluate((e) => e === document.activeElement), true);
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: /Team/ }).click();
    await page.waitForURL("**/team");
    await page.locator("#mobile-menu").waitFor({ state: "detached" });
    assert.equal(await page.locator("#mobile-menu").count(), 0);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await goto("/");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.getByRole("dialog").waitFor({ state: "visible" });
    assert(await page.getByRole("dialog").isVisible());
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "detached" });

    const reduced = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const quiet = await reduced.newPage();
    await quiet.goto(baseURL, { waitUntil: "networkidle" });
    assert.equal(await quiet.locator("html").getAttribute("data-motion"), "off", "OS preference must be respected");
    await quiet.waitForSelector('.core-scene[data-ready="true"] canvas');
    assert(pixels(await quiet.locator("canvas").screenshot()).bright > 250, "Mobile 3D canvas must be nonblank");
    await reduced.close();

    const fallback = await browser.newContext();
    await fallback.addInitScript(() => {
      const native = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) { return type.startsWith("webgl") ? null : native.call(this, type, ...args); };
    });
    const safe = await fallback.newPage();
    await safe.goto(baseURL, { waitUntil: "networkidle" });
    assert(await safe.locator(".core-fallback").isVisible(), "No-WebGL browsers need a visible fallback");
    await safe.getByRole("link", { name: "Meet the developers", exact: true }).click();
    await safe.waitForURL("**/team");
    await fallback.close();
    assert.deepEqual(errors, [], "No page runtime errors");
    assert.deepEqual(badAssets, [], "All local assets must load");
    console.log("PASS: 3D pixels, motion, drag, wireframe, assembly, audio, saved preferences, filters, cart, keyboard, six viewport sizes, mobile, and WebGL fallback.");
    console.log("Screenshots: " + output);
  } finally { await browser.close(); }
}
run().catch((error) => { console.error(error); process.exitCode = 1; });
