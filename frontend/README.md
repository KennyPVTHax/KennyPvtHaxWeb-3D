# Frontend

React single-page app built with Create React App, CRACO and Tailwind.

The interactive hardware model uses a lazy-loaded Three.js bundle. Color themes,
click audio, and motion preferences live in `ExperienceContext`. Audio is
synthesized locally with Web Audio after a user gesture; no sound service or
external asset host is needed. Fonts and the concept reel are self-hosted.

The motion setting follows the OS preference until explicitly changed. The
renderer skips offscreen rendering, caps pixel density, and releases GPU resources
on navigation. Browsers without WebGL receive a static processor illustration.

## Scripts

```bash
npm ci
npm start
npm run build
```

The production build is written to `frontend/build`. The root `build.sh` copies that folder into `backend/static` so the VPS can serve the frontend and API from one FastAPI process.

## Runtime URL

For same-origin production, leave `REACT_APP_BACKEND_URL` empty. The frontend will call `/api/...`.

For local development with the API on another origin:

```bash
REACT_APP_BACKEND_URL=http://localhost:8000 npm start
```

## Browser Verification

With the preview server running:

```bash
npx playwright install chromium
npm run test:ui
```

For an existing Chromium installation, set `CHROMIUM_PATH=/usr/bin/chromium`.
Set `PREVIEW_URL` to test another origin. The suite verifies 3D rendering and
controls, generated audio and mute persistence, themes, reduced motion, team
filters, navigation, the cart, and responsive layouts from 320 to 1920 pixels.
Screenshots are saved in `../previews/`.
