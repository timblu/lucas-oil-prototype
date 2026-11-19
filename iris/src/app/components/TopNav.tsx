import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, Menu, Search } from "lucide-react";
import { brand } from "../brand/brand";
import { BrandLogo } from "./shared/BrandLogo";
import { GlobalSearch } from "./shared/GlobalSearch";
import { useAuth } from "../auth/AuthContext";
import { ROUTES } from "../routes";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "./ui/utils";

const LINKS = [
  { label: "Dashboard", to: ROUTES.dashboard },
  { label: "Orders", to: ROUTES.orders },
  { label: "Invoices", to: ROUTES.invoices },
  { label: "Catalog", to: ROUTES.catalog },
  { label: "Knowledge Hub", to: ROUTES.knowledgeHub },
];

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-medium text-nav-link transition-colors hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
    isActive && "bg-brand-soft text-primary",
  );

export function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSignOut() {
    setMenuOpen(false);
    logout();
    navigate(ROUTES.login);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-page items-center gap-6 px-4 sm:px-10">
        <Link
          to={ROUTES.dashboard}
          className="flex shrink-0 items-center"
          aria-label={`${brand.name} home`}
        >
          <BrandLogo height={30} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navItemClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden w-60 justify-between font-normal text-muted-foreground lg:flex"
            onClick={() => setSearchOpen(true)}
          >
            <span className="flex items-center gap-2">
              <Search />
              Search orders, invoices…
            </span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-2xs">
              ⌘K
            </kbd>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
          </Button>

          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to={ROUTES.account}>
              <CircleUserRound />
              Account
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            onClick={handleSignOut}
          >
            <LogOut />
            Sign out
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-0 p-0">
              <SheetHeader className="border-b p-5">
                <SheetTitle>
                  <BrandLogo height={26} />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
                {LINKS.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink to={link.to} className={navItemClass}>
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <NavLink to={ROUTES.account} className={navItemClass}>
                    Account
                  </NavLink>
                </SheetClose>
              </nav>
              <div className="mt-auto border-t p-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut />
                  Sign out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
