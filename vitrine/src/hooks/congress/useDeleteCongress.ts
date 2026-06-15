import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMinicourse } from "../../services/minicourse.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteMinicourse() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteMinicourse(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.minicourses });
      queryClient.removeQueries({ queryKey: queryKeys.minicourseDetail(id) });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir minicurso";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
