import { useId, useState } from "react";
import { Question } from "@phosphor-icons/react";

export type BlockHelpProps = {
  topicLabel: string;
  explanation: string;
  className?: string;
};

export function BlockHelp({ topicLabel, explanation, className }: BlockHelpProps) {
  const reactId = useId().replace(/:/g, "");
  const panelId = `block-help-${reactId}`;
  const [open, setOpen] = useState(false);

  return (
    <span className={`relative inline-flex align-middle ${className ?? ""}`}>
      <button
        type="button"
        className="rounded-full p-1 text-blue-dark transition hover:bg-blue/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Explicação breve: ${topicLabel}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Question className="size-4 shrink-0" weight="bold" aria-hidden />
      </button>
      {open ? (
        <span
          id={panelId}
          role="region"
          aria-live="polite"
          className="absolute left-1/2 top-full z-20 mt-2 w-[min(100vw-3rem,20rem)] -translate-x-1/2 rounded-lg border border-gray-base/15 bg-white p-3 text-left text-sm leading-snug text-gray-base-dark shadow-md sm:left-0 sm:translate-x-0"
        >
          {explanation}
        </span>
      ) : null}
    </span>
  );
}
