import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LucasOilLogo } from "./shared/LucasOilLogo";
import { DISTRIBUTOR_ACCOUNT } from "../data/account";
import { ROUTES } from "../routes";

const LINKS = [
  { label: "Orders", to: ROUTES.orders },
  { label: "Catalog", to: ROUTES.catalog },
  { label: "Cases", to: ROUTES.cases },
];

export function TopNav({ onSignOut }: { onSignOut: () => void }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-[rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-6">
        <Link to={ROUTES.dashboard} className="flex items-center gap-1.5 mr-2 shrink-0">
          <LucasOilLogo />
        </Link>
        <div className="h-5 w-px bg-[rgba(0,0,0,0.12)]" />
        <nav className="flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#111] text-white"
                    : "text-[#666] hover:text-[#111] hover:bg-[#F2F2F2]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#F2F2F2] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#111]/20"
              >
                <div className="w-7 h-7 rounded-full bg-[#E4E4E4] flex items-center justify-center text-xs font-semibold text-[#444]">
                  JM
                </div>
                <span className="text-sm text-[#777] hidden sm:block">
                  {DISTRIBUTOR_ACCOUNT.shortName}
                </span>
                <ChevronDown
                  size={14}
                  className="text-[#999] hidden sm:block"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="font-semibold text-foreground">
                  {DISTRIBUTOR_ACCOUNT.legalName}
                </div>
                <div className="text-xs text-muted-foreground font-normal mt-0.5">
                  #{DISTRIBUTOR_ACCOUNT.accountNumber} ·{" "}
                  {DISTRIBUTOR_ACCOUNT.territory}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(ROUTES.account)}>
                <User size={16} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>
                <LogOut size={16} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
