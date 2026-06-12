# Immersive 3D Portfolio Redesign — Design Spec

**Date:** 2026-06-12
**Branch:** `redesign/immersive-3d`
**Scope:** Visual/motion elevation of the existing single-page portfolio. No content changes, no routing changes, no backend changes.

## Concept: "The Neural Atelier"

The current site is a strong dark-editorial layout (Syne display, Manrope body, JetBrains Mono labels, near-black `#0A0A0B`, signal-orange `#E8553A`). Rather than replacing that identity, this redesign gives it **depth and choreography** — the qualities that separate a template from a $100K agency build:

1. **Dimension** — a live Three.js "neural constellation" behind the hero: layered network nodes with glowing synaptic connections, orange signal pulses traveling between layers, slow drift, and mouse parallax. It is the visitor's first impression and directly expresses the subject's craft (neural networks, computer vision).
2. **Choreography** — a consistent motion language across the page: split-text headline reveals, magnetic CTAs, 3D-tilt project cards, an infinite capability marquee, animated impact counters, scroll progress, and a custom cursor.

## Architecture

```
src/components/three/
  NeuralField.tsx      R3F scene: node layers + connection lines + pulse particles
  HeroCanvas.tsx       React.lazy wrapper, Suspense fallback, reduced-motion +
                       WebGL guards, DPR clamp, visibility pause
src/components/ui/
  ScrollProgress.tsx   1px accent progress hairline fixed to viewport top
  SplitTextReveal.tsx  word/char staggered mask reveal (Framer Motion)
  MagneticButton.tsx   cursor-attracted CTA wrapper
  TiltCard.tsx         perspective tilt + glare on hover
  Marquee.tsx          infinite scrolling capability strip
  Counter.tsx          spring-animated number counter
  CustomCursor.tsx     dot + trailing ring, mix-blend-difference, pointer-only
```

Consumers updated: `Hero` (canvas + split reveal + magnetic CTAs), `Projects` (tilt cards), `ImpactBar` (counters), `App` (progress, marquee, cursor).

## Technology

- `three@^0.169`, `@react-three/fiber@^8` (React 18 line), `@react-three/drei@^9`.
- Fiber v9 requires React 19 — **stay on v8** until a React upgrade is planned.
- All Three.js code behind `React.lazy` so the base bundle stays lean; Vite code-splits the chunk automatically.

## Performance & accessibility guardrails

- Canvas renders only when WebGL is available; falls back to existing static gradient.
- `prefers-reduced-motion`: no canvas animation loop, no marquee scroll, instant text reveals (existing global CSS rule already covers transitions).
- DPR clamped to `[1, 2]`; animation loop paused when tab is hidden (`frameloop="demand"` strategy is not used; we use document visibility to stop the clock).
- Custom cursor only on `(pointer: fine)` devices; native cursor never hidden for keyboard users.
- All decorative layers `aria-hidden` and `pointer-events-none`.

## Out of scope (YAGNI)

Page routing, CMS, light theme, WebGPU, post-processing passes (bloom etc. — cost > benefit on mobile), replacing Framer Motion.

## Verification

`npm run build` (tsc + vite), `npm run lint`, local dev-server visual check, then merge to `main` and refresh `design-cotext/` docs.
