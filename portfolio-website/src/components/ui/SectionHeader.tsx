import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = ({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      <h2 className="text-secondary text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-secondary-dark max-w-2xl mx-auto mt-4">{subtitle}</p>
      )}
      <div
        className={`w-20 h-1 bg-accent-primary rounded-full mt-4 ${centered ? "mx-auto" : ""}`}
      ></div>
    </motion.div>
  );
};

export default SectionHeader;
