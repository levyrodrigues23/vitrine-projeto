import { cva } from "class-variance-authority";

import { Badge } from "../badge/badge";
import { Card } from "../card/card";
import Text from "../text/text";

export type FormChoice = {
  value: string;
  title: string;
  description: string;
  badge?: string;
  accent?: "blue" | "green" | "yellow" | "red";
};

type FormChoiceGridProps = {
  name: string;
  title: string;
  description?: string;
  value: string;
  choices: FormChoice[];
  onChange: (value: string) => void;
  error?: string;
};

const choiceAccentVariants = cva("border-transparent", {
  variants: {
    accent: {
      blue: "border-blue/30 bg-blue/6",
      green: "border-green-base/30 bg-green-base/8",
      yellow: "border-yellow/35 bg-yellow/12",
      red: "border-red/30 bg-red/8",
    },
  },
  defaultVariants: {
    accent: "blue",
  },
});

export function FormChoiceGrid({
  name,
  title,
  description,
  value,
  choices,
  onChange,
  error,
}: FormChoiceGridProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Text as="h3" variant="body-lg-bold" className="text-black">
          {title}
        </Text>
        {description ? (
          <Text as="p" variant="body-md" className="text-gray-base">
            {description}
          </Text>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {choices.map((choice) => {
          const selected = choice.value === value;

          return (
            <label key={choice.value} className="block cursor-pointer">
              <input
                type="radio"
                name={name}
                value={choice.value}
                checked={selected}
                onChange={() => onChange(choice.value)}
                className="sr-only"
              />
              <Card
                variant="interactive"
                className={`${choiceAccentVariants({ accent: choice.accent })} h-full space-y-3 border p-5 transition-all duration-300 ${
                  selected
                    ? "ring-2 ring-blue shadow-lg shadow-blue/10"
                    : "opacity-90 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Text as="span" variant="body-lg-bold" className="text-black">
                    {choice.title}
                  </Text>
                  {choice.badge ? <Badge variant="outline">{choice.badge}</Badge> : null}
                </div>
                <Text as="p" variant="body-md" className="text-gray-base">
                  {choice.description}
                </Text>
              </Card>
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="text-xs font-semibold text-red">{error}</p>
      ) : null}
    </div>
  );
}
