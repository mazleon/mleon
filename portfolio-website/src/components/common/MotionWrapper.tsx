import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
    threshold?: number;
}

const MotionWrapper = ({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    yOffset = 30,
    threshold = 0.2,
}: MotionWrapperProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    const variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "Deep Space" smoothness
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
