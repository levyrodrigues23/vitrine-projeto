import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Input, Section, Text, buttonVariants } from "../../components/ui";
import { useArtigos } from "../../hooks/paper/useArtigos";

export default function ArtigosPublicacoesPage() {
  const { papers, loading, error } = useArtigos();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");

  const availableYears = useMemo(() => {
    const years = papers
      .map((p) => p.ano_de_publicacao ? new Date(p.ano_de_publicacao).getFullYear() : null)
      .filter((y): y is number => y !== null);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [papers]);

  const filtered = useMemo(() => {
    return papers.filter((paper) => {
      const matchesYear =
        selectedYear === "all" ||
        (paper.ano_de_publicacao &&
          new Date(paper.ano_de_publicacao).getFullYear() === Number(selectedYear));

      if (!matchesYear) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        paper.titulo.toLowerCase().includes(q) ||
        paper.descricao?.toLowerCase().includes(q) ||
        paper.autores?.toLowerCase().includes(q) ||
        paper.keywords?.toLowerCase().includes(q)
      );
    });
  }, [papers, searchQuery, selectedYear]);

  return (
    <>
      <PageHero
        title="Artigos e Publicações"
        subtitle="Trabalhos aceitos e publicados por estudantes e servidores do campus."
      />

      <Section title="Publicações recentes" align="center">
        <div className="mb-8 mx-auto flex w-full max-w-4xl flex-col gap-4 sm:flex-row sm:items-end">
          <label className="flex-1">
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

          <label className="sm:w-48">
            <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
              Ano de publicação
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filtrar artigos por ano de publicação"
              className="h-11 w-full rounded-lg border border-gray-base/30 bg-white px-3 text-sm text-gray-base-dark outline-none focus:border-blue-dark focus:ring-2 focus:ring-blue/20"
            >
              <option value="all">Todos os anos</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

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
                className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
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

      <Section showSeparator={false} align="center">
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
