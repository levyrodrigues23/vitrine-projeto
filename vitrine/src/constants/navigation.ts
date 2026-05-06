import Egresso from "../assets/icons/egress-white.svg?react";

export const HEADER_NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Sobre", to: "/sobre" },
    { label: "Agenda", to: "/agenda" },
    { label: "Professores", to: "/professores" },
    { label: "Produção Científica", to: "/producao-cientifica" },
    { label: "Produção Técnica", to: "/producao-tecnica" },
    { label: "Portal de Egressos", to: "/portal-egressos", icon:Egresso },
] as const;


export const FOOTER_SITE_MAP_LINKS = [
    { label: "Início", to: "/" },
    { label: "Sobre", to: "/sobre" },
    { label: "Agenda", to: "/agenda" },
    { label: "Empreendedorismo", to: "/empreendedorismo" },
    { label: "Minicursos", to: "/minicursos" },
    { label: "Professores", to: "/professores" },
    { label: "Produção científica", to: "/producao-cientifica" },
    { label: "Produção técnica", to: "/producao-tecnica" },
    { label: "Portal de egressos", to: "/portal-egressos" },
] as const;
