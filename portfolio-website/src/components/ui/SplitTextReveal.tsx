import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  /** Words rendered in the accent color */
  accentWords?: string[];
  delay?: number;
  stagger?: number;
  once?: boolean;
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
}: SplitTextRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.5 });
  const words = text.split(" ");

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
            className={`inline-block will-change-transform ${
              accentWords.includes(word) ? "text-accent" : ""
            }`}
            initial={{ y: "115%" }}
            animate={inView ? { y: 0 } : { y: "115%" }}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
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
