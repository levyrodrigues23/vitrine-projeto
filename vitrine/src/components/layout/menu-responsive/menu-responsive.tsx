import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import Menu from "../../../assets/icons/menu.svg?react";
import Arrowright from "../../../assets/icons/caret-right.svg?react";
import { Icon, Input } from "../../ui";

type NavIcon =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ForwardRefExoticComponent<
      React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
    >;

export type NavLinkItem = {
  label: string;
  to: string;
  icon?: NavIcon;
};

export interface MenuResponsiveProps {
  headerNavLinks: NavLinkItem[];
  menuNavLinks?: NavLinkItem[];
  logoSrc?: string;
  logoAlt?: string;
}

export default function MenuResponsive({
  headerNavLinks,
  menuNavLinks = headerNavLinks,
  logoSrc = "/logo-ufc.png",
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
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-blue-dark/85 shadow-md backdrop-blur-md"
            : "bg-blue-dark"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-6">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="hidden h-12 w-auto shrink-0 md:block"
          />

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-4 font-sans md:flex lg:gap-5">
            {headerNavLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative shrink-0 pb-0.5 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                    isActive
                      ? "text-white after:w-full"
                      : "text-white/75 after:w-0 hover:text-white hover:after:w-full"
                  }`
                }
              >
                <span className="flex items-center gap-2">{label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer flex-col gap-1.5 text-white md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <Icon svg={Menu} />
          </button>

          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-10 w-auto shrink-0 md:hidden"
          />
        </div>
      </header>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed top-16 left-0 right-0 bottom-0 z-30 md:hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
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

        <div className="border-b border-white/10 px-6 py-4">
          <Input
            type="search"
            placeholder="Buscar projetos..."
            className="w-full bg-white/10 text-white placeholder:text-white/60 border-white/20 focus-visible:ring-white/50"
          />
        </div>

        {menuNavLinks.map(({ label, to, icon: IconSvg }) => (
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
            {IconSvg && <Icon svg={IconSvg} className="fill-current" />}
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
