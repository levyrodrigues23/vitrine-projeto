import type { ComponentProps, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const iconVariants = cva("", {
  variants:{
      animate:{
        true: "animate-spin",
        false: ""
      },
      size:{
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      }
  },
  defaultVariants:{
    animate: false,
    size: "md",
  }
})



interface IconsProps extends ComponentProps<"svg">, VariantProps<typeof iconVariants> {
    svg: FC<ComponentProps<"svg">>;
}



export default function Icon({svg:SvgComponent, animate, className, ...props}: IconsProps){
  return (
    <SvgComponent className={iconVariants({animate, className})} {...props} />
  )
}