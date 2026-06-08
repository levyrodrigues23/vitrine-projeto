import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Input, Section, Text, buttonVariants } from "../../components/ui";
import { useArtigos } from "../../hooks/paper/useArtigos";

export default function ArtigosPublicacoesPage() {
  const { papers, loading, error } = useArtigos();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return papers;
    const q = searchQuery.toLowerCase();
    return papers.filter(
      (paper) =>
        paper.titulo.toLowerCase().includes(q) ||
        paper.descricao?.toLowerCase().includes(q) ||
        paper.autores?.toLowerCase().includes(q) ||
        paper.keywords?.toLowerCase().includes(q),
    );
  }, [papers, searchQuery]);

  return (
    <>
      <PageHero
        title="Artigos e Publicações"
        subtitle="Trabalhos aceitos e publicados por estudantes e servidores do campus."
      />

      <Section title="Publicações recentes">
        <label className="mb-8 block w-full max-w-xl">
          <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
            Buscar artigo
          </span>
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Título, autor, palavra-chave..."
            aria-label="Buscar artigo por título, autor ou palavra-chave"
            className="h-11 bg-white"
          />
        </label>

        {loading ? (
          <p className="text-center text-gray-base">Carregando artigos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum artigo encontrado com esses critérios.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((paper) => (
              <Card
                key={paper.id}
                className="space-y-3 p-6 text-center md:text-left"
              >
                <Text as="h3" variant="body-lg-bold">
                  {paper.titulo}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  {paper.descricao}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  Autores: {paper.autores}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  Ano: {paper.ano_de_publicacao
                    ? new Date(paper.ano_de_publicacao).getFullYear()
                    : "—"}
                </Text>
                {paper.base && (
                  <Text variant="body-md" className="text-gray-base">
                    Base: {paper.base}
                  </Text>
                )}
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section showSeparator={false}>
        <NavLink
          to="/producao-cientifica"
          className={buttonVariants({ variant: "quaternary", size: "md" })}
        >
          Voltar para Produção Científica
        </NavLink>
      </Section>
    </>
  );
}
