# Kaung Khant Ko Portfolio

This project is a Vite React portfolio site using locally maintained profile data.

Live site: `https://kaungkhantko.top`

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Su Yet Designs — Figma sync

The collection at `/design/su-yet-designs` is generated from a Figma file so new
posters publish themselves.

- **File:** `Rq9iC81fj5ho5T2vBNt9oV` (set as `FIGMA_FILE_KEY` in `.github/workflows/deploy.yml`).
- **Add a poster:** create a 1080×1080 frame named `SUYET — <Title>`. An optional
  ` / <Series>` segment sets the series label (e.g. `SUYET — Open Source / Tech Explained`).
  The frame name is the title shown on the site.
- **Publish:** the deploy workflow runs `scripts/sync-su-yet.mjs` on every deploy and
  every 6 hours — it renders each frame into `public/su-yet/` and rewrites
  `src/data/suYet.ts`, then the site rebuilds. Trigger it now from the repo's
  **Actions → Deploy GitHub Pages → Run workflow**.
- **Setup (once):** add a repository secret `FIGMA_TOKEN` (GitHub → Settings →
  Secrets and variables → Actions) holding a Figma personal access token with
  read access. Without it the build keeps the committed fallback in `src/data/suYet.ts`.
- **Run locally:** `FIGMA_TOKEN=... node scripts/sync-su-yet.mjs`
