import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-gray-base/30 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50 md:hover:opacity-70",
  {
    variants: {
      variant: {
        default: "",
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }