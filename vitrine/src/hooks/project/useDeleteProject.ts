import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../services/projects.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: async (_, id) => {
      // Invalidate the projects list to refresh the UI everywhere
      await queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      // Also remove the specific project detail from cache
      queryClient.removeQueries({ queryKey: queryKeys.projectDetail(id) });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir projeto";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
