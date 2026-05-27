import type { ReactNode } from "react";

import PageHero from "../../layout/page-hero/page-hero";
import { Badge } from "../badge/badge";

type FormPageProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: ReactNode;
};

export function FormPage({
  title,
  subtitle,
  eyebrow,
  children,
}: FormPageProps) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} className="border-none" />

      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-green-base/10 via-white to-transparent" />
        <div className="mx-auto w-full max-w-4xl px-6">
          {eyebrow ? (
            <div className="mb-6 flex justify-center md:justify-start">
              <Badge variant="secondary">{eyebrow}</Badge>
            </div>
          ) : null}

          <div className="mt-8">
            <div className="rounded-[28px] border border-gray-base/10 bg-white/85 p-4 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur md:p-6">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
