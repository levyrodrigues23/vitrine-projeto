import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCongress,
} from "../../services/congress.service";
import { queryKeys } from "../../services/query-keys";
import type { Congress } from "../../types/congress.types";

type CreateCongressResult =
  | { success: true; data: Congress }
  | { success: false; error: string };

export function useCreateCongress() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ payload }: { payload: Congress }) => {
      return createCongress({ ...payload});
    },
    onSuccess: async (congress) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.congresses,
      });
      queryClient.setQueryData(
        queryKeys.congressDetail(congress.id),
        congress,
      );
    },
  });

  const execute = async (
    payload: Congress,
  ): Promise<CreateCongressResult> => {
    try {
      const data = await mutation.mutateAsync({ payload });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar congresso";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
