import { lazy, Suspense, useEffect, useState } from "react";

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

  useEffect(() => {
    if (!supportsWebGL()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMode(reduced.matches ? "static" : "animated");
  }, []);

  if (mode === "off") return null;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <NeuralField animate={mode === "animated"} />
      </Suspense>
      {/* Vignette keeps the left-aligned hero copy readable over the field */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/55 to-primary/15" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
    </div>
  );
};

export default HeroCanvas;
