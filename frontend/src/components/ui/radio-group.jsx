import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          "grid gap-3",
          className
        )}
        {...props}
      />
    )
  }
)

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square h-5 w-5 rounded-full",
          "border border-slate-600",
          "bg-slate-900/80",
          "text-purple-400",
          "transition-all duration-200",
          "hover:border-purple-500/70",
          "focus:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-purple-500/30",
          "focus-visible:ring-offset-0",
          "data-[state=checked]:border-purple-500",
          "data-[state=checked]:bg-purple-500/10",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle
            className={cn(
              "h-2.5 w-2.5",
              "fill-purple-400 text-purple-400"
            )}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    )
  }
)

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export {
  RadioGroup,
  RadioGroupItem,
}