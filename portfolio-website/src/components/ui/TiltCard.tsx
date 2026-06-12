import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees */
  max?: number;
}

/**
 * Perspective tilt that follows the cursor, with a soft light glare
 * tracking the pointer across the surface.
 */
const TiltCard = ({ children, className = "", max = 7 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(245, 240, 235, 0.07), transparent 65%)`;

  const handleMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (e.clientX - bounds.left) / bounds.width;
    const py = (e.clientY - bounds.top) / bounds.height;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set((0.5 - py) * 2 * max);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-10"
          style={{ background: glare }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;
