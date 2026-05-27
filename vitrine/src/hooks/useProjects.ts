import { useCallback, useEffect, useState } from "react";
import { listProjects } from "../services/projects.service";
import type { Project } from "../types/project.types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await listProjects();
      setProjects(list);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "erro ao carregar projetos",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await listProjects();
        if (alive) setProjects(list);
      } catch (err) {
        if (alive) {
          setError(err instanceof Error ? err.message : "erro ao carregar projetos");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { projects, loading, error, refresh };
}
