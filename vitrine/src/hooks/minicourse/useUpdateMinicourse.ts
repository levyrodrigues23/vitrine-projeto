import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMinicourse } from "../../services/minicourse.service";
import { queryKeys } from "../../services/query-keys";
import type { Minicourse } from "../../types/minicourse.types";

export function useUpdateMinicourse() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Minicourse>;
    }) => updateMinicourse(id, payload),
    onSuccess: async (minicourse) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.minicourses });
      queryClient.setQueryData(
        queryKeys.minicourseDetail(minicourse.id),
        minicourse,
      );
    },
  });

  const execute = async (id: string, payload: Partial<Minicourse>) => {
    try {
      const data = await mutation.mutateAsync({ id, payload });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar minicurso";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
