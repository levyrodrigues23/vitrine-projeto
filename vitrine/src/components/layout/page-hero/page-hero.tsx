import { useId } from "react";
import Text, { textVariants } from "../../ui/text/text";

export type PageHeroProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function PageHero({ title, subtitle, className }: PageHeroProps) {
  const titleId = `page-hero-title-${useId().replace(/:/g, "")}`;

  return (
    <section
      className={`relative mb-10 overflow-hidden border-b border-gray-base/10 md:mb-12 ${className ?? ""}`}
      aria-labelledby={titleId}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-base/35 via-white-base to-blue/12"
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center md:py-20">
        <h1
          id={titleId}
          className={textVariants({
            variant: "title-2",
            className:
              "max-w-3xl text-balance text-black text-4xl sm:text-5xl",
          })}
        >
          {title}
        </h1>
        {subtitle ? (
          <Text
            as="p"
            variant="body-lg"
            className="mt-4 max-w-2xl text-pretty text-gray-base-dark"
          >
            {subtitle}
          </Text>
        ) : null}
      </div>
    </section>
  );
}
