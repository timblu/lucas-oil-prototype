import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LucasOilLogo } from "./shared/LucasOilLogo";
import { ROUTES } from "../routes";

const LINKS = [
  { label: "Orders", to: ROUTES.orders },
  { label: "Invoices", to: ROUTES.invoices },
  { label: "Resource Center", to: ROUTES.catalog },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#111] text-white"
        : "text-[#666] hover:text-[#111] hover:bg-[#F2F2F2]"
    }`;

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-[rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-6">
        <Link to={ROUTES.dashboard} className="flex items-center gap-1.5 mr-2 shrink-0">
          <LucasOilLogo />
        </Link>
        <div className="h-5 w-px bg-[rgba(0,0,0,0.12)] hidden md:block" />

        {/* Primary nav — collapses to a menu below md */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <NavLink
            to={ROUTES.account}
            className={({ isActive }) =>
              `hidden md:inline text-sm font-medium transition-colors ${
                isActive ? "text-[#111]" : "text-[#666] hover:text-[#111]"
              }`
            }
          >
            Account
          </NavLink>

          {/* Hamburger / overflow menu for narrow widths */}
          <div className="md:hidden relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-md text-[#444] hover:bg-[#F2F2F2] transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-1 z-50">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#111] text-white"
                          : "text-[#444] hover:bg-[#F2F2F2]"
                      }`
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
                    `block px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#111] text-white"
                        : "text-[#444] hover:bg-[#F2F2F2]"
                    }`
                  }
                >
                  Account
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
