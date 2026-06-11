import { createBrowserRouter } from "react-router";

import { HomePage } from "../pages/home/home.page";
import { AboutVitrinePage } from "../pages/about-vitrine/about-vitrine.page";
import { AdminPage } from "../pages/admin/admin.page";
import { AgendaPage } from "../pages/agenda/agenda.page";
import { EmpreendedorismoPage } from "../pages/empreendedorismo/empreendedorismo.page";
import { LoginPage } from "../pages/login/login.page";
import { MinicursosPage } from "../pages/minicursos/minicursos.page";
import { NotFoundPage } from "../pages/notfound/not-found.page";
import { AdicionarArtigoPage } from "../pages/gerenciador/adicionar-artigo.page";
import { AdicionarEgressoPage } from "../pages/gerenciador/adicionar-egresso.page";
import { AdicionarProjetoPage } from "../pages/gerenciador/adicionar-projeto.page";
import { AdicionarStartupPage } from "../pages/gerenciador/adicionar-startup.page";
import { AdicionarProducaoTecnicaPage } from "../pages/gerenciador/adicionar-producao-tecnica.page";
import { GerenciadorPage } from "../pages/gerenciador/gerenciador.page";
import { PortalEgressosPage } from "../pages/portal-egressos/portal-egressos.page";
import { EgressosPage } from "../pages/portal-egressos/egressos.page";
import { NoticiasEgressosPage } from "../pages/portal-egressos/noticias-egressos.page";
import { ProfessoresPage } from "../pages/professores/professores.page";
import Layout from "../components/layout/main-layout/layout";
import { ProtectedRoute } from "../components/layout/protected-route";

import { ProjectDetailPage } from "../pages/project/project-detail.page";
import { ProjectListPage } from "../pages/project/project-list.page";
import { ProjectsPage } from "../pages/project/projects.page";
import ProducaoCientificaPage from "../pages/producao-cientifica/producao-cientifica.page";
import ArtigosPublicacoesPage from "../pages/producao-cientifica/artigos-publicacoes.page";
import CongressesSimposiosPage from "../pages/producao-cientifica/congresses-simposios.page.tsx";
import { StartupsPage } from "../pages/empreendedorismo/startups.page";
import { EditaisPage } from "../pages/empreendedorismo/editais.page";
import { EmpresaJrPage } from "../pages/empreendedorismo/empresa-jr.page";
import { AdicionarProfessorPage } from "../pages/gerenciador/adicionar-professor";
import { ProducaoTecnicaPage } from "../pages/producao-tecnica/producao-tecnica.page";

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
        element: <CongressesSimposiosPage />,
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
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
      {
        path: "gerenciador",
        element: <ProtectedRoute allowedRoles={["admin", "gerenciador"]} />,
        children: [
          {
            index: true,
            element: <GerenciadorPage />,
          },
          {
            path: "egressos",
            element: <AdicionarEgressoPage />,
          },  
          {
            path: "projetos",
            element: <AdicionarProjetoPage />,
          },
          {
            path: "projetos/:id/editar",
            element: <AdicionarProjetoPage />,
          },
          {
            path: "artigos",
            element: <AdicionarArtigoPage />,
          },
          {
            path: "startups",
            element: <AdicionarStartupPage />,
          },
          {
            path: "producao-tecnica",
            element: <AdicionarProducaoTecnicaPage />,
          },
          {
            path: "professores",
            element: <AdicionarProfessorPage />,
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
