export const DISTRIBUTOR_ACCOUNT = {
  shortName: "Reno WD",
  legalName: "Reno Wholesale Distributors",
  accountNumber: "WD-2941",
  territory: "Western US",
  repName: "Marcus Chen",
  repPhone: "800-342-2512 x204",
  repEmail: "m.chen@lucasoil.com",
  primaryContact: "J. Miller",
  contactEmail: "j.miller@renowo.com",
  shipToAddress: "1200 Distribution Dr, Reno NV 89502",
  billToAddress: "PO Box 4410, Reno NV 89505",
} as const;

export const ACCOUNT_SNAPSHOT = {
  totalCreditLine: 50000,
  availableCredit: 45023,
  currentBalance: 4977,
} as const;

/**
 * Credit memo shape mirrors Sage 100 → Snowflake → Salesforce expectations:
 * remaining Balance (may differ from original amount), Applied vs Open status,
 * optional related invoice, and a free-text reason. Mapping through Snowflake
 * is still an open risk — treat UI as a design hypothesis until confirmed.
 */
export type CreditMemoStatus = "Applied" | "Open";

export interface CreditMemo {
  memoNumber: string;
  date: string;
  /** Original credit amount when the memo was posted */
  originalAmount: number;
  /** Remaining amount available for allocation (may be less than original) */
  balance: number;
  status: CreditMemoStatus;
  /** Invoice this memo corrects, if applicable; omit for unapplied credits */
  relatedInvoiceNumber?: string;
  reason: string;
}

export const CREDIT_MEMOS: CreditMemo[] = [
  {
    memoNumber: "CM-3001",
    date: "03/20/26",
    originalAmount: 154.5,
    balance: 0,
    status: "Applied",
    relatedInvoiceNumber: "INV-20042",
    reason: "Damaged case",
  },
  {
    memoNumber: "CM-3002",
    date: "02/25/26",
    originalAmount: 312.0,
    balance: 0,
    status: "Applied",
    relatedInvoiceNumber: "INV-20044",
    reason: "Pricing correction",
  },
  {
    memoNumber: "CM-3003",
    date: "03/28/26",
    originalAmount: 85.0,
    balance: 85.0,
    status: "Open",
    reason: "Freight adjustment",
  },
];

export interface CustomerContact {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export const CUSTOMER_CONTACTS: CustomerContact[] = [
  {
    name: "J. Miller",
    role: "Purchasing Manager",
    email: "j.miller@renowo.com",
    phone: "775-555-0148",
  },
  {
    name: "A. Torres",
    role: "Warehouse Lead",
    email: "a.torres@renowo.com",
    phone: "775-555-0162",
  },
  {
    name: "K. Nguyen",
    role: "Accounts Payable",
    email: "k.nguyen@renowo.com",
    phone: "775-555-0179",
  },
];
