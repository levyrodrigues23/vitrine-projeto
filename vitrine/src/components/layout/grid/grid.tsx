import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const gridVariants = cva("grid gap-6", {
    variants: {
        /** Colunas responsivas (mobile começa sempre em 1). */
        columns: {
            one: "grid-cols-1",
            two: "grid-cols-1 sm:grid-cols-2",
            three: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            four: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
        },
    },
    defaultVariants: {
        columns: "three",
    },
});

export type GridProps = VariantProps<typeof gridVariants> & ComponentProps<"div">;

export function Grid({ className, columns, ...props }: GridProps) {
    return <div className={gridVariants({ columns, className })} {...props} />;
}
