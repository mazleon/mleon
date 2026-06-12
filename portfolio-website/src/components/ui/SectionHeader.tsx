import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitTextReveal from "./SplitTextReveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
  centered?: boolean;
}

const SectionHeader = ({
  title,
  subtitle,
  label,
  centered = false,
}: SectionHeaderProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`mb-16 md:mb-20 ${centered ? "text-center" : ""}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-4 mb-4 ${centered ? "justify-center" : ""}`}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block w-10 h-px bg-accent origin-left"
            aria-hidden="true"
          />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
            {label}
          </span>
        </motion.div>
      )}
      <h2 className="text-cream mb-4">
        <SplitTextReveal text={title} stagger={0.06} />
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`text-muted text-lg md:text-xl font-body max-w-2xl mt-4 leading-relaxed ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
