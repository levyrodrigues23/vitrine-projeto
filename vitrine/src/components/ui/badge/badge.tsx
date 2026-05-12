import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
    "inline-flex items-center rounded-full px-10 py-1 text-xs font-semibold transition-colors ml-2",
    {
        variants: {
            variant: {
                default: "bg-blue text-white hover:bg-blue-dark",
                secondary: "bg-green-base text-black hover:bg-green-base-dark",
                tertiary: "bg-yellow text-black hover:bg-yellow-dark",
                destructive: "bg-red text-white hover:bg-red-dark",
                outline: "text-black border border-black hover:bg-gray-100",

            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span className={badgeVariants({ variant, className })} {...props} />
    );
}