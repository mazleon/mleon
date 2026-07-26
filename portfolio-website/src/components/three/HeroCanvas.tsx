import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Three.js is heavy — keep it out of the main bundle and hydrate the
// scene only after the page is interactive.
const NeuralField = lazy(() => import("./NeuralField"));

type CanvasMode = "off" | "static" | "animated";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const HeroCanvas = () => {
  const [mode, setMode] = useState<CanvasMode>("off");
  const [running, setRunning] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supportsWebGL()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMode(reduced.matches ? "static" : "animated");
  }, []);

  // The scene is decorative, so stop rendering it once the hero leaves the
  // viewport or the tab is backgrounded. Without this the field keeps drawing
  // a full three.js frame for the entire page lifetime and every scroll
  // animation further down the page competes with it for the main thread.
  useEffect(() => {
    const el = ref.current;
    if (!el || mode !== "animated") return;

    let onScreen = true;
    const sync = () => setRunning(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });

    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [mode]);

  if (mode === "off") return null;

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <NeuralField animate={mode === "animated"} running={running} />
      </Suspense>
      {/* Vignette keeps the left-aligned hero copy readable over the field */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/55 to-primary/15" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
    </div>
  );
};

export default HeroCanvas;
