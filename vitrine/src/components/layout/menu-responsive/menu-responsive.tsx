import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import Logo from "../../../../public/logo-ufc.png"
import Menu from "../../../assets/icons/menu.svg?react"
import Arrowright from "../../../assets/icons/caret-right.svg?react"
import { Icon } from "../../ui";

export type NavLinkItem = {
    label: string;
    to: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export interface MenuResponsiveProps {
    navLinks: NavLinkItem[];
    logoSrc?: string;
    logoAlt?: string;
}

export default function MenuResponsive({
    navLinks,
    logoSrc = Logo,
    logoAlt = "UFC",
}: MenuResponsiveProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 10);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-50 flex h-16 items-center justify-between px-3 transition-all duration-300 ${
                    isScrolled
                        ? "border-b border-white/10 bg-blue-dark/80 shadow-lg backdrop-blur-md"
                        : "bg-blue-dark"
                }`}
            >
                <img src={logoSrc} alt={logoAlt} className="h-12 w-auto hidden md:block" />

                <nav className="hidden items-center gap-6 font-sans md:flex">
                    {navLinks.map(({ label, to, icon: IconSvg }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `relative pb-0.5 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                                    isActive
                                        ? "text-white after:w-full"
                                        : "text-white/70 after:w-0 hover:text-white hover:after:w-full"
                                }`
                            }
                        >
                            <span className="flex items-center gap-2">
                                {IconSvg && <Icon svg={IconSvg} />}
                                {label}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                <button
                    type="button"
                    className="flex cursor-pointer flex-col gap-1.5 md:hidden"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    <Icon svg={Menu} />
                </button>

                <img src={logoSrc} alt={logoAlt} className="h-12 w-auto md:hidden mr-5" />
            </header>

        
            <div
                onClick={() => setIsMenuOpen(false)}
                className={`fixed top-16 left-64 right-0 bottom-0 z-30 md:hidden bg-black/40 ${
                    isMenuOpen ? "block" : "hidden"
                }`}
            />

            <nav
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 flex flex-col border-r border-white/10 bg-blue-dark/95 font-sans backdrop-blur-md transition-transform duration-300 md:hidden ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                aria-label="Menu principal"
            >
              
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <span className="text-base font-semibold text-white">Menu</span>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Fechar menu"
                        className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                        <Icon svg={Arrowright} />
                    </button>
                </div>

                {/* Links */}
                {navLinks.map(({ label, to, icon: IconSvg }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 border-b border-white/10 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`
                        }
                    >
                        {IconSvg && <Icon svg={IconSvg} />}
                        {label}
                    </NavLink>
                ))}
            </nav>
        </>
    );
}