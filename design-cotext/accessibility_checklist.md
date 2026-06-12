# Accessibility Checklist

Accessibility considerations for the implemented site, including the
immersive 3D / motion-graphics layer added in the 2026 redesign.

## Color and contrast

- [x] Cream `#F5F0EB` on primary `#0A0A0B`: ~17.6:1 ✓ (headings, key text)
- [x] Cream-dark `#C8C2BA` on primary: ~11:1 ✓ (body copy)
- [x] Accent `#E8553A` on primary: ~5:1 ✓ (large text / UI only)
- [x] Muted `#6B6B70` reserved for metadata and large mono labels
- [x] Color never the sole carrier of meaning (icons + text everywhere)
- [x] Selection style overridden with accessible contrast

## Motion & vestibular safety

- [x] Global `prefers-reduced-motion` rule collapses all CSS/Framer
      animations to ≤0.01ms (`globals.css`)
- [x] Neural field: static single frame (`frameloop="demand"`) under
      reduced motion; not mounted at all without WebGL
- [x] Marquee: `motion-reduce:animate-none` (duplicated content reads fine
      statically)
- [x] Custom cursor: never mounted under reduced motion or coarse pointers;
      native cursor untouched for keyboard users
- [x] No flashing content; pulses are small, slow, and low-contrast

## Decorative layers

- [x] Three.js canvas, vignettes, marquee, scroll cue, grain overlay, custom
      cursor: all `aria-hidden="true"` and `pointer-events-none`
      (cursor is fixed-position, non-interactive)
- [x] SplitTextReveal renders an `sr-only` plain-text copy; animated word
      fragments are `aria-hidden`

## Keyboard & structure

- [x] All interactive elements reachable and operable by keyboard
- [x] Visible focus rings (`focus:ring` on buttons/inputs)
- [x] Logical heading hierarchy (one H1 — hero name; H2 per section)
- [x] Landmark structure: nav / main / footer
- [x] Smooth-scroll anchors with section `id`s
- [x] Magnetic/tilt wrappers are pure presentation — the inner
      button/link keeps native semantics and focus behavior

## Media & forms

- [x] Meaningful `alt` text on photos and project images
- [x] Form inputs labelled; errors announced inline (react-hook-form + zod)
- [x] `loading="lazy"` on below-fold imagery; hero image eager

## Verification routine

- Build-time: `eslint-plugin-jsx-a11y` in CI (zero-warning policy)
- Manual: keyboard pass, VoiceOver spot-check, reduced-motion pass
  (macOS: System Settings → Accessibility → Display → Reduce motion)
