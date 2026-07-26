import type { Variants } from "framer-motion";

/**
 * Shared motion tokens for the hero entrance.
 *
 * One easing curve and one timing scale, so the sequence reads as a single
 * choreographed move instead of nine independent animations. Retime the whole
 * entrance by editing DELAY/STAGGER — never by hand-tuning a per-element delay.
 */

/** Expo-out — the site's signature curve, shared with SplitTextReveal. */
export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

const DELAY = 0.15;
const STAGGER = 0.1;

/** Start time for slot `i` of the entrance. Fractional slots are allowed. */
export const heroBeat = (i: number) => DELAY + i * STAGGER;

/** Parent marker — exists so variant labels propagate to children. */
export const heroContainer: Variants = { hidden: {}, show: {} };

/** Child slot. Pass the slot index via `custom`. */
export const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: heroBeat(i), ease: EASE_OUT_EXPO },
  }),
};

/** Portrait — same scale, longer settle so the scale change stays unhurried. */
export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: heroBeat(i), ease: EASE_OUT_EXPO },
  }),
};
