import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50",
        "bg-slate-950/80 backdrop-blur-sm",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
)

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50",
          "grid w-[calc(100%-2rem)] max-w-lg",
          "-translate-x-1/2 -translate-y-1/2",
          "gap-5 p-6 sm:p-7",
          "rounded-2xl",
          "border border-slate-700/70",
          "bg-slate-950/95",
          "text-slate-100",
          "shadow-2xl shadow-black/40",
          "backdrop-blur-xl",
          "duration-200",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95",
          "data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2",
          "data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2",
          "data-[state=open]:slide-in-from-top-[48%]",
          className
        )}
        {...props}
      >
        {children}

        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4",
            "flex h-8 w-8 items-center justify-center",
            "rounded-lg",
            "text-slate-500",
            "transition-all duration-200",
            "hover:bg-slate-800",
            "hover:text-slate-200",
            "focus:outline-none",
            "focus:ring-2 focus:ring-purple-500/40",
            "disabled:pointer-events-none"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5",
      "text-center sm:text-left",
      className
    )}
    {...props}
  />
)

DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2",
      "sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
)

DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold",
        "tracking-tight text-slate-100",
        className
      )}
      {...props}
    />
  )
)

DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        "text-sm leading-relaxed",
        "text-slate-400",
        className
      )}
      {...props}
    />
  )
)

DialogDescription.displayName =
  DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}