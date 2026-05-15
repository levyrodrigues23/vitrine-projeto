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
import { ProducaoTecnicaPage } from "../pages/producao-tecnica/producao-tecnica.page";
import { ProfessoresPage } from "../pages/professores/professores.page";
import Layout from "../components/layout/main-layout/layout";
import { ProjectDetailPage } from "../pages/project/project-detail.page";
import { ProjectListPage } from "../pages/project/project-list.page";
import ProducaoCientificaPage from "../pages/producao-cientifica/producao-cientifica.page";

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
        path: "minicursos",
        element: <MinicursosPage />,
      },
      {
        path: "portal-egressos",
        element: <PortalEgressosPage />,
      },
      {
        path: "producao-cientifica",
        element: <ProducaoCientificaPage />,
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
      {
        path: "projetos",
        element: <ProjectListPage />,
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
