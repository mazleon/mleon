# Animation & Interaction Specifications

Implemented motion system. Stack: Framer Motion (UI choreography),
react-three-fiber + three.js (hero scene), Tailwind keyframes (marquee,
grain). One easing curve everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`.

## 1. Three.js Neural Field (hero)

`src/components/three/NeuralField.tsx`, mounted via `HeroCanvas.tsx`.

- 280 nodes in a flattened ellipsoid (seeded PRNG — identical every visit),
  linked to ≤3 near neighbors; cream lines at 7% opacity, additive blending.
- 18 pulse particles travel along random edges with smoothstep easing —
  the "signals through a network" motif in brand orange.
- Group drifts: slow Y rotation (0.04 rad/s), sinusoidal float, and
  mouse-parallax tilt (lerped, ±0.12 rad).
- **Loading**: `React.lazy` + Suspense — three.js lives in its own chunk
  (~220 kB gzip) fetched after first paint; fallback is the plain dark hero.
- **Guards**: skipped without WebGL; `frameloop="demand"` (static frame)
  under `prefers-reduced-motion`; rAF auto-pauses in background tabs.
- DPR clamped to [1, 2]; canvas is `pointer-events-none` + `aria-hidden`.

## 2. Page-load sequence (hero)

1. Mono label fades up (0.3s delay)
2. Name reveals word-by-word via SplitTextReveal masks (0.4s / 0.55s delays)
3. Tagline, impact counters, CTAs, socials stagger in (0.6–0.9s delays)
4. Photo scales in with floating badge (1.2s)
5. Scroll cue appears last (1.6s) with a looping descent line

## 3. Scroll-driven motion

- **ScrollProgress** — 2px accent gradient hairline fixed to viewport top,
  spring-smoothed `scaleX` of page progress.
- **SplitTextReveal** — word-masked reveals on every H1/H2; observes its
  container (not the clipped words) with `useInView`, fires once at 50%
  visibility.
- **SectionHeader** — accent rule scales in from the left, label fades,
  title splits, subtitle slides up (0.25s delay).
- **Impact counters** — spring-eased count-up (1.8s) on first view.
- **Section content** — existing MotionWrapper fade/slide stagger retained.

## 4. Cursor-driven interactions (fine pointers only)

- **CustomCursor** — 8px accent dot (instant) + 32px ring (spring-trailed,
  `mix-blend-difference`). Ring grows to 52px with accent border over
  interactive elements. Native cursor suppressed via `.custom-cursor` class
  on `<html>`; never mounted on touch or reduced-motion devices.
- **MagneticButton** — hero CTAs gravitate toward the cursor
  (strength 0.3, stiffness 200 spring), snap back on leave.
- **TiltCard** — project cards tilt up to ±7° in perspective 1200px with a
  cursor-tracking radial glare (cream at 7%).
- **Neural field parallax** — scene tilts subtly toward the cursor.

## 5. Ambient loops

- **Marquee** — capability ticker between hero and about; content duplicated
  for a seamless `translateX(-50%)` loop (36s linear), pauses on hover,
  disabled under `motion-reduce`.
- **Pulse particles** — continuous in the hero field.
- **Grain** — static 3% noise overlay (no animation cost).

## 6. Micro-interactions (retained)

- Buttons: color/shadow transitions, accent glow on primary hover
- Cards: border lightens, image scales 1.05 on hover
- Photo: 20% grayscale → full color on hover (0.7s)
- Navbar links, social icons: 200ms color transitions

## Accessibility & performance rules

- `prefers-reduced-motion: reduce` collapses all animation to ≤0.01ms
  globally (`globals.css`), plus explicit component guards listed above.
- All decorative layers: `aria-hidden="true"` + `pointer-events-none`.
- Transforms and opacity only — no layout-thrashing properties animated.
- Three.js never blocks first paint (lazy chunk, Suspense fallback `null`).
