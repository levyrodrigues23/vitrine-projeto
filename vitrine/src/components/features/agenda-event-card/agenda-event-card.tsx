import { Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import { Badge } from "../../ui/badge/badge";
import Text from "../../ui/text/text";
import { Card, CardContent } from "../../ui/card/card";
import type { AgendaEvent } from "../../../types/agenda.types";

const categoryBadge: Record<
  AgendaEvent["categoryId"],
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  academic: { label: "Evento acadêmico", variant: "default" },
  workshop: { label: "Workshop", variant: "secondary" },
  lecture: { label: "Palestra", variant: "outline" },
  defense: { label: "Defesa", variant: "outline" },
  competition: { label: "Competição", variant: "secondary" },
};

export type AgendaEventCardProps = {
  event: AgendaEvent;
};

export function AgendaEventCard({ event }: AgendaEventCardProps) {
  const cat = categoryBadge[event.categoryId];

  return (
    <Card className="h-full overflow-hidden border-gray-base/15">
      <CardContent className="flex h-full flex-col gap-4 p-6 pt-6">
        <div className="flex flex-wrap items-start gap-3">
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue/12 text-blue-dark"
            aria-hidden
          >
            <CalendarDays className="size-5" strokeWidth={2} />
          </span>
          <Badge variant={cat.variant} className="ml-0 px-3 py-1 text-xs">
            {cat.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <Text as="h3" variant="body-lg-bold" className="text-black">
            {event.title}
          </Text>
          <Text variant="body-md" className="text-gray-base">
            {event.description}
          </Text>
        </div>

        <ul className="mt-auto space-y-2 border-t border-gray-base/10 pt-4 text-sm text-gray-base-dark">
          <li className="flex items-start gap-2">
            <Calendar className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <span>
              <span className="sr-only">Data: </span>
              {event.dateLabel}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <span>
              <span className="sr-only">Horário: </span>
              {event.timeLabel}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <span>
              <span className="sr-only">Local: </span>
              {event.location}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
