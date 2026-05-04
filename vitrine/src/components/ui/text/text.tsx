import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("font-sans", {
    variants:{
        variant:{
            "body-sm-bold": "text-sm leading-5 font-semibold",
            "body-md": "text-base leading-6 font-normal",
            "body-md-bold": "text-base leading-6 font-semibold",
            "title-1": "text-5xl leading-[1.06] font-semibold",
            "title-2": "text-3xl leading-[1.15] font-semibold",
            "title-3": "text-2xl leading-[1.2] font-semibold",
        }
    },
    defaultVariants:{
        variant: "body-md"
    }
})



interface TextProps extends VariantProps<typeof textVariants>{
    as?: keyof React.JSX.IntrinsicElements,
    className?: string;
    children?: React.ReactNode;
}


export default function Text({
    as = "span",
    variant, 
    className, 
    children,
    ...props
}: TextProps) {

return React.createElement(
as,
{
    className: textVariants({variant, className}),
    ...props
},
children
)
}