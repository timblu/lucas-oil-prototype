import { Outlet, useLocation } from "react-router-dom";
import { TopNav } from "../components/TopNav";
import { SupportChat } from "../components/shared/SupportChat";
import { MarketingBannerCarousel } from "../components/MarketingBannerCarousel";
import { ROUTES } from "../routes";

export function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === ROUTES.dashboard;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      {isDashboard ? <MarketingBannerCarousel /> : null}
      <main>
        <Outlet />
      </main>
      <SupportChat />
    </div>
  );
}
