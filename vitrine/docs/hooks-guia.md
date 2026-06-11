# Guia de Hooks — Vitrine

Este documento explica como os hooks de dados estão organizados no projeto e como aplicá-los nas telas.

## Onde ficam os hooks

```
vitrine/src/hooks/
├── project/          # Projetos
├── teacher/          # Professores
├── startup/          # Startups
├── paper/            # Artigos
├── minicourse/       # Minicursos
├── junior-company/   # Empresa Júnior
└── egress/           # Egressos (stub)
```

Cada pasta tem um `index.ts` que re-exporta os hooks daquele domínio. Importe sempre pelo domínio:

```tsx
import { useProjects, useProject } from "../../hooks/project";
```

---

## Dois tipos de hook

### 1. Query hooks — **ler** dados (GET)

Usam `useQuery` do TanStack React Query. Disparam uma requisição HTTP e guardam o resultado em cache.

**Lista (ex.: `useProjects`):**

```tsx
const { projects, loading, error, refresh } = useProjects();
```

| Retorno   | Significado                                      |
|-----------|--------------------------------------------------|
| `projects`| Array de projetos (ou `[]` enquanto carrega)     |
| `loading` | `true` enquanto a primeira requisição está ativa |
| `error`   | Mensagem de erro ou `null`                       |
| `refresh` | Função para buscar de novo manualmente           |

**Detalhe (ex.: `useProject`):**

```tsx
const { id } = useParams();
const { project, loading, error } = useProject(id);
```

#### Por que `enabled: Boolean(id)`?

No hook de detalhe, a opção `enabled` controla **se a query deve rodar ou não**:

```tsx
useQuery({
  queryKey: queryKeys.projectDetail(id),
  queryFn: () => getProjectById(id),
  enabled: Boolean(id),  // só busca quando `id` existe
});
```

Sem isso, a página montaria com `id` ainda `undefined` (React Router demora um tick) e a API seria chamada com ID inválido. Com `enabled: false`, a query fica **pausada** até o ID existir.

---

### 2. Mutation hooks — **escrever** dados (POST, PUT, DELETE)

Usam `useMutation`. Servem para criar, editar ou excluir registros.

```tsx
const { execute, loading, error } = useCreateProject();

const handleSubmit = async (data) => {
  const result = await execute(data, imageFile);

  if (result.success) {
    navigate(`/projetos/${result.data.id}`);
  } else {
    alert(result.error);
  }
};
```

#### O que é `mutationFn: async (...)`?

É a função que **realmente executa** a operação (chamada à API). O `async` permite usar `await` dentro — por exemplo, fazer upload da imagem antes de criar o projeto:

```tsx
mutationFn: async ({ payload, imageFile }) => {
  let imageUrl = payload.imageUrl;
  if (imageFile) {
    imageUrl = await uploadProjectImage(imageFile);  // espera o upload
  }
  return createProject({ ...payload, imageUrl });    // depois cria
},
```

#### O que é `mutateAsync`?

É o método do React Query que executa a mutation e **retorna uma Promise**. O hook encapsula isso em `execute()` com try/catch para devolver `{ success: true, data }` ou `{ success: false, error }` — um formato mais simples para usar nos formulários.

#### O que acontece no `onSuccess`?

Depois de criar/editar, o cache é atualizado:

```tsx
onSuccess: async (project) => {
  await queryClient.invalidateQueries({ queryKey: queryKeys.projects }); // lista desatualizada → refetch
  queryClient.setQueryData(queryKeys.projectDetail(project.id), project); // detalhe já atualizado
},
```

Assim, ao voltar para a listagem, os dados já refletem a alteração.

---

## Query keys — identidade do cache

Arquivo: `vitrine/src/services/query-keys.ts`

```tsx
queryKeys.projects              // ["projects"]
queryKeys.projectDetail("abc")  // ["projects", "abc"]
```

Cada combinação de key guarda um cache separado. Mutations invalidam as keys relacionadas para manter tudo sincronizado.

---

