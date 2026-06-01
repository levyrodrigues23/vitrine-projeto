export const queryKeys = {
  projects: ["projects"] as const,
  projectDetail: (id: string) => ["projects", id] as const,

};
