import { useState } from "react";
import {NavLink} from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import {Card, Section, Text, buttonVariants} from "../../components/ui";
import {useCongresses} from "../../hooks/congress/useCongresses";

export default function CongressesSimposiosPage() {
    const { congresses, loading, error } = useCongresses();
    const [search, setSearch] = useState("");

    const filtered = congresses.filter((congress) =>
        congress.description.toLowerCase().includes(search.toLowerCase()) ||
        congress.local.toLowerCase().includes(search.toLowerCase()) ||
        congress.tipo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <PageHero
                title="Congressos e Simpósios"
                subtitle="Registros das participações da comunidade acadêmica em eventos científicos."
            />
            <Section
                title="Participações recentes"
                description="Eventos científicos nos quais o campus esteve presente com apresentações, pôsteres e comunicações técnicas."
                align="center"
            >
                <input
                    type="text"
                    placeholder="Buscar congresso..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md mx-auto mt-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {loading ? (
                    <p className="text-center text-gray-base">Carregando artigos...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.length === 0 ? (
                            <p className="text-center text-gray-base col-span-full">
                                Nenhum congresso encontrado.
                            </p>
                        ) : (
                            filtered.map((congress) => (
                                <Card
                                    key={congress.title}
                                    className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
                                >
                                    <Text as="h3" variant="body-lg-bold">
                                        {congress.description}
                                    </Text>
                                    <Text variant="body-md" className="text-gray-base">
                                        {congress.data
                                            ? new Date(congress.data).toLocaleDateString("pt-BR")
                                            : "—"}
                                    </Text>
                                    <Text variant="body-md" className="text-gray-base">
                                        Local: {congress.local}
                                    </Text>
                                    <Text variant="body-md" className="text-gray-base">
                                        URL: {congress.url}
                                    </Text>
                                    <Text variant="body-md" className="text-gray-base">
                                        Tipo: {congress.tipo}
                                    </Text>
                                </Card>
                            ))
                        )}
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