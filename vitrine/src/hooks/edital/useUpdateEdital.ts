import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEdital } from "../../services/edital.service";
import { queryKeys } from "../../services/query-keys";
import type { Edital } from "../../types/edital.types";

export function useUpdateEdital() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Edital>;
    }) => updateEdital(id, payload),

    onSuccess: async (edital) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.notices });

      queryClient.setQueryData(
        queryKeys.noticesDetail(edital.id),
        edital,
      );
    },
  });

  const execute = async (id: string, payload: Partial<Edital>) => {
    try {
      const data = await mutation.mutateAsync({ id, payload });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar edital";

      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}