import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-95 hover:scale-[1.02] shadow-[0_4px_12px_hsl(95_38%_42%_/_0.3),0_2px_4px_hsl(95_38%_42%_/_0.2)] hover:shadow-[0_8px_24px_hsl(95_38%_42%_/_0.35),0_4px_8px_hsl(95_38%_42%_/_0.25)] font-semibold transition-all duration-300",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-95 hover:scale-[1.02] shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:shadow-[0_8px_24px_rgba(239,68,68,0.4)] font-semibold transition-all duration-300",
        outline:
          "border-2 border-primary/60 bg-white/80 backdrop-blur-xl hover:bg-white hover:border-primary/80 text-primary font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-all duration-300",
        secondary:
          "bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary/90 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] font-medium transition-all duration-300",
        ghost: "hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors font-medium",
        hero: "bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground hover:opacity-95 hover:scale-[1.03] shadow-[0_8px_32px_hsl(95_38%_42%_/_0.35),0_4px_16px_hsl(95_38%_42%_/_0.25)] hover:shadow-[0_12px_48px_hsl(95_38%_42%_/_0.4),0_6px_24px_hsl(95_38%_42%_/_0.3)] font-semibold text-base transition-all duration-300",
        accent: "bg-gradient-to-r from-accent via-accent/95 to-accent text-accent-foreground hover:opacity-95 hover:scale-[1.02] shadow-[0_4px_16px_hsl(100_40%_48%_/_0.3)] hover:shadow-[0_8px_32px_hsl(100_40%_48%_/_0.4)] font-semibold transition-all duration-300",
        success: "bg-gradient-to-r from-success via-success/95 to-success text-success-foreground hover:opacity-95 hover:scale-[1.02] shadow-[0_4px_16px_hsl(142_55%_45%_/_0.3)] hover:shadow-[0_8px_32px_hsl(142_55%_45%_/_0.4)] font-semibold transition-all duration-300",
        heroSecondary: "bg-white/95 backdrop-blur-2xl hover:bg-white text-primary border-2 border-primary/40 hover:border-primary/60 font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.03] transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
