import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  gradientClassName?: string;
  borderWidth?: number;
}

export const AnimatedGradientBorder = ({
  children,
  className,
  containerClassName,
  gradientClassName,
  borderWidth = 4,
}: AnimatedGradientBorderProps) => {
  return (
    <div className={cn("relative rounded-full p-[0.15rem]", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary animate-gradient-x",
          gradientClassName
        )}
      />
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-primary",
          className
        )}
        style={{ padding: `${borderWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
};
