import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
  delay?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      className,
      indicatorClassName,
      showLabel = false,
      label,
      animate = true,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const percentage = (value / max) * 100;
    const displayLabel = label || `${Math.round(percentage)}%`;

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary-light",
          className
        )}
        {...props}
      >
        {animate ? (
          <motion.div
            className={cn("h-full bg-accent-primary", indicatorClassName)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: delay, ease: "easeOut" }}
          />
        ) : (
          <div
            className={cn("h-full bg-accent-primary", indicatorClassName)}
            style={{ width: `${percentage}%` }}
          />
        )}

        {showLabel && (
          <span className="absolute right-0 -top-6 text-sm text-secondary-dark">
            {displayLabel}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
