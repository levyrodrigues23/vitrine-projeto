import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../../services/teachers.service";
import { queryKeys } from "../../services/query-keys";

export function useTeacherById(id?: string) {
  const queryKey = id
    ? queryKeys.teacherDetail(id)
    : (["teachers", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) throw new Error("Teacher id is required.");
      return getTeacherById(id);
    },
    enabled: Boolean(id),
  });

  return {
    teacher: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
