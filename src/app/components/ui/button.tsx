import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
