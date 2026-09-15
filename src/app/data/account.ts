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

export interface CreditMemo {
  memoNumber: string;
  date: string;
  amount: number;
  reason: string;
}

export const CREDIT_MEMOS: CreditMemo[] = [
  {
    memoNumber: "CM-3001",
    date: "03/20/26",
    amount: 154.5,
    reason: "Damaged case — INV-20042",
  },
  {
    memoNumber: "CM-3002",
    date: "02/25/26",
    amount: 312.0,
    reason: "Pricing correction — INV-20044",
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
