import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 md:mb-20 ${centered ? "text-center" : ""}`}
    >
      {label && <span className="editorial-label">{label}</span>}
      <h2 className="text-cream mb-4">{title}</h2>
      {subtitle && (
        <p
          className={`text-muted text-lg md:text-xl font-body max-w-2xl mt-4 leading-relaxed ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