## Como aplicar nos componentes visuais

### Padrão básico (listagem)

```tsx
export function MinhaListagemPage() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <ul>
      {projects.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

### Padrão com filtro local (sem nova requisição)

Os dados já vêm todos de `useProjects()`. Filtros de busca e categoria são feitos no front com `useMemo`:

```tsx
const filtered = useMemo(
  () => filterProjects(projects, activeCategory, searchQuery),
  [projects, activeCategory, searchQuery],
);
```

Isso evita chamar a API a cada keystroke — você filtra o array em memória.

### Padrão de detalhe

```tsx
export function ProjectDetailPage() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  if (loading) return <p>Carregando...</p>;
  if (error || !project) return <p>Projeto não encontrado.</p>;

  return <h1>{project.title}</h1>;
}
```

### Padrão de formulário (criar/editar)

```tsx
export function AdicionarProjetoPage() {
  const { execute, loading } = useCreateProject();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const result = await execute(values, imageFile);
    if (result.success) navigate("/gerenciador");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* campos */}
      <button disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
```

Use `loading` (alias de `isPending`) para desabilitar o botão durante o envio.

---

## Mapa: hook → tela

| Hook | Tipo | Telas que usam / podem usar |
|------|------|-----------------------------|
| `useProjects` | Query (lista) | Home, `/projetos`, `/projetos/pesquisa`, Admin |
| `useProject` | Query (detalhe) | `/projetos/:id` |
| `useCreateProject` | Mutation | Gerenciador → adicionar projeto |
| `useUpdateProject` | Mutation | Gerenciador → editar projeto |
| `useDeleteProject` | Mutation | Gerenciador → excluir projeto |
| `useTeachers` | Query (lista) | Página de professores |
| `useTeacherById` | Query (detalhe) | Detalhe do professor |
| `useStartups` | Query (lista) | Empreendedorismo → startups |
| `useArtigos` | Query (lista) | Produção acadêmica |
| `useMinicourses` | Query (lista) | Minicursos |
| `useJuniorCompanies` | Query (lista) | Empresa júnior |

Hooks de teacher, paper, minicourse etc. já existem com o mesmo padrão de `useProjects` — basta importar e usar o trio `{ dados, loading, error }`.

---

## Estado local vs React Query

| Responsabilidade | Ferramenta | Exemplo |
|------------------|------------|---------|
| Dados do servidor | React Query (`useProjects`) | Lista de projetos da API |
| Filtros de UI | Zustand (`useProjectStore`) | Categoria ativa, texto de busca |
| Formulários | React Hook Form + Zod | Campos de cadastro |

Não misture filtros de UI no React Query — eles não vêm do servidor. Use `useMemo` para derivar a lista filtrada.

---

## Referência rápida de sintaxe

| Sintaxe | O que significa |
|---------|-----------------|
| `useQuery({ queryKey, queryFn })` | Buscar e cachear dados |
| `useMutation({ mutationFn, onSuccess })` | Alterar dados no servidor |
| `enabled: Boolean(id)` | Só executa a query quando a condição é verdadeira |
| `queryFn: async () => ...` | Função assíncrona que retorna os dados |
| `mutationFn: async (vars) => ...` | Função assíncrona que altera dados |
| `mutateAsync(vars)` | Executa a mutation e retorna Promise |
| `invalidateQueries({ queryKey })` | Marca cache como velho → refetch na próxima leitura |
| `setQueryData(key, data)` | Atualiza o cache manualmente |
| `query.data ?? []` | Usa array vazio se ainda não carregou |
| `query.isLoading` | Primeira carga em andamento |
| `mutation.isPending` | Mutation em andamento (exposto como `loading`) |

---

## Exemplo completo: substituir mock por hook

**Antes (mock estático):**

```tsx
const projects = MOCK_PROJECTS;
```

**Depois (hook):**

```tsx
import { useProjects } from "../../hooks/project";

export function StartupsPage() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return projects.map(/* renderizar cards */);
}
```

O visual não muda — só a fonte dos dados.
