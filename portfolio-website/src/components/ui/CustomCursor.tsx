import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

/**
 * Accent dot + trailing ring cursor. Mounted only on fine-pointer devices
 * without reduced-motion; the native cursor is suppressed via the
 * `custom-cursor` class on <html> (see globals.css).
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      setHoveringInteractive(
        !!(e.target as HTMLElement).closest?.(INTERACTIVE)
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/50 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hoveringInteractive ? 52 : 32,
          height: hoveringInteractive ? 52 : 32,
          borderColor: hoveringInteractive
            ? "rgba(232, 85, 58, 0.9)"
            : "rgba(245, 240, 235, 0.5)",
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
