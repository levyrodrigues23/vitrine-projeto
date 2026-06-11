import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import AOS from "aos";
import {
  HEADER_NAV_LINKS,
  MENU_NAV_LINKS,
} from "../../../constants/navigation";
import { Footer } from "../footer/footer";
import MainContent from "../main-content/main-content";
import MenuResponsive from "../menu-responsive/menu-responsive";
import { VLibrasWidget } from "../vlibras-widget/vlibras-widget";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out",
      offset: 120,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <MenuResponsive
        headerNavLinks={[...HEADER_NAV_LINKS]}
        menuNavLinks={[...MENU_NAV_LINKS]}
      />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
      <VLibrasWidget />
    </div>
  );
}
