import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputCheckboxVariants = cva(
    "peer size-4 shrink-0 cursor-pointer rounded border border-gray-base/30 bg-transparent text-blue accent-blue shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface InputCheckboxProps
    extends Omit<React.ComponentProps<"input">, "type" | "size">,
        VariantProps<typeof inputCheckboxVariants> {}

export const InputCheckbox = React.forwardRef<HTMLInputElement, InputCheckboxProps>(
    ({ className, variant, ...props }, ref) => (
        <input
            ref={ref}
            type="checkbox"
            className={inputCheckboxVariants({ variant, className })}
            {...props}
        />
    )
);
InputCheckbox.displayName = "InputCheckbox";
