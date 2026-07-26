# AGENTS.md

Personal portfolio site for Mazharul Islam Leon. Static React SPA with a Netlify function for the chatbot.

## Repository layout

- All app code lives in `portfolio-website/` — **run every npm command from there**, not the repo root. The repo root only holds `netlify.toml`, docs, and this file.
- Source entrypoint: `portfolio-website/src/App.tsx` — composes the page sections; add/remove sections there.
- Resume PDFs and static assets live in `portfolio-website/public/` (the hero "download resume" link resolves to a file here).
- Design system docs live in `design-cotext/` (note the spelling — **cotext**, not context). Read `design_system.md` and `color_palette.md` before touching styling. Single accent only: signal orange `#E8553A`.
- Path alias `@` → `portfolio-website/src` (configured in both `tsconfig.json` and `vite.config.ts`).

## Commands

Run from `portfolio-website/`:

```bash
npm install
npm run dev        # Vite dev server on http://localhost:5173
npm run build       # tsc (typecheck) && vite build  — this is the typecheck step
npm run lint        # eslint --max-warnings 0  — warnings fail the build
npm run format      # prettier --write .
```

There is no test suite. `npm run build` is the de facto typecheck — there is no separate `typecheck` script.

## CI / verification order

GitHub Actions (`.github/workflows/ci.yml`, working dir `./portfolio-website`) runs:
1. `npm install` (not `npm ci` — intentional, matches Netlify's approach to tolerate lockfile drift)
2. `npm run build`
3. `npm run lint`

Run `build` then `lint` locally before pushing; lint fails on any warning.

## Netlify deployment quirks

`netlify.toml` overrides the install step: the build command re-installs extra dev deps at build time
(`npm install react-icons@latest @types/node @netlify/functions --save-dev`) before `npm run build`. Do not "fix" this to `npm ci` — `react-icons`/`@netlify/functions` are not all in `package-lock.json` and the build relies on the runtime install. `NODE_VERSION=18`.

SPA fallback is configured (`/* → /index.html`, 200).

## Chatbot function

- Client: `portfolio-website/src/services/chatbot.ts` → posts to `/.netlify/functions/chat`.
- Server: `portfolio-website/netlify/functions/chat.ts` — requires the **`OPENROUTER_API_KEY`** env var in Netlify. Without it the function returns an error; set it in the Netlify dashboard, not in the repo.
- The function embeds its own copy of portfolio data (separate from `src/data/portfolioContext.ts`). If you update bio/experience/projects, update **both** files or the chatbot will disagree with the rendered site.

## TypeScript & lint posture

- `strict: true`, but `noUnusedLocals`/`noUnusedParameters` are **false** and `@typescript-eslint/no-explicit-any` is **off**. Unused vars and `any` will not be flagged.
- ESLint ignores `vite.config.ts`, `postcss.config.cjs`, `tailwind.config.js`, `netlify/`, and `dist/` — don't expect lint errors from those.
- `prettier/prettier` is **off** in eslint; formatting is enforced via `npm run format`, not lint.

## Styling conventions

- Tailwind with strict custom tokens (see `portfolio-website/tailwind.config.js`). Do not introduce arbitrary color values — use the existing tokens; the only accent is `#E8553A`.
- 3D layer: Three.js via `@react-three/fiber`, `src/components/three/NeuralField.tsx`. It is lazy-loaded and must respect `prefers-reduced-motion` (static fallback). Keep it deterministic (seeded PRNG) so layout is identical across visits.
- Signature type animation: `SplitTextReveal` with an `sr-only` plain-text span for screen readers — don't replace masked reveals with simple fades.