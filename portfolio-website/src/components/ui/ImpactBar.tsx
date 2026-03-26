import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const counters = [
  { value: 50, suffix: "M+", label: "Users in Production", prefix: "" },
  { value: 6, suffix: "", label: "IEEE / Springer Publications", prefix: "" },
  { value: 50, suffix: "ms", label: "Edge Inference Latency", prefix: "<" },
  { value: 4.5, suffix: "+", label: "Years Production ML", prefix: "", isFloat: true },
];

const Counter = ({ value, prefix, suffix, label, isFloat = false }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5 border-l-2 border-accent/20 pl-4 py-1">
      <div className="font-heading font-black text-3xl md:text-4xl text-cream tracking-tight">
        {prefix}{isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}
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
