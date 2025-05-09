import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, AnimationControls } from "framer-motion";

interface ScrollAnimationHook {
  ref: (node?: Element | null | undefined) => void;
  controls: AnimationControls;
  inView: boolean;
}

/**
 * Custom hook for scroll-triggered animations using Framer Motion and Intersection Observer.
 * @param threshold The intersection threshold (0 to 1) for triggering the animation.
 * @returns An object containing the ref for the observed element and animation controls.
 */
const useScrollAnimation = (threshold = 0.1): ScrollAnimationHook => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // Optional: Reset animation when out of view
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

export default useScrollAnimation;
