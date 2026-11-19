import type { Invoice, Payment } from "../types";

/** Mock data uses MM/DD/YY strings; all invoice activity is 2000s. */
function toTime(shortDate: string) {
  const [month, day, year] = shortDate.split("/").map(Number);
  return new Date(2000 + year, month - 1, day).getTime();
}

export interface PaymentSummary {
  /** Oldest first, so the list reads as a settlement ledger */
  payments: Payment[];
  totalPaid: number;
  lastPayment: Payment | null;
  isPaidInFull: boolean;
  isPartiallyPaid: boolean;
}

export function getPaymentSummary(invoice: Invoice): PaymentSummary {
  const payments = [...(invoice.payments ?? [])].sort(
    (a, b) => toTime(a.date) - toTime(b.date),
  );
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    payments,
    totalPaid,
    lastPayment: payments.length ? payments[payments.length - 1] : null,
    isPaidInFull: invoice.amountDue === 0,
    isPartiallyPaid: totalPaid > 0 && invoice.amountDue > 0,
  };
}
