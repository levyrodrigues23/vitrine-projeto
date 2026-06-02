# Implementation Plan

## Arquitetura final

A aplicação deve seguir este fluxo de responsabilidades:

`Component` -> `Hook` -> `Service` -> `Backend API (C#)`

- `components/`: somente UI e composição visual.
- `pages/`: orquestração de tela. Não acessa Supabase diretamente. Não faz upload. Não faz persistência.
- `hooks/`: camada React para leitura e mutação de server state. Aqui ficam `useQuery`, `useMutation`, invalidação de cache e adaptação do retorno para a UI.
- `services/`: acesso ao backend via HTTP, uploads, queries, inserts, updates e deletes. Nenhuma regra de tela.
- `store/`: apenas estado de interface, filtros, sidebar, modais, preferências e autenticação local/sessão.
- `types/`: contratos de domínio e DTOs compartilhados.

O backend em C# é a única fonte de verdade para dados persistidos.

## Responsabilidade de cada pasta

### `services/`
Use quando houver qualquer operação de backend.

Criar um service quando o código precisar de:
- leitura de tabela
- leitura de item único
- upload de arquivo
- criação
- atualização
- remoção
- transformação entre `row` do banco e `type` do frontend
- transformação entre DTO de request/response e `type` do frontend

Regras:
- service não chama React
- service não usa Zustand
- service não conhece componentes
- service deve ser puro e previsível

### `hooks/`
Use quando a operação precisar ser consumida por React.

Criar um hook quando o código precisar de:
- `useQuery` para buscar dados
- `useMutation` para alterar dados
- invalidação de cache
- memoização de retornos para a UI
- estado de loading/error da operação

Regras:
- hook chama service
- hook pode chamar `queryClient`
- hook não deve conter UI
- hook não deve conversar direto com Supabase

### `store/`
Use somente para estado do cliente que não é dado persistido.

Estados permitidos:
- filtros
- sidebar
- modais
- preferências do usuário
- sessão/autenticação local
- estado de interface global

Estados proibidos:
- listas vindas do banco
- registro de entidades persistidas
- cache de collections remotas
- duplicação de dados que já existem no Supabase

### `types/`
Use para:
- tipos de domínio
- enums de tela
- DTOs
- tipos de payload
- tipos de resposta do banco, se forem reaproveitados

### `components/`
Use para:
- UI pura
- componentes de formulário
- cards, filtros, listas, modais, etc.

Regra:
- componente visual não deve buscar dados sozinho, a não ser que seja um container muito específico e aceito pela arquitetura do módulo.

### `pages/`
Use para:
- compor hooks e componentes
- ler parâmetros de rota
- redirecionar
- coordenar submit de formulário
- montar a experiência de tela

Regra:
- página não chama Supabase
- página não faz upload
- página não muta dados persistidos diretamente

## Quando criar um service

Crie um service sempre que houver uma operação de infraestrutura ou banco.

Exemplo:
- `listProjects()`
- `getProjectById(id)`
- `createProject(payload)`
- `updateProject(id, payload)`
- `deleteProject(id)`
- `uploadProjectImage(file)`

Padrão de nomenclatura:
- arquivo: `camelCase.service.ts`
- funções: verbos no infinitivo ou descritivos, como `listProjects`, `createProject`, `updateProject`

## Quando criar um hook

Crie um hook quando a UI precisar acessar dados ou executar mutações.

Exemplo:
- `useProjects()`
- `useProject(id)`
- `useCreateProject()`
- `useUpdateProject()`
- `useDeleteProject()`

Padrão de nomenclatura:
- `use` + nome do recurso + intenção
- leitura: `useProjects`, `useProject`
- mutação: `useCreateProject`, `useUpdateProject`, `useDeleteProject`

## Quando usar TanStack Query

Use TanStack Query para qualquer dado que venha do backend e precise ser sincronizado.

Use `useQuery` quando:
- a tela carrega uma lista
- a tela carrega um detalhe
- você precisa de cache
- você precisa de refetch automático ou manual
- a mesma informação é consumida por mais de um lugar

Use `useMutation` quando:
- criar
- atualizar
- remover
- fazer upload antes de persistir
- executar qualquer ação com side effects

## Quando usar Zustand

Use Zustand somente para estado local/global de interface.

Casos corretos:
- filtro de categoria
- texto de busca
- sidebar aberta/fechada
- modal aberto/fechado
- tema
- preferências do usuário
- snapshot de autenticação

Casos incorretos:
- projetos vindos do banco
- professores vindos do banco
- artigos vindos do banco
- qualquer collection remota

## Quando usar `useQuery`

Use `useQuery` para leitura de server state.

Exemplos:
- `useQuery({ queryKey: ['projects'], queryFn: listProjects })`
- `useQuery({ queryKey: ['projects', id], queryFn: () => getProjectById(id) })`

Boas práticas:
- query keys estáveis
- query keys por módulo
- não duplicar cache com Zustand
- usar `enabled` para dados opcionais

## Quando usar `useMutation`

Use `useMutation` para operações que alteram o backend.

Exemplos:
- `createProject`
- `updateProject`
- `deleteProject`
- `uploadProjectImage`

Boas práticas:
- mutation chama service
- success invalida cache
- success pode preencher cache do detalhe
- formulário não deve executar fetch direto

## Como criar novos módulos

A regra para qualquer CRUD novo é a mesma.

### Estrutura sugerida

