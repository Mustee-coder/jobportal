import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl",
        "border border-slate-700/80",
        "bg-slate-900/80",
        "px-4 py-2.5",
        "text-sm font-medium text-slate-100",
        "placeholder:text-slate-500",
        "transition-all duration-200",
        "hover:border-purple-500/40",
        "focus-visible:outline-none",
        "focus-visible:border-purple-500",
        "focus-visible:ring-2",
        "focus-visible:ring-purple-500/20",
        "focus-visible:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }