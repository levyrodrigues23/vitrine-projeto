import chrome from "../../../assets/icons/chrome.svg?react"
import insta from "../../../assets/icons/insta-icon.svg?react"

export function Footer() {
    return (
        <footer className="bg-white text-black py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col  items-center  gap-2">
                    <img src="/logo-ufc.png" alt="UFC" className="h-12 mb-2" />
                    <div>
                        <img src={chrome} alt="imagem do navegador" />
                        <img src={insta} alt="imagem do instagram" />
                    </div>
                </div>
                
                <div className="flex flex-col items-center md:items-end gap-2 text-sm text-white/80">
                    <p>© {new Date().getFullYear()} Universidade Federal do Ceará.</p>
                    <p>Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
