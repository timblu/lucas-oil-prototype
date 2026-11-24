import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CircleUserRound,
  Network,
  LayoutDashboard,
  Package,
  Receipt,
  ReceiptText,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ORDERS } from "../../data/orders";
import { INVOICES } from "../../data/invoices";
import { PRODUCTS } from "../../data/products";
import { ROUTES } from "../../routes";
import { fmtShort } from "../../lib/format";

const PAGES = [
  { label: "Dashboard", to: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Orders", to: ROUTES.orders, icon: Package },
  { label: "Invoices", to: ROUTES.invoices, icon: Receipt },
  { label: "Catalog", to: ROUTES.catalog, icon: Network },
  { label: "Knowledge Hub", to: ROUTES.knowledgeHub, icon: BookOpen },
  { label: "Resources", to: ROUTES.marketingCollateral, icon: ReceiptText },
  { label: "Account", to: ROUTES.account, icon: CircleUserRound },
];

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();

  function go(to: string) {
    onOpenChange(false);
    navigate(to);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Find orders, invoices, products, and pages"
    >
      <CommandInput placeholder="Search orders, invoices, products…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {PAGES.map((page) => (
            <CommandItem
              key={page.to}
              value={`page ${page.label}`}
              onSelect={() => go(page.to)}
            >
              <page.icon />
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Orders">
          {ORDERS.map((order) => (
            <CommandItem
              key={order.id}
              value={`order ${order.id} ${order.status} ${order.shipTo}`}
              onSelect={() => go(ROUTES.order(order.id))}
            >
              <Package />
              <span className="font-mono">{order.id}</span>
              <span className="text-muted-foreground">· {order.status}</span>
              <span className="ml-auto font-mono text-xs">
                {fmtShort(order.total)}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Invoices">
          {INVOICES.map((invoice) => (
            <CommandItem
              key={invoice.id}
              value={`invoice ${invoice.invoiceNumber} ${invoice.status} ${invoice.shipTo}`}
              onSelect={() => go(ROUTES.invoice(invoice.id))}
            >
              <Receipt />
              <span className="font-mono">{invoice.invoiceNumber}</span>
              <span className="text-muted-foreground">· {invoice.status}</span>
              <span className="ml-auto font-mono text-xs">
                {fmtShort(invoice.total)}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Products">
          {PRODUCTS.map((product) => (
            <CommandItem
              key={product.id}
              value={`product ${product.id} ${product.name} ${product.category}`}
              onSelect={() => go(ROUTES.product(product.id))}
            >
              <Network />
              <span className="truncate">{product.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
