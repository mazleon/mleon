# Design System — "The Neural Atelier"

Dark editorial design with an immersive 3D layer. The visual identity pairs
oversized magazine typography with a live Three.js neural constellation —
calm, confident surfaces punctuated by a single signal-orange accent.

## Typography

### Font Families

- **Display / Headings**: Syne — weights 700, 800. Oversized, tight-tracked
  (`tracking-tighter`, line-height 0.95) for hero and section titles.
- **Body**: Manrope — weights 300–800. All paragraphs, buttons, UI copy.
- **Mono / Labels**: JetBrains Mono — weights 400–600. Editorial labels,
  section indices, metric captions; always uppercase with wide tracking
  (`tracking-[0.2em]` to `[0.3em]`).

### Typography Scale

- H1 (hero name): `clamp(2.75rem, 9vw, 7rem)` / line-height 0.95 / Syne 800
- H2 (section titles): `clamp(2rem, 5vw, 4rem)` / line-height 1.0
- H3: 1.5–1.875rem · H4: 1.25–1.5rem
- Body: 1rem–1.25rem Manrope, relaxed leading
- Labels: 0.75rem JetBrains Mono uppercase

### Signature text treatment

Headlines never simply fade in — they use **SplitTextReveal**
(`src/components/ui/SplitTextReveal.tsx`): each word slides up from behind
an overflow mask, staggered left to right (0.06–0.08s per word,
`cubic-bezier(0.16, 1, 0.3, 1)`). Screen readers get the plain string via
an `sr-only` span.

## Color

See `color_palette.md`. One accent only: signal orange `#E8553A`. Everything
else is near-black surfaces and warm cream text.

## Depth & Atmosphere

- **Neural field** (`src/components/three/NeuralField.tsx`): 280-node
  constellation with synaptic lines and 18 traveling orange pulses, slow
  drift + mouse parallax, rendered behind the hero. Deterministic layout
  (seeded PRNG) so every visit looks identical.
- **Grain overlay**: 3% SVG noise fixed over the whole page.
- **Vignettes**: left-to-right and bottom gradients over the canvas keep
  hero copy readable.

## Spacing & Layout

- Container: max-w-7xl, px-6/8/12 responsive
- Sections: py-24 md:py-36
- 12-column grid in hero (8/4 text/photo split); 2-column project grid

## Component shape language

- Cards: rounded-2xl, 1px `surface-light` border, hover border accent
- Buttons: pill (rounded-full), accent fill or cream outline
- Radius scale: xl (12) → 2xl (16) → 3xl (24) → 4xl (40)

## Motion principles

1. **One easing** — `cubic-bezier(0.16, 1, 0.3, 1)` ("ease-out-expo feel")
   everywhere; springs for cursor-driven interactions.
2. **Masked reveals over fades** for type; fades reserved for secondary copy.
3. **Cursor as participant** — magnetic buttons, tilt cards, parallax field,
   custom dot+ring cursor on fine pointers.
4. **Respect `prefers-reduced-motion`** — global CSS kill-switch plus
   per-component guards (static canvas, no marquee, no custom cursor).

Full interaction specs: `animation_interactions.md`.
