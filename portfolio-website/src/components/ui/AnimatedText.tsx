import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

const AnimatedText = ({
  text,
  className = "",
  once = true,
  delay = 0,
}: AnimatedTextProps) => {
  // Split text into words
  const words = text.split(" ");

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-1">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedText;
