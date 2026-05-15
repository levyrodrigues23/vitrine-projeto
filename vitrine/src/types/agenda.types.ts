export type AgendaEventCategoryId =
  | "all"
  | "academic"
  | "workshop"
  | "lecture"
  | "defense"
  | "competition";

export type AgendaEvent = {
  id: string;
  title: string;
  description: string;
  categoryId: Exclude<AgendaEventCategoryId, "all">;
  dateLabel: string;
  timeLabel: string;
  location: string;
};
