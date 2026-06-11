import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "../../services/teachers.service";
import { queryKeys } from "../../services/query-keys";
import type { Teacher } from "../../types/teachers.types";

type CreateTeacherResult =
  | { success: true; data: Teacher }
  | { success: false; error: string };

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: Teacher) => createTeacher(payload),
    onSuccess: async (teacher) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.teachers });
      queryClient.setQueryData(queryKeys.teacherDetail(teacher.id), teacher);
    },
  });

  const execute = async (payload: Teacher): Promise<CreateTeacherResult> => {
    try {
      const data = await mutation.mutateAsync(payload);
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar professor";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
