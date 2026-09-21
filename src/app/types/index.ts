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

export type PaymentMethod = "ACH" | "Check" | "Wire" | "Credit Card";

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
  amountDue: number;
  amountPaid?: number;
  paymentDate?: string;
  paymentMethod?: PaymentMethod;
  creditMemoIds?: string[];
}
