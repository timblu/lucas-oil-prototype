import type { Carrier, Order, OrderItem, TrackingEvent } from "../types";

export const ORDER_SHIPMENTS: Record<
  string,
  { carrier: Carrier; trackingNumber: string }
> = {
  "SO-10041": {
    carrier: "UPS",
    trackingNumber: "1Z999AA10123456784",
  },
  "SO-10042": {
    carrier: "UPS",
    trackingNumber: "1Z999AA10123456784",
  },
  "SO-10043": {
    carrier: "UPS",
    trackingNumber: "1Z999AA10123456784",
  },
  "SO-10044": {
    carrier: "UPS",
    trackingNumber: "1Z999AA10123456784",
  },
};

export const ORDERS: Order[] = [
  {
    id: "SO-10041",
    date: "03/14/26",
    po: "PO-8821",
    shipTo: "Dallas WD",
    status: "Delivered",
    total: 4210,
  },
  {
    id: "SO-10042",
    date: "03/16/26",
    po: "PO-8834",
    shipTo: "Reno WD",
    status: "Out for Delivery",
    total: 1875,
  },
  {
    id: "SO-10043",
    date: "03/18/26",
    po: "PO-8840",
    shipTo: "Tampa WD",
    status: "Shipping",
    total: 980,
  },
  {
    id: "SO-10044",
    date: "03/19/26",
    po: "PO-8855",
    shipTo: "Boise WD",
    status: "Delivered",
    total: 2340,
  },
  {
    id: "SO-10045",
    date: "03/22/26",
    po: "PO-8861",
    shipTo: "Denver WD",
    status: "Picked",
    total: 7105,
  },
  {
    id: "SO-10046",
    date: "03/24/26",
    po: "PO-8870",
    shipTo: "Omaha WD",
    status: "Received",
    total: 540,
  },
];

export const ORDER_ITEMS: OrderItem[] = [
  {
    itemNum: "10087",
    description: "Hi-Perf 10W-30 (case)",
    qty: 10,
    unitPrice: 78.5,
  },
  {
    itemNum: "10091",
    description: "Marine Gear Lube 80W-90",
    qty: 6,
    unitPrice: 92.0,
  },
  {
    itemNum: "10112",
    description: "Fuel Treatment 32oz (24)",
    qty: 4,
    unitPrice: 134.5,
  },
];

export const TRACKING_EVENTS: Record<string, TrackingEvent[]> = {
  "SO-10041": [
    {
      timestamp: "03/14/26 2:18 PM",
      location: "Dallas, TX",
      description: "Delivered",
      done: true,
    },
    {
      timestamp: "03/14/26 7:45 AM",
      location: "Dallas, TX",
      description: "Out for delivery",
      done: true,
    },
    {
      timestamp: "03/14/26 2:30 AM",
      location: "Dallas, TX",
      description: "Arrived at local delivery facility",
      done: true,
    },
    {
      timestamp: "03/13/26 9:15 PM",
      location: "Fort Worth, TX",
      description: "Departed UPS hub",
      done: true,
    },
    {
      timestamp: "03/13/26 4:50 PM",
      location: "Fort Worth, TX",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/13/26 8:00 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
  ],
  "SO-10042": [
    {
      timestamp: "03/21/26 6:02 AM",
      location: "Reno, NV",
      description: "Out for delivery",
      done: true,
    },
    {
      timestamp: "03/21/26 1:15 AM",
      location: "Reno, NV",
      description: "Arrived at local delivery facility",
      done: true,
    },
    {
      timestamp: "03/20/26 3:12 AM",
      location: "Salt Lake City, UT",
      description: "Departed UPS hub",
      done: true,
    },
    {
      timestamp: "03/19/26 9:30 PM",
      location: "Salt Lake City, UT",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/19/26 2:00 PM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
    {
      timestamp: "03/22/26 (est.)",
      location: "Reno, NV",
      description: "Scheduled delivery",
      done: false,
    },
  ],
  "SO-10043": [
    {
      timestamp: "03/20/26 11:40 PM",
      location: "Phoenix, AZ",
      description: "Departed UPS hub — in transit to Tampa",
      done: true,
    },
    {
      timestamp: "03/20/26 3:55 PM",
      location: "Phoenix, AZ",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/19/26 10:00 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
    {
      timestamp: "03/22/26 (est.)",
      location: "Tampa, FL",
      description: "Scheduled delivery",
      done: false,
    },
  ],
  "SO-10044": [
    {
      timestamp: "03/19/26 3:44 PM",
      location: "Boise, ID",
      description: "Delivered",
      done: true,
    },
    {
      timestamp: "03/19/26 8:10 AM",
      location: "Boise, ID",
      description: "Out for delivery",
      done: true,
    },
    {
      timestamp: "03/19/26 12:30 AM",
      location: "Boise, ID",
      description: "Arrived at local delivery facility",
      done: true,
    },
    {
      timestamp: "03/18/26 6:20 PM",
      location: "Portland, OR",
      description: "Departed UPS hub",
      done: true,
    },
    {
      timestamp: "03/18/26 11:05 AM",
      location: "Portland, OR",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/18/26 7:00 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
  ],
  "SO-10045": [
    {
      timestamp: "03/23/26 8:15 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
    {
      timestamp: "03/24/26 (est.)",
      location: "Denver, CO",
      description: "Scheduled delivery",
      done: false,
    },
  ],
};
