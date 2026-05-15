import {
  BookOpen,
  CalendarBlank,
  ChalkboardTeacher,
  FolderOpen,
  RocketLaunch,
} from "@phosphor-icons/react";
import EgressoBlack from "../assets/icons/egress-black.svg?react";
import ExportIcon from "../assets/icons/export.svg?react";
import FileIcon from "../assets/icons/file.svg?react";
import HomeIcon from "../assets/icons/home-icon.svg?react";
import InfoIcon from "../assets/icons/info.svg?react";

export const MENU_NAV_LINKS = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Sobre", to: "/sobre", icon: InfoIcon },
  { label: "Projetos", to: "/projetos", icon: FolderOpen },
  { label: "Agenda", to: "/agenda", icon: CalendarBlank },
  { label: "Empreendedorismo", to: "/empreendedorismo", icon: RocketLaunch },
  { label: "Minicursos", to: "/minicursos", icon: BookOpen },
  { label: "Professores", to: "/professores", icon: ChalkboardTeacher },
  { label: "Produção Científica", to: "/producao-cientifica", icon: FileIcon },
  { label: "Produção Técnica", to: "/producao-tecnica", icon: ExportIcon },
  { label: "Portal de Egressos", to: "/portal-egressos", icon: EgressoBlack },
] as const;

export const HEADER_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Projetos", to: "/projetos" },
  { label: "Agenda", to: "/agenda" },
  { label: "Empreendedorismo", to: "/empreendedorismo" },
  { label: "Minicursos", to: "/minicursos" },
  { label: "Professores", to: "/professores" },
  { label: "Produção Científica", to: "/producao-cientifica" },
  { label: "Produção Técnica", to: "/producao-tecnica" },
  { label: "Portal de Egressos", to: "/portal-egressos" },
] as const;

export const FOOTER_SITE_MAP_LINKS = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Projetos", to: "/projetos" },
  { label: "Agenda", to: "/agenda" },
  { label: "Empreendedorismo", to: "/empreendedorismo" },
  { label: "Minicursos", to: "/minicursos" },
  { label: "Professores", to: "/professores" },
  { label: "Produção científica", to: "/producao-cientifica" },
  { label: "Produção técnica", to: "/producao-tecnica" },
  { label: "Portal de egressos", to: "/portal-egressos" },
] as const;
