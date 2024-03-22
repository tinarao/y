import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "justify-center bg-primary text-primary-foreground shadow hover:bg-primary/90",
        info:
          "text-blue-500 bg-blue-100/50 hover:bg-blue-300 hover:text-blue-800 dark:bg-black dark:hover:bg-gray-900 dark:border light:hover:bg-blue-400",
        destructive:
          "justify-center bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "justify-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "justify-center bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "justify-center hover:bg-accent hover:text-accent-foreground",
        link: "justify-center text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
