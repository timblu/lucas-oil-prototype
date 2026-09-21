export interface Order {
  id: string;
  date: string;
  po: string;
  shipTo: string;
  status:
    | "Received"
    | "Picked"
    | "Shipping"
    | "Out for Delivery"
    | "Delivered";
  total: number;
}

export interface OrderItem {
  itemNum: string;
  description: string;
  qty: number;
  unitPrice: number;
}

export interface TrackingEvent {
  timestamp: string;
  location: string;
  description: string;
  done: boolean;
}

export type Carrier = "UPS" | "FedEx" | "USPS";

export interface Product {
  id: string;
  name: string;
  caseQty: string;
  price: number;
  inventory: "in-stock" | "low" | "out";
  inventoryCount?: number;
  description: string;
  category: string;
  colorClass: string;
}

export type PaymentMethod =
  | "ACH"
  | "Check"
  | "Wire"
  | "Credit Card"
  | "Credit Memo";

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  /** Check number, ACH trace, card last four, or credit memo number */
  reference?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  orderId: string;
  poNumber: string;
  shipTo: string;
  carrier: Carrier;
  trackingNumber: string;
  status: "Paid" | "Open" | "Past Due";
  lineItems: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  /** Remaining balance: total less every payment applied below */
  amountDue: number;
  payments?: Payment[];
  creditMemoIds?: string[];
}
