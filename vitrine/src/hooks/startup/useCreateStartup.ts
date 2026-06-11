import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStartup,
  uploadStartupImage,
  type CreateStartupPayload,
} from "../../services/startup.service";
import { queryKeys } from "../../services/query-keys";
import type { Startup } from "../../types/startup.types";

type CreateStartupResult =
  | { success: true; data: Startup }
  | { success: false; error: string };

export function useCreateStartup() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      imageFile,
    }: {
      payload: CreateStartupPayload;
      imageFile?: File;
    }) => {
      let imageUrl = payload.imageUrl;

      if (imageFile) {
        imageUrl = await uploadStartupImage(imageFile);
      }

      return createStartup({
        ...payload,
        imageUrl,
      });
    },
    onSuccess: async (startup) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.startups });
      queryClient.setQueryData(queryKeys.startupDetail(startup.id), startup);
    },
  });

  const execute = async (
    payload: CreateStartupPayload,
    imageFile?: File,
  ): Promise<CreateStartupResult> => {
    try {
      const data = await mutation.mutateAsync({ payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar startup";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
