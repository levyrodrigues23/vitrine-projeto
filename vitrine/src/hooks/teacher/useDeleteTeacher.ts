import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../../services/teachers.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteTeacher(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.teachers });
      queryClient.removeQueries({ queryKey: queryKeys.teacherDetail(id) });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir professor";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
