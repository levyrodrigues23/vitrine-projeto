import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";

import { Card } from "../card/card";
import Text from "../text/text";

export const formControlClass =
  "w-full rounded-2xl border border-gray-base/20 bg-white px-4 py-3 text-sm text-black shadow-sm transition placeholder:text-gray-base/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30";

type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function FormField({
  label,
  hint,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = `field-${generatedId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const child = isValidElement(children)
    ? (children as ReactElement<Record<string, unknown>>)
    : null;
  const enhancedChildren = child
    ? cloneElement(child, {
        id: child.props.id ?? inputId,
        "aria-describedby": describedBy,
        "aria-invalid": Boolean(error),
        "aria-required": required,
      })
    : children;

  return (
    <label
      htmlFor={inputId}
      className={`block space-y-2 ${className ?? ""}`}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-black">
        {label}
        {required ? <span className="text-red">*</span> : null}
      </span>
      {enhancedChildren}
      {hint ? (
        <Text
          id={hintId}
          as="span"
          variant="body-sm-bold"
          className="block text-xs text-gray-base"
        >
          {hint}
        </Text>
      ) : null}
      {error ? (
        <Text
          id={errorId}
          as="span"
          variant="body-sm-bold"
          className="block text-xs text-red"
        >
          {error}
        </Text>
      ) : null}
    </label>
  );
}

export function FormTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      style={{ minHeight: 140, ...props.style }}
      className={`${formControlClass} resize-y ${props.className ?? ""}`}
    />
  );
}

export function FormSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select
      {...props}
      className={`${formControlClass} h-12 ${props.className ?? ""}`}
    />
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <Text as="p" variant="body-sm-bold" className="text-xs text-red">
      {message}
    </Text>
  );
}

type FormSectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormSectionCard({
  title,
  description,
  children,
}: FormSectionCardProps) {
  return (
    <Card className="space-y-5 p-6 md:p-8">
      <div className="space-y-2">
        <Text as="h2" variant="body-lg-bold" className="text-black">
          {title}
        </Text>
        {description ? (
          <Text as="p" variant="body-md" className="text-gray-base">
            {description}
          </Text>
        ) : null}
      </div>
      {children}
    </Card>
  );
}
