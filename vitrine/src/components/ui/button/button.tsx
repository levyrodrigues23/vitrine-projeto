import { cva, type VariantProps } from "class-variance-authority";




export const buttonVariants = cva("group rounded-full text-center inline-flex items-center justify-center gap-2 px-3 py-2 font-semibold border border-solid transition-all duration-300 cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-gradient-to-br from-blue to-blue-dark hover:from-blue-dark hover:to-blue text-white border-blue",
                secondary: "bg-gradient-to-br from-green-base to-green-base-dark hover:from-green-base-dark hover:to-green-base text-black border-green-base",
                tertiary: "bg-gradient-to-br from-red to-red-dark hover:from-red-dark hover:to-red text-white border-red",
                quaternary: "bg-gradient-to-br from-gray-base to-gray-base-dark hover:from-gray-base-dark hover:to-gray-base text-white border-gray-base",
                
            },
            size: {
                sm: "px-2 py-1",
                md: "px-4 py-1",
                lg: "px-6 py-1",
            },
            disabled: {
                true: "opacity-50 pointer-events-none"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "sm",
            disabled: false
        }
    }
)



export interface ButtonProps
    extends VariantProps<typeof buttonVariants>,
        Omit<React.ComponentProps<"button">, "size" | "disabled"> {}



export function Button({ size, variant, className, disabled, children, ...props }: ButtonProps) {
    return (
        <button
            type="button"
            className={buttonVariants({ size, variant, disabled, className })}
            disabled={Boolean(disabled)}
            {...props}
        >
            {children}
        </button>
    );
}