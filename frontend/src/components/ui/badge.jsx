
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full border px-2.5 py-1",
    "text-xs font-semibold tracking-wide",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2",
    "focus:ring-purple-500/40 focus:ring-offset-0",
  ],
  {
    variants: {
      variant: {
        default:
          "border-purple-500/30 bg-purple-500/15 text-purple-300 " +
          "hover:bg-purple-500/25 hover:border-purple-500/50",

        secondary:
          "border-slate-600/60 bg-slate-800/80 text-slate-300 " +
          "hover:bg-slate-700/80",

        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 " +
          "hover:bg-emerald-500/15",

        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-400 " +
          "hover:bg-amber-500/15",

        destructive:
          "border-red-500/30 bg-red-500/10 text-red-400 " +
          "hover:bg-red-500/15",

        info:
          "border-blue-500/30 bg-blue-500/10 text-blue-400 " +
          "hover:bg-blue-500/15",

        outline:
          "border-slate-600 bg-transparent text-slate-300 " +
          "hover:border-purple-500/50 hover:text-purple-300",

        premium:
          "border-purple-400/30 bg-gradient-to-r from-purple-500/15 to-pink-500/15 " +
          "text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.08)] " +
          "hover:border-purple-400/50",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
