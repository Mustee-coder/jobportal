import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "dark" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group-[.toaster]:bg-slate-950/95 " +
            "group-[.toaster]:text-slate-100 " +
            "group-[.toaster]:border-slate-700/80 " +
            "group-[.toaster]:shadow-2xl " +
            "group-[.toaster]:shadow-black/30 " +
            "group-[.toaster]:backdrop-blur-xl",

          title:
            "group-[.toast]:text-slate-100 " +
            "group-[.toast]:font-semibold",

          description:
            "group-[.toast]:text-slate-400",

          actionButton:
            "group-[.toast]:bg-gradient-to-r " +
            "group-[.toast]:from-purple-600 " +
            "group-[.toast]:to-pink-600 " +
            "group-[.toast]:text-white " +
            "group-[.toast]:font-semibold",

          cancelButton:
            "group-[.toast]:bg-slate-800 " +
            "group-[.toast]:text-slate-300 " +
            "group-[.toast]:border-slate-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

