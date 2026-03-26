import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-surface text-cream hover:bg-surface-light",
        secondary:
          "border-transparent bg-surface-light text-cream-dark hover:bg-surface-light/80",
        destructive:
          "border-transparent bg-error text-white hover:bg-error/80",
        outline: "text-cream-dark border-surface-light",
        success: "border-transparent bg-success text-white hover:bg-success/80",
        warning: "border-transparent bg-warning text-primary hover:bg-warning/80",
        info: "border-transparent bg-muted text-cream hover:bg-muted/80",
        accent: "border-transparent bg-accent text-white hover:bg-accent/80",
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
