import { createBrowserRouter } from "react-router";

import { HomePage } from "../pages/home/home.page";
import { AboutVitrinePage } from "../pages/about-vitrine/about-vitrine.page";
import { AdminPage } from "../pages/admin/admin.page";
import { AgendaPage } from "../pages/agenda/agenda.page";
import { EmpreendedorismoPage } from "../pages/empreendedorismo/empreendedorismo.page";
import { LoginPage } from "../pages/login/login.page";
import { MinicursosPage } from "../pages/minicursos/minicursos.page";
import { NotFoundPage } from "../pages/notfound/not-found.page";
import { PortalEgressosPage } from "../pages/portal-egressos/portal-egressos.page";
import { EgressosPage } from "../pages/portal-egressos/egressos.page";
import { NoticiasEgressosPage } from "../pages/portal-egressos/noticias-egressos.page";
import { ProducaoTecnicaPage } from "../pages/producao-tecnica/producao-tecnica.page";
import { ProfessoresPage } from "../pages/professores/professores.page";
import Layout from "../components/layout/main-layout/layout";
import { ProjectDetailPage } from "../pages/project/project-detail.page";
import { ProjectListPage } from "../pages/project/project-list.page";
import { ProjectsPage } from "../pages/project/projects.page";
import ProducaoCientificaPage from "../pages/producao-cientifica/producao-cientifica.page";
import ArtigosPublicacoesPage from "../pages/producao-cientifica/artigos-publicacoes.page";
import CongressosSimposiosPage from "../pages/producao-cientifica/congressos-simposios.page";
import { StartupsPage } from "../pages/empreendedorismo/startups.page";
import { EditaisPage } from "../pages/empreendedorismo/editais.page";
import { EmpresaJrPage } from "../pages/empreendedorismo/empresa-jr.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sobre",
        element: <AboutVitrinePage />,
      },
      {
        path: "agenda",
        element: <AgendaPage />,
      },
      {
        path: "empreendedorismo",
        element: <EmpreendedorismoPage />,
      },
      {
        path: "empreendedorismo/startups",
        element: <StartupsPage />,
      },
      {
        path: "empreendedorismo/editais",
        element: <EditaisPage />,
      },
      {
        path: "empreendedorismo/empresa-jr",
        element: <EmpresaJrPage />,
      },
      {
        path: "minicursos",
        element: <MinicursosPage />,
      },
      {
        path: "portal-egressos",
        element: <PortalEgressosPage />,
      },
      {
        path: "portal-egressos/egressos",
        element: <EgressosPage />,
      },
      {
        path: "portal-egressos/noticias",
        element: <NoticiasEgressosPage />,
      },
      {
        path: "producao-cientifica",
        element: <ProducaoCientificaPage />,
      },
      {
        path: "producao-cientifica/artigos-publicacoes",
        element: <ArtigosPublicacoesPage />,
      },
      {
        path: "producao-cientifica/congressos-simposios",
        element: <CongressosSimposiosPage />,
      },
      {
        path: "producao-tecnica",
        element: <ProducaoTecnicaPage />,
      },
      {
        path: "professores",
        element: <ProfessoresPage />,
      },
      {
        path: "projetos",
        element: <ProjectsPage />,
      },
      {
        path: "projetos/pesquisa",
        element: <ProjectListPage />,
      },
      {
        path: "projetos/extensao",
        element: <ProjectListPage />,
      },
      {
        path: "projetos/inovacao",
        element: <ProjectListPage />,
      },
      {
        path: "projetos/:id",
        element: <ProjectDetailPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
