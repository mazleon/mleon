const capabilities = [
  "Generative AI",
  "Computer Vision",
  "Agentic Systems",
  "RAG Pipelines",
  "Edge Inference",
  "MLOps",
  "LLM Fine-Tuning",
  "Production ML",
];

/**
 * Infinite capability ticker between hero and about. Content is duplicated
 * so the -50% keyframe loops seamlessly; pauses on hover and under
 * prefers-reduced-motion.
 */
const Marquee = () => {
  return (
    <div
      className="relative overflow-hidden border-y border-surface-light bg-surface/40 py-5 group"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {capabilities.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center font-mono text-sm uppercase tracking-[0.3em] text-muted"
              >
                <span className="mx-10 whitespace-nowrap">{item}</span>
                <span className="text-accent text-xs">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
