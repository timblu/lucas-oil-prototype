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

export interface Case {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  lastUpdated: string;
  orderId?: string;
}

export interface Message {
  id: string;
  sender: "agent" | "you";
  agentName?: string;
  timestamp: string;
  body: string;
}
