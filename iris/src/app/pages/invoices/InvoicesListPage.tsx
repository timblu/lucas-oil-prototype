import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { INVOICES } from "../../data/invoices";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";
import type { Invoice } from "../../types";
import { cn } from "../../components/ui/utils";

type SummaryFilter = "Outstanding" | "Open" | "Past Due";
type StatusFilter = "All" | SummaryFilter | "Paid";

const FILTERS: StatusFilter[] = [
  "All",
  "Outstanding",
  "Open",
  "Past Due",
  "Paid",
];

function sumDue(invoices: Invoice[]) {
  return invoices.reduce((sum, invoice) => sum + invoice.amountDue, 0);
}

function matchesStatusFilter(invoice: Invoice, filter: StatusFilter) {
  if (filter === "All") return true;
  if (filter === "Outstanding") return invoice.amountDue > 0;
  return invoice.status === filter;
}

function SummaryCard({
  label,
  amount,
  active,
  onClick,
}: {
  label: string;
  amount: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xl border bg-card px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        active ? "border-primary" : "border-border hover:border-border-strong",
      )}
    >
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-tight text-foreground">
        {fmt(amount)}
      </div>
    </button>
  );
}

export default function InvoicesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const outstanding = sumDue(INVOICES.filter((invoice) => invoice.amountDue > 0));
  const dueSoon = sumDue(INVOICES.filter((invoice) => invoice.status === "Open"));
  const pastDue = sumDue(
    INVOICES.filter((invoice) => invoice.status === "Past Due"),
  );

  const filtered = INVOICES.filter((invoice) => {
    const query = search.trim().toLowerCase();
    const matchesQuery =
      !query ||
      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.orderId.toLowerCase().includes(query) ||
      invoice.poNumber.toLowerCase().includes(query);
    return matchesQuery && matchesStatusFilter(invoice, statusFilter);
  });

  function toggleSummaryFilter(next: SummaryFilter) {
    setStatusFilter((current) => (current === next ? "All" : next));
  }

  return (
    <div className="mx-auto max-w-page px-4 py-8 sm:px-6">
      <PageHeader title="Invoices" />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Total Outstanding"
          amount={outstanding}
          active={statusFilter === "Outstanding"}
          onClick={() => toggleSummaryFilter("Outstanding")}
        />
        <SummaryCard
          label="Total Due Soon"
          amount={dueSoon}
          active={statusFilter === "Open"}
          onClick={() => toggleSummaryFilter("Open")}
        />
        <SummaryCard
          label="Past Due"
          amount={pastDue}
          active={statusFilter === "Past Due"}
          onClick={() => toggleSummaryFilter("Past Due")}
        />
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-md">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search invoices…"
            aria-label="Search invoices"
            className="bg-card pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as StatusFilter)}
        >
          <SelectTrigger aria-label="Filter by status" className="w-full bg-card sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FILTERS.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {[
                "Invoice #",
                "Date",
                "Related Order / PO",
                "Amount",
                "Status",
                "Due Date",
              ].map((heading) => (
                <TableHead
                  key={heading}
                  className="px-5 text-2xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  {heading}
                </TableHead>
              ))}
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((invoice) => (
              <TableRow
                key={invoice.id}
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => navigate(ROUTES.invoice(invoice.id))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(ROUTES.invoice(invoice.id));
                  }
                }}
              >
                <TableCell className="px-5 py-4 font-mono text-sm font-medium text-foreground">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell className="px-5 py-4 font-mono text-sm text-foreground">
                  {invoice.invoiceDate}
                </TableCell>
                <TableCell className="px-5 py-4 text-sm">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(ROUTES.order(invoice.orderId));
                    }}
                    className="font-mono font-semibold text-foreground hover:underline"
                  >
                    {invoice.orderId}
                  </button>
                  <span className="text-muted-foreground"> · {invoice.poNumber}</span>
                </TableCell>
                <TableCell className="px-5 py-4 font-mono text-sm font-semibold text-foreground">
                  {fmt(invoice.total)}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <StatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="px-5 py-4 font-mono text-sm text-muted-foreground">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="px-3 text-muted-foreground">
                  <ChevronRight size={15} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            No invoices match your search.
          </div>
        ) : null}
      </Card>
    </div>
  );
}
