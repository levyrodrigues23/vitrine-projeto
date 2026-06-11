import { useQuery } from "@tanstack/react-query";

interface TeacherArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// TODO: Implementar endpoint na API para buscar áreas de professores
async function listTeacherAreas(): Promise<TeacherArea[]> {
  // const response = await api.get<TeacherArea[]>("/teachers/areas");
  // return response.data;
  return [];
}

export function useTeacherAreas() {
  const query = useQuery({
    queryKey: ["teacher-areas"],
    queryFn: listTeacherAreas,
  });

  return {
    areas: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
