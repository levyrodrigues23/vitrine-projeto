import { NavLink, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Footer } from "./footer/footer";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Sobre", to: "/sobre" },
    { label: "Agenda", to: "/agenda" },
    { label: "Professores", to: "/professores" },
    { label: "Produção Científica", to: "/producao-cientifica" },
    { label: "Produção Técnica", to: "/producao-tecnica" },
    { label: "Portal de Egressos", to: "/portal-egressos" },
];

export default function Layout() {
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
        <div className="flex flex-col min-h-screen">
            <header
                className={`sticky top-0 z-50 flex justify-between items-center px-6 h-16 transition-all duration-300 ${
                    isScrolled
                        ? "bg-blue-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg"
                        : "bg-blue-dark"
                }`}
            >
                {/* Logo */}
                <img src="/images/logo-ufc.png" alt="UFC" className="h-12 w-auto" />

                {/* Links desktop */}
                <nav className="hidden md:flex items-center gap-6 font-sans">
                    {navLinks.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `relative text-sm font-medium pb-0.5 transition-colors duration-200
                                 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300
                                ${isActive
                                    ? "text-white after:w-full"
                                    : "text-white/70 hover:text-white after:w-0 hover:after:w-full"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Botão hamburguer (só mobile) */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </header>

            {/* Menu mobile dropdown */}
            <nav
                className={`md:hidden fixed top-16 left-0 right-0 z-40 bg-blue-dark/95 backdrop-blur-md border-b border-white/10 flex flex-col font-sans overflow-hidden transition-all duration-300 ${
                    isMenuOpen ? "max-h-screen py-4" : "max-h-0"
                }`}
            >
                {navLinks.map(({ label, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                            `text-sm font-medium px-6 py-3 border-b border-white/10 transition-colors duration-200 ${
                                isActive ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>

            <main className="flex-1">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}