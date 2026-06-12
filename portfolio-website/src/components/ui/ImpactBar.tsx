import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface CounterSpec {
  value: number;
  suffix: string;
  label: string;
  prefix: string;
}

const counters: CounterSpec[] = [
  { value: 50, suffix: "M+", label: "Users in Production", prefix: "" },
  { value: 6, suffix: "", label: "IEEE / Springer Publications", prefix: "" },
  { value: 50, suffix: "ms", label: "Edge Inference Latency", prefix: "<" },
  { value: 5, suffix: "+", label: "Years Production ML", prefix: "" },
];

const Counter = ({ value, prefix, suffix, label }: CounterSpec) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isInView, count, value]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1.5 border-l-2 border-accent/20 pl-4 py-1"
    >
      <div className="font-heading font-black text-3xl md:text-4xl text-cream tracking-tight">
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </div>
      <div className="text-[10px] md:text-xs font-mono text-muted uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
};

const ImpactBar = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 my-8">
      {counters.map((c) => (
        <Counter key={c.label} {...c} />
      ))}
    </div>
  );
};

export default ImpactBar;
