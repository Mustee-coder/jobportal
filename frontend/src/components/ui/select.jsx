import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-11 w-full items-center justify-between",
        "rounded-xl border border-slate-700/80",
        "bg-slate-900/80 px-4 py-2.5",
        "text-sm font-medium text-slate-100",
        "placeholder:text-slate-500",
        "transition-all duration-200",
        "hover:border-purple-500/40",
        "focus:outline-none",
        "focus:border-purple-500",
        "focus:ring-2 focus:ring-purple-500/20",
        "focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-slate-500 transition-colors" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
)

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        "text-slate-400",
        className
      )}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  )
)

SelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        "text-slate-400",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  )
)

SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(
  (
    {
      className,
      children,
      position = "popper",
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem]",
          "overflow-hidden rounded-xl",
          "border border-slate-700/80",
          "bg-slate-950/95",
          "text-slate-100",
          "shadow-2xl shadow-black/30",
          "backdrop-blur-xl",
          "outline-none",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95",
          "data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1",
          position === "popper" &&
            "data-[side=left]:-translate-x-1",
          position === "popper" &&
            "data-[side=right]:translate-x-1",
          position === "popper" &&
            "data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            "p-1.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
)

SelectContent.displayName =
  SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        "py-2 pl-8 pr-2",
        "text-xs font-semibold uppercase tracking-wider",
        "text-slate-500",
        className
      )}
      {...props}
    />
  )
)

SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none",
        "items-center rounded-lg",
        "py-2 pl-8 pr-3",
        "text-sm text-slate-300",
        "outline-none",
        "transition-colors duration-150",
        "focus:bg-purple-500/10",
        "focus:text-purple-300",
        "data-[state=checked]:text-purple-300",
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:opacity-40",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-purple-400" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
)

SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn(
        "-mx-1 my-1 h-px",
        "bg-slate-800",
        className
      )}
      {...props}
    />
  )
)

SelectSeparator.displayName =
  SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}