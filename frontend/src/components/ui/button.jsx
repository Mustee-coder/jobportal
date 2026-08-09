import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-xl",
    "text-sm font-semibold",
    "transition-all duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-purple-500/40",
    "focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-pink-600 " +
          "text-white shadow-lg shadow-purple-500/20 " +
          "hover:from-purple-500 hover:to-pink-500 " +
          "hover:shadow-purple-500/30",

        destructive:
          "border border-red-500/30 " +
          "bg-red-500/10 text-red-400 " +
          "hover:bg-red-500/20 hover:border-red-500/50",

        outline:
          "border border-slate-700 bg-slate-900/70 " +
          "text-slate-200 " +
          "hover:border-purple-500/50 hover:bg-purple-500/10 " +
          "hover:text-purple-300",

        secondary:
          "border border-slate-700/80 " +
          "bg-slate-800 text-slate-200 " +
          "hover:bg-slate-700 hover:border-slate-600",

        ghost:
          "text-slate-300 " +
          "hover:bg-purple-500/10 hover:text-purple-300",

        link:
          "h-auto p-0 text-purple-400 " +
          "underline-offset-4 hover:text-purple-300 hover:underline",

        success:
          "bg-emerald-500/10 text-emerald-400 " +
          "border border-emerald-500/30 " +
          "hover:bg-emerald-500/20",

        premium:
          "border border-purple-400/20 " +
          "bg-gradient-to-r from-purple-500/10 to-pink-500/10 " +
          "text-purple-200 " +
          "shadow-[0_0_20px_rgba(168,85,247,0.08)] " +
          "hover:border-purple-400/40 " +
          "hover:from-purple-500/20 hover:to-pink-500/20",
      },

      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3.5 rounded-lg text-xs",
        lg: "h-12 px-7 rounded-xl",
        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }