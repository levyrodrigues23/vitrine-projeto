import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacher } from "../../services/teachers.service";
import { queryKeys } from "../../services/query-keys";
import type { Teacher } from "../../types/teachers.types";

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Teacher> }) =>
      updateTeacher(id, payload),
    onSuccess: async (teacher) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.teachers });
      queryClient.setQueryData(queryKeys.teacherDetail(teacher.id), teacher);
    },
  });

  const execute = async (id: string, payload: Partial<Teacher>) => {
    try {
      const data = await mutation.mutateAsync({ id, payload });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar professor";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
