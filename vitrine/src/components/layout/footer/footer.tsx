import { NavLink } from "react-router";
import Chrome from "../../../assets/icons/chrome.svg?react";
import Insta from "../../../assets/icons/insta-icon.svg?react";
import { FOOTER_SITE_MAP_LINKS } from "../../../constants/navigation";
import { Icon, Text } from "../../ui";
import Separator from "../separator/separator";

const linkClass =
    "rounded-sm text-sm text-white/85 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const navItemClass =
    "block rounded-sm py-1 text-sm text-white/85 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto bg-blue text-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="flex flex-col items-center gap-7 md:max-w-xs md:items-start">
                    <img src="/logo-ufc.png" alt="Universidade Federal do Ceará" className="md:h-30 h-15 w-auto" />
                    <Text as="p" variant="body-md" className="text-center text-white/90 md:text-left">
                        Universidade Federal do Ceará
                    </Text>
                    <Separator variant="horizontal" className="w-full bg-white/25" />
                    <div className="flex items-center gap-3">
                        <a
                            href="https://itapaje.ufc.br/pt/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 transition hover:text-white"
                            aria-label="Acessar o site da ufc itapajé"
                        >
                            <Icon svg={Chrome} size="lg" className="text-current" />
                        </a>
                        <a
                            href="https://www.instagram.com/ufc.itapaje?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 transition hover:text-white"
                            aria-label="instagram da universidade federal do ceará - campus itapajé"
                        >
                            <Icon svg={Insta} size="lg" className="text-current" />
                        </a>
                    </div>
                </div>

                <nav aria-label="Mapa do site" className="flex flex-1 flex-col gap-8 sm:flex-row sm:justify-center md:justify-end lg:gap-16">
                    <div className="min-w-0 sm:min-w-[10rem]">
                        <Text as="p" variant="body-md-bold" className="mb-2 text-white">
                            Mapa do site
                        </Text>
                        <ul className="space-y-1">
                            {FOOTER_SITE_MAP_LINKS.map(({ label, to }) => (
                                <li key={to}>
                                    <NavLink to={to} end={to === "/"} className={navItemClass}>
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="min-w-0 sm:min-w-[12rem]">
                        <Text as="p" variant="body-md-bold" className="mb-2 text-white">
                            Contato
                        </Text>
                        <ul className="space-y-2 text-sm text-white/85">
                            <li>
                                <a className={linkClass} href="mailto:contato@ufc.br">
                                    contato@ufc.br
                                </a>
                            </li>
                            <li className="text-white/75">Fortaleza, CE — Brasil</li>
                        </ul>
                    </div>

                    <div className="min-w-0 sm:min-w-[10rem]">
                        <Text as="p" variant="body-md-bold" className="mb-2 text-white">
                            Legal
                        </Text>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    className={linkClass}
                                    href="https://www.ufc.br/protecao-de-dados"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Proteção de dados (UFC)
                                </a>
                            </li>
                            <li>
                                <a
                                    className={linkClass}
                                    href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/atendimento-governo-unico"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Acessibilidade
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <Separator variant="horizontal" className="bg-white/15" />

            <div className="mx-auto w-full max-w-6xl px-6 py-4">
                <Text
                    as="p"
                    variant="body-md"
                    className="text-center text-sm text-white/70"
                >
                    © {year} Universidade Federal do Ceará. Todos os direitos reservados.
                </Text>
            </div>
        </footer>
    );
}
