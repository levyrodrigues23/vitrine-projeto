import { Outlet } from "react-router";
import { HEADER_NAV_LINKS } from "../../../constants/navigation";
import { Footer } from "../footer/footer";
import MainContent from "../main-content/main-content";
import MenuResponsive from "../menu-responsive/menu-responsive";


export const APP_NAV_LINKS = HEADER_NAV_LINKS;


export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <MenuResponsive navLinks={[...HEADER_NAV_LINKS]} />
            <MainContent>
                <Outlet />
            </MainContent>
            <Footer />
        </div>
    );
}
