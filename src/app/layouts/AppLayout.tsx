import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TopNav } from "../components/TopNav";
import { SupportChat } from "../components/shared/SupportChat";
import { MarketingBannerCarousel } from "../components/MarketingBannerCarousel";
import { useAuth } from "../auth/AuthContext";
import { ROUTES } from "../routes";

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isDashboard = location.pathname === ROUTES.dashboard;

  function handleSignOut() {
    logout();
    navigate(ROUTES.login);
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav onSignOut={handleSignOut} />
      {isDashboard ? <MarketingBannerCarousel /> : null}
      <main>
        <Outlet />
      </main>
      <SupportChat />
    </div>
  );
}
