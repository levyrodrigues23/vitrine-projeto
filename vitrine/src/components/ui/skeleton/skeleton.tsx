import { cva, type VariantProps } from "class-variance-authority";


export const skeletonVariants = cva("animate-pulse bg-gray-300 pointer-events-none", {
  variants: {
    rounded: {
      sm: "rounded-sm",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    size: {
      sm:   "w-24 h-4",
      md:   "w-48 h-6",
      lg:   "w-full h-10",
      circle: "w-12 h-12",
    },
  },
  defaultVariants: {
    rounded: "lg",
    size: "md",      
  },
});


export interface SkeletonProps
    extends VariantProps<typeof skeletonVariants>,
        React.ComponentProps<"div"> {}

export default function Skeleton({ rounded, className, size, ...props }: SkeletonProps) {
  return <div
    className={skeletonVariants({ rounded, className, size })}
    {...props}
  />
}