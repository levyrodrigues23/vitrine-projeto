import type { ReactNode } from "react";

import PageHero from "../../layout/page-hero/page-hero";
import { Badge } from "../badge/badge";
import { Card } from "../card/card";
import Text from "../text/text";

export type FormMetric = {
  label: string;
  value: string;
  detail: string;
};

export type FormSideNote = {
  title: string;
  description: string;
};

type FormPageProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  metrics: FormMetric[];
  sideTitle: string;
  sideDescription: string;
  sideNotes: FormSideNote[];
  children: ReactNode;
};

export function FormPage({
  title,
  subtitle,
  eyebrow,
  metrics,
  sideTitle,
  sideDescription,
  sideNotes,
  children,
}: FormPageProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        className="border-none"
      />

      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-green-base/10 via-white to-transparent" />
        <div className="mx-auto w-full max-w-6xl px-6">
          {eyebrow ? (
            <div className="mb-6 flex justify-center md:justify-start">
              <Badge variant="secondary">{eyebrow}</Badge>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label} className="p-5 shadow-lg shadow-black/5">
                <Text as="p" variant="body-sm-bold" className="uppercase tracking-[0.24em] text-gray-base">
                  {metric.label}
                </Text>
                <Text as="p" variant="title-3" className="mt-3 text-black">
                  {metric.value}
                </Text>
                <Text as="p" variant="body-md" className="mt-2 text-gray-base">
                  {metric.detail}
                </Text>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
            <div className="rounded-[28px] border border-gray-base/10 bg-white/85 p-4 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur md:p-6">
              {children}
            </div>

            <aside className="space-y-4 rounded-[28px] border border-gray-base/10 bg-blue-dark p-6 text-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)]">
              <div className="space-y-3">
                <Badge variant="outline" className="border-white/30 text-white">
                  Direção visual
                </Badge>
                <Text as="h2" variant="body-lg-bold" className="text-white">
                  {sideTitle}
                </Text>
                <Text as="p" variant="body-md" className="text-white/80">
                  {sideDescription}
                </Text>
              </div>

              <div className="space-y-3 pt-2">
                {sideNotes.map((note) => (
                  <Card
                    key={note.title}
                    className="border-white/10 bg-white/10 p-4 text-white shadow-none backdrop-blur"
                  >
                    <Text as="h3" variant="body-md-bold" className="text-white">
                      {note.title}
                    </Text>
                    <Text as="p" variant="body-sm-bold" className="mt-2 text-white/75">
                      {note.description}
                    </Text>
                  </Card>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
