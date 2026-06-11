import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProject,
  uploadProjectImage,
} from "../../services/projects.service";
import { queryKeys } from "../../services/query-keys";
import type { Project } from "../../types/project.types";

type UpdateProjectPayload = Partial<Project>;

export function useUpdateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      payload,
      imageFile,
    }: {
      id: string;
      payload: UpdateProjectPayload;
      imageFile?: File;
    }) => {
      let imageUrl = payload.imageUrl;

      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile);
      }

      return updateProject(id, {
        ...payload,
        ...(imageUrl && { imageUrl }),
      });
    },
    onSuccess: async (project) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      queryClient.setQueryData(queryKeys.projectDetail(project.id), project);
    },
  });

  const execute = async (
    id: string,
    payload: UpdateProjectPayload,
    imageFile?: File,
  ) => {
    try {
      const data = await mutation.mutateAsync({ id, payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar projeto";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
