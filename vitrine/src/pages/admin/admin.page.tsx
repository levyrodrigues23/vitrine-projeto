import { NavLink } from "react-router";
import { Card, Text, buttonVariants } from "../../components/ui";
import { useAuthStore } from "../../store/useAuthStore";

const stats = [
  { label: "Conteúdos publicados", value: "—" },
  { label: "Egressos cadastrados", value: "—" },
  { label: "Artigos registrados", value: "—" },
  { label: "Startups ativas", value: "—" },
];

const quickLinks = [
  {
    title: "Painel do gerenciador",
    description: "Cadastre projetos, egressos, artigos, startups e produções.",
    to: "/gerenciador",
    cta: "Abrir painel",
    icon: "🗂️",
  },
  {
    title: "Gerenciar usuários",
    description: "Controle acessos e permissões das contas internas.",
    to: "#",
    cta: "Em breve",
    disabled: true,
    icon: "👥",
  },
  {
    title: "Configurações do sistema",
    description: "Ajuste parâmetros globais e preferências da plataforma.",
    to: "#",
    cta: "Em breve",
    disabled: true,
    icon: "⚙️",
  },
];

export function AdminPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <div className="mb-10 space-y-1">
        <Text
          as="p"
          variant="body-sm-bold"
          className="uppercase tracking-widest text-gray-base"
        >
          Administração
        </Text>
        <Text as="h1" variant="title-1" className="text-black">
          Olá, {user?.name?.split(" ")[0] ?? "Administrador"}.
        </Text>
        <Text as="p" variant="body-md" className="text-gray-base">
          Visão geral e acesso rápido às funções administrativas.
        </Text>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="flex flex-col gap-2 border border-gray-base/10 p-5"
          >
            <Text variant="body-sm" className="text-gray-base">
              {stat.label}
            </Text>
            <Text as="p" variant="title-2" className="text-black">
              {stat.value}
            </Text>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Card
            key={link.title}
            className="flex flex-col justify-between gap-6 border border-gray-base/10 p-6"
          >
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                {link.icon}
              </div>
              <div className="space-y-1">
                <Text as="h3" variant="body-lg-bold" className="text-black">
                  {link.title}
                </Text>
                <Text variant="body-sm" className="text-gray-base">
                  {link.description}
                </Text>
              </div>
            </div>
            {link.disabled ? (
              <span className="inline-flex h-9 w-full cursor-not-allowed items-center justify-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-400">
                Em breve
              </span>
            ) : (
              <NavLink
                to={link.to}
                className={`${buttonVariants({ variant: "primary", size: "md" })} w-full justify-center`}
              >
                {link.cta}
              </NavLink>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
