import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, Menu, X } from "lucide-react";
import { LucasOilLogo } from "./shared/LucasOilLogo";
import { useAuth } from "../auth/AuthContext";
import { ROUTES } from "../routes";
import { cn } from "./ui/utils";

const LINKS = [
  { label: "Orders", to: ROUTES.orders },
  { label: "Invoices", to: ROUTES.invoices },
  { label: "Knowledge Hub", to: ROUTES.knowledgeHub },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    setMenuOpen(false);
    logout();
    navigate(ROUTES.login);
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-1 h-8 text-sm font-medium leading-5 text-nav-link transition-colors",
      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm",
      isActive && "text-foreground",
    );

  return (
    <header className="bg-card sticky top-0 z-40 border-b border-black/10">
      <div className="max-w-page mx-auto px-4 sm:px-10 flex items-center h-20 gap-6">
        <Link
          to={ROUTES.dashboard}
          className="flex items-center shrink-0 h-10"
          aria-label="Lucas Oil home"
        >
          <LucasOilLogo />
        </Link>
        <div className="h-4 w-px bg-black/12 hidden md:block shrink-0" />

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <NavLink
            to={ROUTES.account}
            className={({ isActive }) =>
              cn(
                "hidden md:flex items-center gap-1 h-8 text-sm font-medium leading-5 text-nav-link transition-colors hover:text-foreground",
                isActive && "text-foreground",
              )
            }
          >
            <CircleUserRound size={16} className="text-icon-strong" />
            Account
          </NavLink>

          <div className="h-4 w-px bg-black/12 hidden md:block shrink-0" />

          <button
            type="button"
            onClick={handleSignOut}
            className="hidden md:flex items-center gap-1 h-8 text-sm font-medium leading-5 text-nav-link hover:text-foreground transition-colors"
          >
            <LogOut size={16} className="text-icon-strong" />
            Sign Out
          </button>

          <div className="md:hidden relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-md text-icon-strong hover:bg-muted transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-foreground text-primary-foreground"
                          : "text-foreground hover:bg-muted",
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="my-1 border-t border-border" />
                <NavLink
                  to={ROUTES.account}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-foreground text-primary-foreground"
                        : "text-foreground hover:bg-muted",
                    )
                  }
                >
                  Account
                </NavLink>
                <div className="my-1 border-t border-border" />
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
