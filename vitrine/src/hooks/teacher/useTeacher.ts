import { useQuery } from "@tanstack/react-query";
import { listTeachers } from "../../services/teachers.service";
import { queryKeys } from "../../services/query-keys";

export function useTeachers() {
  const query = useQuery({
    queryKey: queryKeys.teachers,
    queryFn: listTeachers,
  });

  return {
    teachers: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
