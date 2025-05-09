import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-secondary hover:bg-primary-light",
        secondary:
          "border-transparent bg-secondary-dark text-secondary hover:bg-secondary-dark/80",
        destructive:
          "border-transparent bg-error text-secondary hover:bg-error/80",
        outline: "text-secondary-dark",
        success: "border-transparent bg-success text-secondary hover:bg-success/80",
        warning: "border-transparent bg-warning text-primary hover:bg-warning/80",
        info: "border-transparent bg-info text-secondary hover:bg-info/80",
        accent: "border-transparent bg-accent-primary text-secondary hover:bg-accent-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
