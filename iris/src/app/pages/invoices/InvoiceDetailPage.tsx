import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Download,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DISTRIBUTOR_ACCOUNT } from "../../data/account";
import { INVOICES } from "../../data/invoices";
import { fmt } from "../../lib/format";
import { getPaymentSummary } from "../../lib/invoicePayments";
import { ROUTES } from "../../routes";
import type { PaymentMethod } from "../../types";

function paymentLabel(method: PaymentMethod) {
  if (method === "ACH") return "ACH Payment";
  if (method === "Credit Card") return "Card Payment";
  if (method === "Wire") return "Wire Transfer";
  return method;
}

function shipLines(shipTo: string) {
  if (shipTo === DISTRIBUTOR_ACCOUNT.shortName) {
    return DISTRIBUTOR_ACCOUNT.shipToAddress.split(", ");
  }
  return [shipTo];
}

export default function InvoiceDetailPage() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const invoice = INVOICES.find((item) => item.id === invoiceId);

  if (!invoice) return <Navigate to={ROUTES.invoices} replace />;

  const { payments, totalPaid } = getPaymentSummary(invoice);
  const paidPercent =
    invoice.total > 0 ? Math.round((totalPaid / invoice.total) * 100) : 0;
  const address = shipLines(invoice.shipTo);

  return (
    <div className="mx-auto max-w-page px-4 py-8 sm:px-10">
      <PageHeader
        title={invoice.invoiceNumber}
        description={`Issued ${invoice.invoiceDate}`}
        breadcrumbs={[
          { label: "Invoices", to: ROUTES.invoices },
          { label: invoice.invoiceNumber },
        ]}
        action={
          <Button variant="outline" size="sm" disabled>
            Download PDF
            <Download />
          </Button>
        }
      />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  Amount Due
                </div>
                <div className="mt-1 font-mono text-3xl font-semibold tracking-tight text-foreground">
                  {fmt(invoice.amountDue)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  <Calendar size={14} />
                  Due {invoice.dueDate}
                </span>
                <StatusBadge status={invoice.status} />
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>
                  {fmt(totalPaid)} paid of {fmt(invoice.total)}
                </span>
                <span>{paidPercent}% Paid</span>
              </div>
              <Progress value={paidPercent} aria-label="Amount paid" />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-base font-semibold text-foreground">
              Invoice Information
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div>
                <dt className="text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Invoice Date
                </dt>
                <dd className="mt-1 font-mono text-sm font-medium text-foreground">
                  {invoice.invoiceDate}
                </dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Due Date
                </dt>
                <dd className="mt-1 font-mono text-sm font-medium text-foreground">
                  {invoice.dueDate}
                </dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Related Order
                </dt>
                <dd className="mt-1">
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.order(invoice.orderId))}
                    className="inline-flex items-center gap-1 font-mono text-sm font-medium text-primary hover:underline"
                  >
                    {invoice.orderId}
                    <ChevronRight size={14} />
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Purchase Order (PO)
                </dt>
                <dd className="mt-1 font-mono text-sm font-medium text-foreground">
                  {invoice.poNumber}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="overflow-hidden">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Line Items</h2>
            </div>
            <ul className="divide-y divide-border sm:hidden">
              {invoice.lineItems.map((item) => (
                <li key={item.itemNum} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {item.description}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                        {item.itemNum} · {item.qty} × {fmt(item.unitPrice)}
                      </div>
                    </div>
                    <div className="font-mono text-sm font-semibold tabular-nums">
                      {fmt(item.qty * item.unitPrice)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-5 text-2xs tracking-wider uppercase">
                    Item #
                  </TableHead>
                  <TableHead className="px-5 text-2xs tracking-wider uppercase">
                    Description
                  </TableHead>
                  <TableHead className="px-5 text-right text-2xs tracking-wider uppercase">
                    Qty
                  </TableHead>
                  <TableHead className="px-5 text-right text-2xs tracking-wider uppercase">
                    Unit Price
                  </TableHead>
                  <TableHead className="px-5 text-right text-2xs tracking-wider uppercase">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.lineItems.map((item) => (
                  <TableRow key={item.itemNum} className="hover:bg-transparent">
                    <TableCell className="px-5 font-mono text-muted-foreground">
                      {item.itemNum}
                    </TableCell>
                    <TableCell className="px-5 font-medium text-foreground">
                      {item.description}
                    </TableCell>
                    <TableCell className="px-5 text-right font-mono tabular-nums">
                      {item.qty}
                    </TableCell>
                    <TableCell className="px-5 text-right font-mono tabular-nums">
                      {fmt(item.unitPrice)}
                    </TableCell>
                    <TableCell className="px-5 text-right font-mono font-semibold tabular-nums">
                      {fmt(item.qty * item.unitPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
            <div className="space-y-2 border-t border-border px-5 py-4 text-sm">
              <TotalRow label="Subtotal" value={fmt(invoice.subtotal)} />
              <TotalRow label="Tax" value={fmt(invoice.tax)} />
              <TotalRow label="Shipping" value={fmt(invoice.shipping)} />
              <div className="border-t border-border pt-2">
                <TotalRow
                  label="Total Invoice Amount"
                  value={fmt(invoice.total)}
                  strong
                />
              </div>
              <TotalRow
                label="Payments Applied"
                value={`-${fmt(totalPaid)}`}
                tone="paid"
              />
              <div className="border-t border-border pt-2">
                <TotalRow
                  label="Balance Due"
                  value={fmt(invoice.amountDue)}
                  tone="due"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CreditCard size={15} className="text-muted-foreground" />
              Payment Details
            </div>
            {payments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No payments applied yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {payments.map((payment) => (
                  <li
                    key={payment.id}
                    className="flex items-start justify-between gap-3 py-3 first:pt-0"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {paymentLabel(payment.method)}
                      </div>
                      {payment.reference ? (
                        <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {payment.reference}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-semibold tabular-nums">
                        {fmt(payment.amount)}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {payment.date}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 space-y-2 border-t border-border pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-mono font-semibold tabular-nums">
                  {fmt(totalPaid)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-primary">Remaining Balance</span>
                <span className="font-mono font-semibold text-primary tabular-nums">
                  {fmt(invoice.amountDue)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <MapPin size={15} className="text-muted-foreground" />
              Shipping Details
            </div>
            <div className="text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
              Shipping Address
            </div>
            <div className="mt-1 text-sm leading-relaxed text-foreground">
              {address.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center gap-1.5 text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
                <Truck size={12} /> Carrier
              </div>
              <div className="mt-1 text-sm font-medium">{invoice.carrier}</div>
              <div className="mt-3 text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
                Tracking Number
              </div>
              <div className="mt-1 font-mono text-sm break-all text-primary">
                {invoice.trackingNumber}
              </div>
            </div>
            <Button
              className="mt-4 h-12 w-full justify-between px-4"
              onClick={() => navigate(ROUTES.order(invoice.orderId))}
            >
              <span className="inline-flex items-center gap-2 font-mono">
                <Package />
                {invoice.orderId}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium">
                View Order
                <ChevronRight />
              </span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TotalRow({
  label,
  value,
  strong,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  tone?: "paid" | "due";
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={
          tone === "due"
            ? "font-semibold text-primary"
            : strong
              ? "font-semibold text-foreground"
              : "text-muted-foreground"
        }
      >
        {label}
      </span>
      <span
        className={
          tone === "paid"
            ? "font-mono font-medium text-tracking-complete tabular-nums"
            : tone === "due"
              ? "font-mono font-semibold text-primary tabular-nums"
              : strong
                ? "font-mono font-semibold text-foreground tabular-nums"
                : "font-mono text-foreground tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
