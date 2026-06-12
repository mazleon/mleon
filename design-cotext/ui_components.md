# UI Components

Component inventory for the implemented site (React 18 + TypeScript + Tailwind
+ Framer Motion + react-three-fiber). Paths relative to `portfolio-website/src/`.

## Three.js layer — `components/three/`

### NeuralField
Full R3F scene: seeded 280-node constellation, near-neighbor synaptic lines,
18 orange pulse particles, mouse parallax, slow drift. Exported as the lazy
chunk's default; accepts `animate` (false = static single frame).

### HeroCanvas
Mount guard + lazy loader for NeuralField. Decides `off | static | animated`
from WebGL support and `prefers-reduced-motion`, renders readability
vignettes over the canvas. Decorative: `aria-hidden`, `pointer-events-none`.

## Motion primitives — `components/ui/`

### SplitTextReveal
Word-masked staggered headline reveal. Props: `text`, `accentWords`, `delay`,
`stagger`, `once`. Observes its container with `useInView` (the words
themselves start fully clipped). `sr-only` plain text for screen readers.

### MagneticButton
Wrapper that pulls its child toward the cursor (spring x/y, `strength` prop,
default 0.3) and releases on mouse leave. Used on hero CTAs.

### TiltCard
Perspective tilt (±7° default, springs) with cursor-tracking radial glare.
Wraps each project card.

### ScrollProgress
Fixed 2px top hairline, accent gradient, spring-smoothed page scroll progress.

### Marquee
Infinite capability ticker (duplicated content, `animate-marquee` keyframe,
36s loop). Pauses on hover; static under `motion-reduce`. `aria-hidden`.

### CustomCursor
Accent dot + trailing ring (`mix-blend-difference`), ring expands over
interactive elements. Mounted only for `(pointer: fine)` without reduced
motion; toggles `.custom-cursor` on `<html>` to suppress the native cursor.

### SectionHeader
Accent rule scale-in + mono label + SplitTextReveal title + subtitle slide.
Props: `title`, `subtitle?`, `label?`, `centered?`.

### ImpactBar
Four headline metrics with spring count-up animation on first view
(framer-motion `animate` + `useTransform` rounding).

### Existing primitives (retained)
`button`, `card`, `badge`, `avatar`, `tabs`, `tooltip`, `form`, `input`,
`textarea`, `separator`, `dropdown-menu`, `OptimizedImage`, `ScrollToTop`,
`AnimatedText`, `animated-gradient-border`, `Progress` — shadcn/Radix-based,
styled with the editorial tokens.

## Layout — `components/layout/`

- **Navbar** — fixed, surface blur, ML monogram, anchor links, CTA pill
- **Layout** — Navbar + main + Footer shell
- **Footer** — socials, copyright

## Sections — `components/sections/`

Hero (canvas + split name + magnetic CTAs + scroll cue), About, Experience,
Publications, ResearchInterests, Projects (TiltCard grid + filter + modal),
Skills, Blog, MLDemo, Contact, ParticleBackground (grain overlay).

## Composition order (`App.tsx`)

SEO → ScrollProgress → CustomCursor → grain → Hero → Marquee → About →
Experience → Publications → ResearchInterests → Projects → Skills → Blog →
MLDemo → Contact → ScrollToTop → ChatWidget.
