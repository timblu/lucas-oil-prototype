import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  CreditCard,
  Download,
  MapPin,
  Receipt,
  Truck,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { INVOICES } from "../../data/invoices";
import { CREDIT_MEMOS } from "../../data/account";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";

// Linked credit memos use Applied/Open + remaining balance. Cross-link
// pattern mirrors Order Detail ↔ Invoice Detail; Sage→SF mapping unconfirmed.

export default function InvoiceDetailPage() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const invoice = INVOICES.find((i) => i.id === invoiceId);

  if (!invoice) return <Navigate to={ROUTES.invoices} replace />;

  const linkedMemos = CREDIT_MEMOS.filter(
    (m) =>
      invoice.creditMemoIds?.includes(m.memoNumber) ||
      m.relatedInvoiceNumber === invoice.invoiceNumber,
  );
  const paid = invoice.amountDue === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title={invoice.invoiceNumber}
        back="Back to Invoices"
        onBack={() => navigate(ROUTES.invoices)}
        action={
          <button
            type="button"
            disabled
            className="flex items-center gap-2 bg-muted text-muted-foreground text-sm font-medium px-3.5 py-2 rounded-lg cursor-not-allowed shrink-0"
          >
            <Download size={14} />
            Download PDF
          </button>
        }
      />

      <Card className="mb-5 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Amount due
            </div>
            {paid ? (
              <>
                <div className="mt-1 text-2xl font-semibold text-foreground tracking-tight">
                  Paid in full
                </div>
                <div className="mono text-sm text-muted-foreground mt-1">
                  Invoice total {fmt(invoice.total)}
                </div>
              </>
            ) : (
              <>
                <div className="mono text-3xl font-semibold text-foreground mt-1 tracking-tight">
                  {fmt(invoice.amountDue)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Due {invoice.dueDate}
                </div>
              </>
            )}
          </div>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Invoice date
            </div>
            <div className="text-sm font-medium text-foreground">
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Due date
            </div>
            <div className="text-sm font-medium text-foreground">
              {invoice.dueDate}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Related order
            </div>
            <button
              type="button"
              onClick={() => navigate(ROUTES.order(invoice.orderId))}
              className="flex items-center gap-1 mono text-sm font-medium text-[#111] hover:underline"
            >
              {invoice.orderId}
              <ChevronRight size={13} />
            </button>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              PO
            </div>
            <div className="mono text-sm font-medium text-foreground">
              {invoice.poNumber}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Items
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3">
                    Item #
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3">
                    Description
                  </th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3">
                    Qty
                  </th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3">
                    Unit Price
                  </th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoice.lineItems.map((item) => (
                  <tr key={item.itemNum}>
                    <td className="px-5 py-3.5 mono text-sm text-muted-foreground whitespace-nowrap">
                      {item.itemNum}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                      {item.description}
                    </td>
                    <td className="px-5 py-3.5 mono text-sm text-foreground text-right tabular-nums">
                      {item.qty}
                    </td>
                    <td className="px-5 py-3.5 mono text-sm text-foreground text-right tabular-nums">
                      {fmt(item.unitPrice)}
                    </td>
                    <td className="px-5 py-3.5 mono text-sm font-semibold text-foreground text-right tabular-nums">
                      {fmt(item.qty * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-border flex justify-end">
            <div className="w-full max-w-[280px] space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="mono tabular-nums">{fmt(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span className="mono tabular-nums">{fmt(invoice.tax)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="mono tabular-nums">{fmt(invoice.shipping)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium text-foreground">
                <span>Total</span>
                <span className="mono tabular-nums text-[#111]">
                  {fmt(invoice.total)}
                </span>
              </div>
              {paid ? (
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Paid</span>
                  <span className="mono tabular-nums">
                    {fmt(invoice.amountPaid ?? invoice.total)}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Amount due</span>
                  <span className="mono tabular-nums text-base text-[#111]">
                    {fmt(invoice.amountDue)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <CreditCard size={12} /> Payment
            </div>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Amount paid
                </dt>
                <dd className="mono text-sm font-medium text-foreground tabular-nums">
                  {invoice.amountPaid != null ? fmt(invoice.amountPaid) : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Payment date
                </dt>
                <dd className="text-sm font-medium text-foreground">
                  {invoice.paymentDate ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Payment method
                </dt>
                <dd className="text-sm font-medium text-foreground">
                  {invoice.paymentMethod ?? "—"}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <MapPin size={12} /> Ship To
            </div>
            <div className="text-sm font-medium text-foreground leading-relaxed">
              {invoice.shipTo}
            </div>
            <div className="mt-5 pt-5 border-t border-border">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Truck size={12} /> Carrier & Tracking
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  {invoice.carrier}
                </span>
                {/* Plain text only — never a hyperlink, consistent with Order Detail */}
                <span className="mono text-sm text-foreground break-all">
                  {invoice.trackingNumber}
                </span>
              </div>
            </div>
          </Card>

          {linkedMemos.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
                <Receipt size={15} className="text-muted-foreground" />
                <h2 className="font-semibold text-sm">Credit Memos</h2>
                <span className="ml-auto text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  {linkedMemos.length}
                </span>
              </div>
              <div className="divide-y divide-border">
                {linkedMemos.map((m) => (
                  <div
                    key={m.memoNumber}
                    className="flex items-start justify-between gap-3 px-5 py-3.5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="mono text-sm font-medium text-foreground">
                          {m.memoNumber}
                        </span>
                        <StatusBadge status={m.status} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {m.reason}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="mono text-sm font-semibold text-foreground tabular-nums">
                        {fmt(m.balance)}
                      </div>
                      {m.balance !== m.originalAmount && (
                        <div className="mono text-[11px] text-muted-foreground mt-0.5 tabular-nums">
                          of {fmt(m.originalAmount)}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {m.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
