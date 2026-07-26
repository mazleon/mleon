import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "../../lib/motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  /** Words rendered in the accent color */
  accentWords?: string[];
  delay?: number;
  stagger?: number;
  once?: boolean;
  /**
   * Extra gate on top of visibility. The hero holds this false until webfonts
   * have loaded, so words don't reflow to new metrics mid-transform.
   */
  start?: boolean;
}

/**
 * Word-level masked reveal: each word slides up from behind a clip line,
 * staggered left to right. The editorial signature animation of the site.
 *
 * Visibility is observed on the container, not the words — a word that
 * starts translated behind its overflow-hidden mask is fully clipped, so
 * IntersectionObserver would never report it visible.
 */
const SplitTextReveal = ({
  text,
  className = "",
  accentWords = [],
  delay = 0,
  stagger = 0.08,
  once = true,
  start = true,
}: SplitTextRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  // 0.2, not 0.5: `once` latches on the first *true*, so a heading that is
  // restored at a scroll offset leaving it under half-visible — a plain
  // refresh partway down the page does this — would stay masked until the
  // visitor happened to scroll it further in. A low threshold can't strand it.
  const inView = useInView(ref, { once, amount: 0.2 });
  // Compositor layers are only worth holding while the words are moving.
  const [settled, setSettled] = useState(false);
  const words = text.split(" ");
  const show = inView && start;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block ${settled ? "" : "will-change-transform"} ${
              accentWords.includes(word) ? "text-accent" : ""
            }`}
            initial={{ y: "115%" }}
            animate={show ? { y: 0 } : { y: "115%" }}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: EASE_OUT_EXPO,
            }}
            onAnimationComplete={
              // Guarded on `show` — the idle state animates to its own initial
              // value, which would otherwise report complete straight away.
              i === words.length - 1 && show
                ? () => setSettled(true)
                : undefined
            }
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export default SplitTextReveal;
