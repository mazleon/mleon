import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EASE_OUT_EXPO } from "../../lib/motion";

export interface Slide {
  src: string;
  caption: string;
}

interface ProjectCarouselProps {
  slides: Slide[];
  alt: string;
  /** Advance on a timer until the visitor interacts. */
  autoPlayMs?: number;
}

/** Distance/velocity past which a drag counts as a swipe rather than a nudge. */
const SWIPE_THRESHOLD = 8000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Screenshot carousel: direction-aware slide with drag-to-swipe, arrows and
 * dots. Autoplay stops permanently on first interaction — a carousel that
 * keeps moving under someone who is reading it is worse than one that never
 * moved.
 */
const ProjectCarousel = ({
  slides,
  alt,
  autoPlayMs = 4200,
}: ProjectCarouselProps) => {
  const reduced = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [engaged, setEngaged] = useState(false);

  const count = slides.length;
  const go = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + count) % count, dir]),
    [count]
  );
  const jumpTo = useCallback(
    (next: number) => setState(([i]) => [next, next > i ? 1 : -1]),
    []
  );

  const interact = useCallback(
    (dir: number) => {
      setEngaged(true);
      go(dir);
    },
    [go]
  );

  // Autoplay, paused once the visitor takes over and while the tab is hidden.
  useEffect(() => {
    if (engaged || reduced || count < 2) return;
    const id = setInterval(() => {
      if (!document.hidden) go(1);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [engaged, reduced, count, autoPlayMs, go]);

  // Warm the neighbours so a swipe never lands on a blank frame.
  useEffect(() => {
    [(index + 1) % count, (index - 1 + count) % count].forEach((i) => {
      const img = new Image();
      img.src = slides[i].src;
    });
  }, [index, count, slides]);

  const current = slides[index];

  return (
    // ponytail: no arrow-key handler — the Prev/Next buttons are real
    // buttons, so keyboard users already get full control via Tab + Enter.
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={alt}
      className="relative w-full aspect-[5/2] overflow-hidden bg-primary"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={current.src}
          alt={`${alt} — ${current.caption}`}
          custom={direction}
          variants={reduced ? fadeVariants : slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.62, ease: EASE_OUT_EXPO },
            opacity: { duration: 0.3 },
          }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, { offset, velocity }) => {
            const power = Math.abs(offset.x) * Math.abs(velocity.x);
            if (power < SWIPE_THRESHOLD) return;
            interact(offset.x < 0 ? 1 : -1);
          }}
          className="absolute inset-0 h-full w-full object-cover object-top select-none"
          draggable={false}
        />
      </AnimatePresence>

      {/* Keeps the caption and controls legible over bright screenshots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-primary via-primary/70 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.p
          key={current.caption}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          className="absolute bottom-4 left-5 z-10 text-xs font-mono uppercase tracking-[0.2em] text-cream"
        >
          {current.caption}
        </motion.p>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button
            onClick={() => interact(-1)}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary/70 p-2 text-cream backdrop-blur-sm transition-colors hover:bg-accent hover:text-white cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => interact(1)}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary/70 p-2 text-cream backdrop-blur-sm transition-colors hover:bg-accent hover:text-white cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 right-5 z-10 flex gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                onClick={() => {
                  setEngaged(true);
                  jumpTo(i);
                }}
                aria-label={`Go to ${slide.caption}`}
                aria-current={i === index}
                className="group p-1 cursor-pointer"
              >
                <motion.span
                  className="block h-1.5 rounded-full bg-cream/30 group-hover:bg-cream/60"
                  animate={{
                    width: i === index ? 24 : 6,
                    backgroundColor:
                      i === index ? "#E8553A" : "rgba(245,240,235,0.3)",
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
