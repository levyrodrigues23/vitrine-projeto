import type {
  ComponentProps,
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    animate: {
      true: "animate-spin",
      false: "",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-10 h-10",
      xl2: "w-12 h-12",
      xl3: "w-16 h-16",
    },
  },
  defaultVariants: {
    animate: false,
    size: "md",
  },
});

interface IconsProps
  extends ComponentProps<"svg">, VariantProps<typeof iconVariants> {
  svg: SvgComponent;
}

type SvgComponent =
  | ComponentType<SVGProps<SVGSVGElement>>
  | ForwardRefExoticComponent<
      SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>
    >;

export default function Icon({
  svg: SvgComponent,
  animate,
  size,
  className,
  ...props
}: IconsProps) {
  return (
    <SvgComponent
      className={iconVariants({ animate, size, className })}
      {...props}
    />
  );
}
