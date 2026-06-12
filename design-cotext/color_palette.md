# Color Palette

Single-accent dark editorial palette. Defined in `tailwind.config.js`.

## Core tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `primary` | `#0A0A0B` | Page background (near-black) |
| `surface` | `#111113` | Cards, navbar, modals |
| `surface-light` | `#1E1E22` | Borders, dividers, scrollbar |
| `cream` | `#F5F0EB` | Headings, primary text |
| `cream-dark` | `#C8C2BA` | Body copy |
| `muted` | `#6B6B70` | Labels, captions, placeholders |
| `accent` | `#E8553A` | Signal orange — CTAs, links, highlights |
| `accent-light` | `#F07A63` | Accent hover / gradient end |

## Status colors

| Token | Hex |
| --- | --- |
| `success` | `#2ECC71` |
| `error` | `#E74C3C` |
| `warning` | `#F39C12` |

## Three.js scene colors

The neural field reuses the brand tokens (`NeuralField.tsx`):

- Nodes: ~14% accent orange, the rest cream and muted gray
- Connection lines: cream at 7% opacity, additive blending
- Pulse particles: accent orange, additive glow sprite

## Rules

1. Orange is rationed. It marks interaction and emphasis — never large fills
   beyond buttons.
2. Text on `primary`/`surface` is always cream-family; muted gray is for
   metadata only, not body copy.
3. Selection color: accent at 30% opacity (`globals.css`).
4. No second hue. Depth comes from the 3D layer, grain, and borders — not
   from additional colors.
