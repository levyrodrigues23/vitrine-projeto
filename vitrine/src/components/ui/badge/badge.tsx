import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-blue text-white hover:bg-blue-dark",
                secondary: "bg-green-base text-black hover:bg-green-base-dark",
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
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={badgeVariants({ variant, className })} {...props} />
    );
}