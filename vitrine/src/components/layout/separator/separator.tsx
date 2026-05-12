import { cva, type VariantProps } from "class-variance-authority";



export const separatorVariants = cva("shrink-0 bg-gray-base/30", {
    variants: {
        variant: {
            horizontal: " min-h-px w-full",
            vertical: "h-full min-h-16 w-px min-w-px self-stretch",
        },
    },
    defaultVariants:{
        variant:"horizontal"
    }
})


export interface SeparatorProps extends VariantProps<typeof separatorVariants> {
    className?: string;

}


export default function Separator({ variant, className, ...props}: SeparatorProps){
    return (
        <div className={separatorVariants({variant, className})} {...props}>
            
        </div>
    )
}