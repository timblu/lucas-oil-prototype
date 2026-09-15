import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Download,
  FileText,
  MapPin,
  Receipt,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { INVOICES } from "../../data/invoices";
import { CREDIT_MEMOS } from "../../data/account";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";

export default function InvoiceDetailPage() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const invoice = INVOICES.find((i) => i.id === invoiceId);

  if (!invoice) return <Navigate to={ROUTES.invoices} replace />;

  const linkedMemos = CREDIT_MEMOS.filter((m) =>
    invoice.creditMemoIds?.includes(m.memoNumber),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title={`${invoice.invoiceNumber}  —  ${invoice.invoiceDate}`}
        back="Back to Invoices"
        onBack={() => navigate(ROUTES.invoices)}
      />

      {/* Header summary */}
      <Card className="mb-5 p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Invoice Status
          </div>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          Due date:{" "}
          <span className="text-foreground font-medium">
            {invoice.dueDate}
          </span>
        </div>
      </Card>

      {/* Related order + ship-to + carrier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <FileText size={12} /> Related Order
          </div>
          <button
            type="button"
            onClick={() => navigate(ROUTES.order(invoice.orderId))}
            className="flex items-center gap-1.5 mono text-sm font-medium text-[#111] hover:underline"
          >
            {invoice.orderId}
            <ChevronRight size={13} />
          </button>
          <div className="text-xs text-muted-foreground mt-1">
            PO {invoice.poNumber}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <MapPin size={12} /> Ship To
          </div>
          <div className="text-sm text-foreground leading-relaxed">
            {invoice.shipTo}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Carrier &amp; Tracking
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {invoice.carrier}
            </span>
            {/* Plain text only — never a hyperlink, consistent with Order Detail */}
            <span className="mono text-sm text-foreground">
              {invoice.trackingNumber}
            </span>
          </div>
        </Card>
      </div>

      {/* Line items */}
      <Card className="mb-5">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Items
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Item #",
                  "Description",
                  "Qty",
                  "Unit Price",
                  "Line Total",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoice.lineItems.map((item) => (
                <tr key={item.itemNum}>
                  <td className="px-5 py-3.5 mono text-sm text-muted-foreground">
                    {item.itemNum}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">
                    {item.description}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm text-foreground">
                    {item.qty}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm text-foreground">
                    {fmt(item.unitPrice)}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm font-medium text-foreground">
                    {fmt(item.qty * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Totals + Download PDF */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <Card className="p-5 md:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Amount Summary
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="mono">{fmt(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="mono">{fmt(invoice.tax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="mono">{fmt(invoice.shipping)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="mono text-[#111]">{fmt(invoice.total)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground">
              <span>Amount Due</span>
              <span className="mono">{fmt(invoice.amountDue)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 flex flex-col items-start justify-center gap-2">
          <button
            type="button"
            disabled
            className="flex items-center gap-2 bg-muted text-muted-foreground text-sm font-medium px-4 py-2.5 rounded-lg cursor-not-allowed w-full justify-center"
          >
            <Download size={14} />
            Download PDF
          </button>
          <p className="text-xs text-muted-foreground">Available soon</p>
        </Card>
      </div>

      {/* Credit memos (only if applicable) */}
      {linkedMemos.length > 0 && (
        <Card className="mb-5">
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
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div>
                  <div className="mono text-sm font-medium text-foreground">
                    {m.memoNumber}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {m.reason}
                  </div>
                </div>
                <div className="text-right">
                  <div className="mono text-sm font-semibold text-foreground">
                    {fmt(m.amount)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {m.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <p className="text-xs text-muted-foreground italic">
        View-only — no payment or dispute actions in Phase 1.
      </p>
    </div>
  );
}
