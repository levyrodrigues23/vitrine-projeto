import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  uploadProjectImage,
  type CreateProjectPayload,
} from "../services/projects.service";
import { queryKeys } from "../services/query-keys";
import type { Project } from "../types/project.types";

type CreateProjectResult =
  | { success: true; data: Project }
  | { success: false; error: string };

export function useCreateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      imageFile,
    }: {
      payload: CreateProjectPayload;
      imageFile?: File;
    }) => {
      let imageUrl = payload.imageUrl;

      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile);
      }

      return createProject({
        ...payload,
        imageUrl,
      });
    },
    onSuccess: async (project) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      queryClient.setQueryData(queryKeys.projectDetail(project.id), project);
    },
  });

  const execute = async (
    payload: CreateProjectPayload,
    imageFile?: File,
  ): Promise<CreateProjectResult> => {
    try {
      const data = await mutation.mutateAsync({ payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar projeto";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