- `src/types/<module>.types.ts`
- `src/services/<module>.service.ts`
- `src/hooks/use<Module>.ts`
- `src/hooks/useCreate<Module>.ts`
- `src/hooks/useUpdate<Module>.ts`
- `src/hooks/useDelete<Module>.ts`
- `src/components/features/<module>/...`
- `src/pages/<module>/...`

### Exemplo: Projects

Arquivos atuais de referência:
- `src/services/projects.service.ts`
- `src/hooks/useProjects.ts`
- `src/hooks/useProject.ts`
- `src/hooks/useCreateProject.ts`
- `src/pages/project/project-list.page.tsx`
- `src/pages/project/project-detail.page.tsx`
- `src/pages/gerenciador/adicionar-projeto.page.tsx`

Fluxo:
- componente de página dispara submit
- hook executa mutation
- service conversa com Supabase
- TanStack Query invalida `projects`
- listagem e detalhe refazem leitura

### Exemplo: Teachers

Arquivos a criar:
- `src/types/teachers.types.ts`
- `src/services/teachers.service.ts`
- `src/hooks/useTeachers.ts`
- `src/hooks/useTeacher.ts`
- `src/hooks/useCreateTeacher.ts`
- `src/hooks/useUpdateTeacher.ts`
- `src/hooks/useDeleteTeacher.ts`
- `src/pages/professores/professores.page.tsx`
- `src/pages/gerenciador/adicionar-professor.page.tsx`

Fluxo:
- página lista professores com `useTeachers`
- formulário chama `useCreateTeacher`
- service centraliza leitura e persistência
- mutation invalida `['teachers']`

### Exemplo: Articles

Arquivos a criar:
- `src/types/papers.types.ts`
- `src/services/articles.service.ts` ou `src/services/papers.service.ts`
- `src/hooks/useArticles.ts`
- `src/hooks/useArticle.ts`
- `src/hooks/useCreateArticle.ts`
- `src/hooks/useUpdateArticle.ts`
- `src/hooks/useDeleteArticle.ts`
- `src/pages/producao-cientifica/artigos-publicacoes.page.tsx`
- `src/pages/gerenciador/adicionar-artigo.page.tsx`

Fluxo:
- listagem usa `useArticles`
- criação usa `useCreateArticle`
- service trata mapping entre tabela e domínio

### Exemplo: Categories

Se categorias forem persistidas:
- criar `src/types/categories.types.ts`
- criar `src/services/categories.service.ts`
- criar `src/hooks/useCategories.ts`
- criar `src/hooks/useCreateCategory.ts`
- etc.

Se categorias forem só filtro de interface:
- manter no Zustand
- não criar service
- não criar mutation

### Exemplo: Users

Se usuários forem persistidos no backend em C#:
- `src/types/user.types.ts`
- `src/services/users.service.ts`
- `src/hooks/useUsers.ts`
- `src/hooks/useCreateUser.ts`
- `src/hooks/useUpdateUser.ts`
- `src/hooks/useDeleteUser.ts`

Se for apenas sessão e permissões locais:
- manter no Zustand
- integrar com o mecanismo de autenticação do backend quando existir

## Guia passo a passo para qualquer novo CRUD

### Passo 1: Criar types

Defina:
- tipo de domínio
- enum de categorias/status se houver
- payload de criação
- payload de atualização
- shape da linha do banco, se necessário

### Passo 2: Criar service

Implemente:
- `list`
- `getById`
- `create`
- `update`
- `remove`
- `upload` se houver arquivo

### Passo 3: Criar queries

Implemente hooks de leitura:
- `use<ResourcePlural>()`
- `use<Resource>()`

Use cache keys claras:
- `['resources']`
- `['resources', id]`

### Passo 4: Criar mutations

Implemente hooks de alteração:
- `useCreate<Resource>()`
- `useUpdate<Resource>()`
- `useDelete<Resource>()`

### Passo 5: Criar componentes

Crie:
- cards
- filtros
- tabelas
- formulários
- modais

Esses componentes devem receber dados por props ou ler apenas estado de UI.

### Passo 6: Criar páginas

A página deve:
- chamar hooks
- montar layout
- tratar estados de loading/error/empty
- nunca chamar Supabase direto

### Passo 7: Conectar filtros

Se o filtro for de UI, usar Zustand.

Se o filtro alterar consulta do backend, passar parâmetro para `useQuery`.

Exemplo:
- categoria local: Zustand
- busca remota: query key com `search`

### Passo 8: Invalidar cache corretamente

Depois de mutation:
- invalidar lista
- atualizar detalhe, se fizer sentido
- evitar limpar store manualmente

### Passo 9: Testar

Valide sempre:
- build
- fluxo de criação
- fluxo de listagem
- fluxo de detalhe
- erro de upload
- erro de validação
- permissão de rota protegida

## Padrão recomendado para o projeto inteiro

1. O backend em C# é o backend.
2. TanStack Query é o cache e sincronização de server state.
3. Zustand é estado de interface e sessão.
4. Componentes não falam com o backend diretamente.
5. Páginas não persistem dados.
6. Services concentram integração e mapping.
7. Hooks expõem leitura e mutação para a UI.
8. Cada módulo novo segue o mesmo padrão de nomes e responsabilidades.

## Observação sobre o estado atual

O módulo de `projects` já foi movido para esse padrão:
- leitura via hook/query
- criação via mutation
- upload centralizado no service
- store reduzido a filtros
- páginas sem acesso direto ao backend

Esse deve ser o template para os próximos módulos.
