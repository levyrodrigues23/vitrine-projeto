# Arquitetura de Requisições e Gerenciamento de Estado

Este documento define o plano de implementação e as boas práticas para estruturar as chamadas de API (Supabase e Axios) dentro do projeto Vitrine de Projetos. 

O objetivo é separar as responsabilidades, facilitando a manutenção, testes e reaproveitamento de código.

---

## 1. Visão Geral da Arquitetura

O projeto utilizará uma arquitetura em **3 camadas principais** para lidar com dados assíncronos:

1. **Services (`src/services/`)**: Responsável EXCLUSIVAMENTE por fazer a comunicação com a API externa ou Supabase. Não sabe nada sobre React (não usa `useState`, `useEffect`, etc). Retorna dados puros ou lança erros.
2. **Hooks (`src/hooks/`)**: Responsável por fazer a ponte entre o React e os Services. Aqui gerenciamos os estados de `loading`, `error` e `data`.
3. **Stores / Zustand (`src/store/`)**: Responsável pelo **estado global síncrono** (como usuário logado, filtros aplicados na tela, tema). *Evite guardar dados de API aqui, a menos que precisem ser acessados por várias telas simultaneamente e raramente mudem.*

---

## 2. Camada de Serviços (Services)

**Objetivo:** Centralizar todas as chamadas de rede. Se a API mudar ou se você trocar o Supabase por outra ferramenta, você só altera aqui.

### Regras:
- Sempre tipar o retorno das funções.
- Capturar erros de infraestrutura (opcional) mas lançá-los para quem chamou a função tratar.
- Fazer o "parse" ou formatação dos dados do backend para o formato que o frontend espera.

### Exemplo: `src/services/projects.service.ts`

```typescript
import { supabase } from "./supabase";
import type { Project } from "../types/project.types";

// Função para BUSCAR dados (GET)
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar projetos: ${error.message}`);
  }

  // Aqui você formata os dados se necessário (adapter pattern)
  return data.map(item => ({
    id: item.id,
    title: item.title,
    // ... mapeamento
  }));
}

// Função para CRIAR dados (POST/INSERT)
export async function createProject(projectData: Omit<Project, 'id'>): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert([projectData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
```

---

## 3. Camada de Hooks (React Hooks)

**Objetivo:** Consumir os Services e expor variáveis amigáveis para os componentes React (`loading`, `error`, `data`).

Temos dois tipos principais de hooks:
1. **Queries** (Buscas): Rodam automaticamente quando o componente monta para pegar dados.
2. **Mutations** (Mutações): Retornam uma função que você chama manualmente (ex: no clique de um botão) para criar/editar algo.

### Exemplo de Query (Busca): `src/hooks/useProjects.ts`

```tsx
import { useState, useEffect, useCallback } from "react";
import { getProjects } from "../services/projects.service";
import type { Project } from "../types/project.types";

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProjects();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca os dados automaticamente na primeira renderização
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Retornamos 'refetch' caso o usuário queira recarregar a lista manualmente
  return { data, loading, error, refetch: fetchProjects };
}
```

### Exemplo de Mutation (Criação/Edição): `src/hooks/useCreateProject.ts`

Diferente da busca, a mutação não roda sozinha. Ela espera a ação do usuário.

```tsx
import { useState } from "react";
import { createProject } from "../services/projects.service";
import type { Project } from "../types/project.types";

export function useCreateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função que o componente vai chamar quando o formulário for submetido
  const execute = async (projectData: Omit<Project, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createProject(projectData);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
```

---

## 4. Camada de Visualização (Componentes e Páginas)

**Objetivo:** Chamar os hooks e desenhar a interface na tela. A página **nunca** deve importar o `supabase` ou o `axios` diretamente.

### Exemplo de Uso (Página de Listagem):

```tsx
import { useProjects } from "../hooks/useProjects";
import { Skeleton } from "../components/ui";

export function ProjectsPage() {
  // Consumindo nosso Hook preparado
  const { data: projects, loading, error, refetch } = useProjects();

  if (loading) return <Skeleton className="h-64 w-full" />;
  
  if (error) return (
    <div className="text-red">
      <p>Ocorreu um erro: {error}</p>
      <button onClick={refetch}>Tentar novamente</button>
    </div>
  );

  return (
    <div>
      {projects.map(proj => (
        <div key={proj.id}>{proj.title}</div>
      ))}
    </div>
  );
}
```

### Exemplo de Uso (Formulário no Gerenciador):

```tsx
import { useCreateProject } from "../hooks/useCreateProject";
import { toast } from "sua-biblioteca-de-toast"; // opcional

export function AdicionarProjetoPage() {
  const { execute, loading, error } = useCreateProject();

  const onSubmit = async (formData) => {
    const response = await execute(formData);
    
    if (response.success) {
      toast.success("Projeto criado com sucesso!");
      // Redirecionar usuário ou limpar form
    } else {
      toast.error(response.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... inputs ... */}
      <button disabled={loading}>
        {loading ? "Salvando..." : "Salvar Projeto"}
      </button>
      {error && <span className="text-red">{error}</span>}
    </form>
  );
}
```

---

## 5. E onde o Zustand entra? (`src/store`)

O **Zustand** deve ser reservado para **Estado Global do App** e não para guardar dados que vieram do banco (salvo raras exceções).

**O que guardar no Zustand?**
- Usuário logado e seus tokens (`useAuthStore`).
- Configurações da UI (sidebar aberta/fechada, tema claro/escuro).
- Filtros de pesquisa globais (ex: o termo digitado na barra de pesquisa superior para filtrar a lista na página `Projetos`).

**O que NÃO guardar no Zustand?**
- A lista de projetos completa retornada do banco (deixe o `useProjects` gerenciar isso).
- O estado de `loading` das requisições.

> **Dica Pro:** No futuro, se a aplicação crescer muito e você precisar de cache de requisições, paginação complexa ou background fetching, você pode substituir os hooks customizados por uma biblioteca como o **React Query (`@tanstack/react-query`)**, que usa exatamente esse padrão mental que criamos no tópico 3, mas de forma automatizada e super otimizada.
